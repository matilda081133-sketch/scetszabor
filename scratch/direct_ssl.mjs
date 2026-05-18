import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Установка прямого SSL (Let\'s Encrypt)...');
  conn.exec(`
    # Пытаемся получить сертификат для спецзабор.рф
    certbot --nginx -d xn--80acki1bbmb1c.xn--p1ai --non-interactive --agree-tos -m admin@speczabor.ru --redirect
    
    # Перезагружаем Nginx
    systemctl reload nginx
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 SSL успешно установлен! Сайт теперь защищен напрямую.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
