import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Установка SSL через Punycode...');
  conn.exec(`
    # Используем только Punycode для спецзабор.рф
    certbot --nginx -d xn--80atbcceid6a.xn--p1ai --non-interactive --agree-tos --email matilda081133@gmail.com
    
    # Теперь применяем настройки Nginx с редиректом
    cat << 'EOF' > /etc/nginx/sites-available/speczabor
server {
    listen 80;
    server_name 83.217.202.153 xn--80atbcceid6a.xn--p1ai спецзабор.рф;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name xn--80atbcceid6a.xn--p1ai спецзабор.рф;

    ssl_certificate /etc/letsencrypt/live/xn--80atbcceid6a.xn--p1ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/xn--80atbcceid6a.xn--p1ai/privkey.pem;

    location /assets/ {
        alias /var/www/speczabor/dist/client/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~ ^/(favicon.ico|favicon.svg|static/|robots.txt|manifest.json) {
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
      console.log('🏁 Всё готово! Теперь точно с замочком.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
