import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Повторная попытка получения SSL...');
  conn.exec(`
    # Пробуем получить сертификат еще раз
    certbot --nginx -d xn--80atbcceid6a.xn--p1ai -d спецзабор.рф --non-interactive --agree-tos --email matilda081133@gmail.com
    
    # Проверяем, появилась ли папка
    ls -d /etc/letsencrypt/live/*/
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => conn.end())
      .on('data', (data) => process.stdout.write(data))
      .stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
