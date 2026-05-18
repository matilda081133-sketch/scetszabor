import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Проверка мобильных запросов в логах...');
  conn.exec(`
    # Ищем упоминания iPhone или Android в логах доступа за последние 10 минут
    grep -E "iPhone|Android" /var/log/nginx/access.log | tail -n 20
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
