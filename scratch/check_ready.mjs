import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Проверка...');
  conn.exec(`node -v && nginx -v && pm2 -v`, (err, stream) => {
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
