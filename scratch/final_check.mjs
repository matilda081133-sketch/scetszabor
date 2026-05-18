import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Финальная проверка настроек...');
  conn.exec(`
    # Проверяем, где на самом деле лежат сертификаты
    ls -R /etc/letsencrypt/live/
    
    # Также проверим, создался ли файл иконки
    ls -l /var/www/speczabor/dist/client/favicon.svg
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
