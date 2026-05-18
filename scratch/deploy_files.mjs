import { Client } from 'ssh2';
import { readFileSync } from 'fs';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Подключено для загрузки!');
  conn.sftp((err, sftp) => {
    if (err) throw err;
    
    const localFile = 'deploy_package.tar.gz';
    const remoteFile = '/tmp/deploy_package.tar.gz';
    
    console.log('📦 Загрузка архива...');
    sftp.fastPut(localFile, remoteFile, {}, (err) => {
      if (err) throw err;
      console.log('✅ Архив загружен!');
      
      console.log('🚀 Распаковка и запуск...');
      conn.exec(`
        cd /var/www/speczabor
        tar -xzf /tmp/deploy_package.tar.gz
        rm /tmp/deploy_package.tar.gz
        npm install --omit=dev --quiet
        
        # Настройка Nginx
        cat > /etc/nginx/sites-available/speczabor << 'NGINX'
server {
    listen 80;
    server_name 83.217.202.153 xn--80acki1bbmb1c.xn--p1ai спецзабор.рф;

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
        nginx -t && systemctl reload nginx
        
        # Запуск приложения через PM2
        mkdir -p /var/log/pm2
        pm2 delete speczabor || true
        pm2 start ecosystem.config.mjs --env production
        pm2 save
      `, (err, stream) => {
        if (err) throw err;
        stream.on('close', () => {
          console.log('✅ Сайт запущен!');
          conn.end();
        }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
      });
    });
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: ':M~UE5wVO%j3a\\'
});
