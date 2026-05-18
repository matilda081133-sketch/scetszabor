import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Глобальная настройка всех доменов и SSL...');
  conn.exec(`
    # Прописываем оба варианта домена, чтобы не гадать
    cat << 'EOF' > /etc/nginx/sites-available/speczabor
server {
    listen 80;
    server_name 83.217.202.153 xn--80acki1bbmb1c.xn--p1ai xn--80atbcceid6a.xn--p1ai спецзабор.рф спец-забор.рф;
    
    # Принудительный редирект на HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name xn--80acki1bbmb1c.xn--p1ai xn--80atbcceid6a.xn--p1ai спецзабор.рф спец-забор.рф;

    # Мы будем использовать сертификат Cloudflare, поэтому тут просто проксируем
    # Но для того чтобы Nginx не ругался на отсутствие SSL, мы временно оставим его на 80 порту в режиме прокси
}
EOF

    # Упрощаем конфиг до максимума, чтобы Cloudflare (Flexible) работал без ошибок
    cat << 'EOF' > /etc/nginx/sites-available/speczabor
server {
    listen 80;
    server_name 83.217.202.153 xn--80acki1bbmb1c.xn--p1ai xn--80atbcceid6a.xn--p1ai спецзабор.рф спец-забор.рф;

    location /assets/ {
        alias /var/www/speczabor/dist/client/assets/;
        add_header Access-Control-Allow-Origin *;
    }

    location ~ ^/(favicon|static|robots|manifest) {
        root /var/www/speczabor/dist/client;
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
    systemctl reload nginx
    
    # Прячем иконку в сам HTML (Base64) - это ультимативное решение
    cd /var/www/speczabor/dist/client
    # (пропускаем встраивание в bash, сделаем это через Node)
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Сервер настроен на оба домена. Теперь Cloudflare (Flexible) должен работать без сбоев.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
