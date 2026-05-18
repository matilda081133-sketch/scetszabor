import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Настройка сервера для новой иконки...');
  conn.exec(`
    # Обновляем конфиг Nginx
    cat << 'EOF' > /etc/nginx/sites-available/speczabor
server {
    listen 80;
    server_name 83.217.202.153 xn--80acki1bbmb1c.xn--p1ai спецзабор.рф;

    # Разрешаем отдавать любые картинки и иконки
    location ~* \\.(ico|png|svg|jpg|jpeg|gif)$ {
        root /var/www/speczabor/dist/client;
        expires 1y;
        add_header Cache-Control "public";
    }

    location /assets/ {
        alias /var/www/speczabor/dist/client/assets/;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
    
    # Убеждаемся, что файл на месте
    cd /var/www/speczabor/dist/client
    cp favicon.png logo-icon-v1.png
    
    systemctl reload nginx
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Всё настроено. Теперь иконка доступна под новым именем.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
