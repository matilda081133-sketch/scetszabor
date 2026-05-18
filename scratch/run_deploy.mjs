import { spawnSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';

const IP = '83.217.202.153';
const USER = 'root';

console.log("=== [1/4] Building project ===");
spawnSync('npm', ['run', 'build'], { shell: true, stdio: 'inherit' });

console.log("=== [2/4] Packaging ===");
try { unlinkSync('deploy_package.tar.gz'); } catch (e) {}
spawnSync('tar', ['-czf', 'deploy_package.tar.gz', 'dist/', 'server-node.mjs', 'ecosystem.config.mjs', 'package.json', 'package-lock.json'], { shell: true, stdio: 'inherit' });

console.log(`=== [3/4] Uploading to ${IP} ===`);
console.log("ВНИМАНИЕ: Если потребуется, введите пароль: ueaB+,E3fUYM.9");
spawnSync('scp', ['deploy_package.tar.gz', `${USER}@${IP}:/tmp/`], { shell: true, stdio: 'inherit' });

console.log("=== [4/4] Executing on server ===");
const remoteScript = `
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
        proxy_set_header Host \\$host;
        proxy_set_header X-Real-IP \\$remote_addr;
        proxy_set_header X-Forwarded-For \\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\$scheme;
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
`;

writeFileSync('remote_deploy.sh', remoteScript);
spawnSync('scp', ['remote_deploy.sh', `${USER}@${IP}:/tmp/`], { shell: true, stdio: 'inherit' });
spawnSync('ssh', [`${USER}@${IP}`, 'bash /tmp/remote_deploy.sh'], { shell: true, stdio: 'inherit' });

try { unlinkSync('remote_deploy.sh'); } catch (e) {}

console.log("=== DEPLOYMENT SUCCESSFUL ===");
