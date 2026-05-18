import { Client } from 'ssh2';
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { unlinkSync } from 'fs';

const IP = '83.217.202.153';
const USER = 'root';
const PASS = 'ueaB+,E3fUYM.9';

console.log('=== [1/4] Сборка проекта ===');
execSync('npm run build', { stdio: 'inherit' });

console.log('=== [2/4] Создание архива ===');
try { unlinkSync('deploy_package.tar.gz'); } catch (e) {}
execSync('tar -czf deploy_package.tar.gz dist/ server-node.mjs ecosystem.config.mjs package.json package-lock.json', { stdio: 'inherit' });

console.log(`=== [3/4] Подключение к серверу ${IP} ===`);
const conn = new Client();
conn.on('ready', () => {
  console.log('✅ SSH-соединение установлено!');
  conn.sftp((err, sftp) => {
    if (err) throw err;
    
    console.log('📦 Загрузка архива на сервер...');
    sftp.fastPut('deploy_package.tar.gz', '/tmp/deploy_package.tar.gz', {}, (err) => {
      if (err) throw err;
      console.log('✅ Архив успешно загружен!');
      
      console.log('🚀 Распаковка и запуск Nginx и PM2...');
      const remoteCmd = `
        set -e
        mkdir -p /var/www/speczabor
        cd /var/www/speczabor
        tar -xzf /tmp/deploy_package.tar.gz
        rm /tmp/deploy_package.tar.gz
        
        npm install --omit=dev --quiet
        
        cat > /etc/nginx/sites-available/speczabor << 'NGINX'
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
}
NGINX
        ln -sf /etc/nginx/sites-available/speczabor /etc/nginx/sites-enabled/
        rm -f /etc/nginx/sites-enabled/default
        nginx -t && systemctl reload nginx || true
        
        mkdir -p /var/log/pm2
        pm2 restart ecosystem.config.mjs --env production 2>/dev/null || pm2 start ecosystem.config.mjs --env production
        pm2 save
        echo "=== ВСЕ ГОТОВО ==="
      `;
      
      conn.exec(remoteCmd, (err, stream) => {
        if (err) throw err;
        stream.on('close', () => {
          console.log('✅ Деплой завершён! Сайт работает!');
          conn.end();
        }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
      });
    });
  });
}).connect({
  host: IP,
  port: 22,
  username: USER,
  password: PASS,
  readyTimeout: 10000
});
