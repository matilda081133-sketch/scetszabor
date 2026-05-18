import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Отладка...');
  conn.exec(`
    cd /var/www/speczabor
    ls -la
    # Пробуем запустить напрямую через node и смотрим ошибку
    PORT=3000 node server-node.mjs
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => conn.end())
      .on('data', (data) => process.stdout.write(data))
      .stderr.on('data', (data) => process.stderr.write(data));
      
    setTimeout(() => conn.end(), 10000);
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
