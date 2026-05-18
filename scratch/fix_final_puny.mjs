import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Финальная настройка спецзабор.рф (БЕЗ дефиса)...');
  conn.exec(`
    # Прописываем ТОЛЬКО правильный punycode для спецзабор.рф
    cat << 'EOF' > /etc/nginx/sites-available/speczabor
server {
    listen 80;
    server_name 83.217.202.153 xn--80acki1bbmb1c.xn--p1ai спецзабор.рф;

    location /assets/ {
        alias /var/www/speczabor/dist/client/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~ ^/(favicon.ico|favicon.svg|favicon.png|static/|robots.txt|manifest.json) {
        root /var/www/speczabor/dist/client;
        try_files $uri =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
    nginx -t && systemctl reload nginx
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Всё! Теперь домен настроен абсолютно верно.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
