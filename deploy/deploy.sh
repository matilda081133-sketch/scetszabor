#!/bin/bash
# ==============================================================================
# СПЕЦЗАБОР — Скрипт деплоя на Timeweb VPS
# Запускать с вашего компьютера: bash deploy/deploy.sh ВАШ_IP
# ==============================================================================

set -e

SERVER_IP=$1
if [ -z "$SERVER_IP" ]; then
  echo "❌ Укажите IP сервера: bash deploy/deploy.sh 185.xxx.xxx.xxx"
  exit 1
fi

SERVER_USER="root"
APP_DIR="/var/www/speczabor"

echo ""
echo "======================================"
echo "  Деплой СПЕЦЗАБОР → ${SERVER_IP}"
echo "======================================"

# 1. Сборка
echo ">>> [1/4] Сборка проекта..."
npm run build

# 2. Копирование файлов на сервер
echo ">>> [2/4] Загрузка файлов на сервер..."
ssh ${SERVER_USER}@${SERVER_IP} "mkdir -p ${APP_DIR}/client"

# Копируем статику (клиентская часть)
rsync -avz --progress \
  dist/client/ \
  ${SERVER_USER}@${SERVER_IP}:${APP_DIR}/client/

# Копируем серверную часть
rsync -avz --progress \
  dist/server/ \
  ${SERVER_USER}@${SERVER_IP}:${APP_DIR}/server/

# Копируем конфиги
scp server-node.mjs ecosystem.config.mjs package.json \
  ${SERVER_USER}@${SERVER_IP}:${APP_DIR}/

# 3. Установка зависимостей и запуск
echo ">>> [3/4] Запуск приложения..."
ssh ${SERVER_USER}@${SERVER_IP} << 'REMOTE'
  cd /var/www/speczabor
  npm install --omit=dev --quiet
  mkdir -p /var/log/pm2
  pm2 restart ecosystem.config.mjs --env production || pm2 start ecosystem.config.mjs --env production
  pm2 save
REMOTE

# 4. Проверка
echo ">>> [4/4] Проверка..."
sleep 3
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://${SERVER_IP}/)
if [ "$HTTP_CODE" = "200" ]; then
  echo ""
  echo "======================================"
  echo "  ✅ Деплой успешен! HTTP ${HTTP_CODE}"
  echo "  Сайт: http://${SERVER_IP}/"
  echo "======================================"
else
  echo ""
  echo "⚠️  Сайт вернул код ${HTTP_CODE}. Проверьте логи:"
  echo "   ssh root@${SERVER_IP} 'pm2 logs speczabor --lines 20'"
fi
