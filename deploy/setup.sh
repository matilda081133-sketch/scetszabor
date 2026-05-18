#!/bin/bash
# ==============================================================================
# СПЕЦЗАБОР — Скрипт автоматической настройки сервера Timeweb VPS (Ubuntu 24.04)
# Запускать от root: bash setup.sh
# ==============================================================================

set -e  # Остановить при любой ошибке

DOMAIN="спецзабор.рф"
DOMAIN_PUNYCODE="xn--80acki1bbmb1c.xn--p1ai"
APP_DIR="/var/www/speczabor"
NODE_VERSION="20"

echo ""
echo "======================================"
echo "  Настройка сервера СПЕЦЗАБОР"
echo "======================================"
echo ""

# 1. Обновление системы
echo ">>> [1/8] Обновление системы..."
apt-get update -q && apt-get upgrade -y -q

# 2. Установка зависимостей
echo ">>> [2/8] Установка зависимостей..."
apt-get install -y -q curl git nginx certbot python3-certbot-nginx ufw

# 3. Установка Node.js
echo ">>> [3/8] Установка Node.js ${NODE_VERSION}..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - -q
apt-get install -y -q nodejs
echo "Node.js версия: $(node -v)"
echo "NPM версия: $(npm -v)"

# 4. Установка PM2
echo ">>> [4/8] Установка PM2..."
npm install -g pm2 -q
pm2 startup systemd -u root --hp /root | tail -1 | bash

# 5. Создание директории приложения
echo ">>> [5/8] Создание директории ${APP_DIR}..."
mkdir -p ${APP_DIR}

# 6. Настройка Nginx
echo ">>> [6/8] Настройка Nginx..."
cat > /etc/nginx/sites-available/speczabor << 'NGINX_CONF'
server {
    listen 80;
    server_name xn--80acki1bbmb1c.xn--p1ai спецзабор.рф www.xn--80acki1bbmb1c.xn--p1ai;
    
    # Redirect www to non-www
    if ($host ~* ^www\.) {
        return 301 $scheme://xn--80acki1bbmb1c.xn--p1ai$request_uri;
    }

    # Static assets with long cache
    location /assets/ {
        alias /var/www/speczabor/client/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        gzip_static on;
    }

    # All other requests go to Node.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }

    # Logs
    access_log /var/log/nginx/speczabor.access.log;
    error_log /var/log/nginx/speczabor.error.log;
}
NGINX_CONF

ln -sf /etc/nginx/sites-available/speczabor /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# 7. Настройка файрвола
echo ">>> [7/8] Настройка файрвола..."
ufw --force enable
ufw allow ssh
ufw allow 'Nginx Full'

# 8. Финал
echo ""
echo "======================================"
echo "  Сервер настроен успешно! ✅"
echo "======================================"
echo ""
echo "Следующий шаг: загрузить файлы сайта и запустить deploy.sh"
echo ""
