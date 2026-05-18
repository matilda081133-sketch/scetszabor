# ============================================================
# СПЕЦЗАБОР — Деплой на Timeweb (Windows PowerShell)
# ============================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$ServerIP
)

$ServerUser = "root"
$AppDir = "/var/www/speczabor"

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Деплой СПЕЦЗАБОР -> $ServerIP" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

Write-Host ">>> [1/4] Сборка проекта..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Ошибка сборки!" -ForegroundColor Red; exit 1 }

Write-Host ">>> [2/4] Упаковка файлов..." -ForegroundColor Yellow
if (Test-Path "deploy_package.tar.gz") { Remove-Item "deploy_package.tar.gz" }
tar -czf deploy_package.tar.gz dist/ server-node.mjs ecosystem.config.mjs package.json package-lock.json
if ($LASTEXITCODE -ne 0) { Write-Host "Ошибка архивации!" -ForegroundColor Red; exit 1 }

Write-Host ">>> [3/4] Загрузка на сервер $ServerIP..." -ForegroundColor Yellow
Write-Host "ВНИМАНИЕ: Если потребуется, введите пароль: ueaB+,E3fUYM.9" -ForegroundColor Magenta
scp deploy_package.tar.gz "${ServerUser}@${ServerIP}:/tmp/"

Write-Host ">>> [4/4] Запуск установки на сервере..." -ForegroundColor Yellow

$RemoteBash = "
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
        add_header Cache-Control `"public, immutable`";
    }
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto `$scheme;
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
"

Set-Content -Path "remote_deploy.sh" -Value $RemoteBash -Encoding UTF8
scp remote_deploy.sh "${ServerUser}@${ServerIP}:/tmp/"
ssh "${ServerUser}@${ServerIP}" "bash /tmp/remote_deploy.sh"

Remove-Item "remote_deploy.sh"

Write-Host "======================================" -ForegroundColor Green
Write-Host "  ✅ Деплой завершен! Проверяем сайт..." -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

