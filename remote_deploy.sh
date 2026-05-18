
set -e
echo '--- Распаковка файлов ---'
mkdir -p /var/www/speczabor
cd /var/www/speczabor
tar -xzf /tmp/deploy_package.tar.gz
rm /tmp/deploy_package.tar.gz

echo '--- Установка зависимостей ---'
npm install --omit=dev --quiet

echo '--- Настройка Nginx ---'
cat > /etc/nginx/sites-available/speczabor << 'EOF'
server {
    listen 80;
    server_name xn--80acki1bbmb1c.xn--p1ai спецзабор.рф;
    location /assets/ {
        alias /var/www/speczabor/dist/client/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    access_log /var/log/nginx/speczabor.access.log;
    error_log /var/log/nginx/speczabor.error.log;
}
EOF

ln -sf /etc/nginx/sites-available/speczabor /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx || true

echo '--- Запуск PM2 ---'
mkdir -p /var/log/pm2
pm2 restart /var/www/speczabor/ecosystem.config.mjs --env production 2>/dev/null || pm2 start /var/www/speczabor/ecosystem.config.mjs --env production
pm2 save

echo '--- Готово! ---'
