import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Изучаю структуру каталога в Sanity...');
  conn.exec(`
    # Ищем файлы схем Sanity
    find /var/www/speczabor -name "product.ts" -o -name "product.js"
    find /var/www/speczabor -name "schema.ts" -o -name "schema.js"
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
