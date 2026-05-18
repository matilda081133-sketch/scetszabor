import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Установка SSL сертификата...');
  conn.exec(`
    # Устанавливаем certbot
    apt-get update && apt-get install -y certbot python3-certbot-nginx
    
    # Получаем сертификат (автоматически для нашего домена)
    certbot --nginx -d xn--80atbcceid6a.xn--p1ai -d спецзабор.рф --non-interactive --agree-tos --email matilda081133@gmail.com
    
    # Перезапускаем Nginx
    systemctl reload nginx
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 SSL установлен! Теперь можно переключить Cloudflare обратно в режим "Full" или "Strict".');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
