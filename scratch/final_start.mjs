import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Запуск сайта...');
  conn.exec(`
    cd /var/www/speczabor
    tar -xzf /tmp/deploy_package.tar.gz
    
    # Настройка Nginx (создаем конфиг вручную через echo)
    echo "server {
        listen 80;
        server_name 83.217.202.153 xn--80acki1bbmb1c.xn--p1ai спецзабор.рф;
        location /assets/ {
            alias /var/www/speczabor/dist/client/assets/;
            expires 1y;
            add_header Cache-Control \\"public, immutable\\";
        }
        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Host \\$host;
            proxy_set_header X-Real-IP \\$remote_addr;
        }
    }" > /etc/nginx/sites-available/speczabor
    
    ln -sf /etc/nginx/sites-available/speczabor /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    nginx -t && systemctl reload nginx
    
    # Установка зависимостей и запуск
    npm install --omit=dev
    pm2 delete speczabor || true
    pm2 start ecosystem.config.mjs --env production
    pm2 save
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 ГОТОВО! Сайт запущен.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
