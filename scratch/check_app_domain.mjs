import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Проверка кода на наличие редиректов...');
  conn.exec(`
    # Ищем любые упоминания доменов в коде сервера
    grep -E "xn--" /var/www/speczabor/server-node.mjs
    
    # Также посмотрим, что в .env файле (если он есть)
    cat /var/www/speczabor/.env
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
