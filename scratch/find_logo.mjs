import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Поиск логотипа...');
  conn.exec(`
    ls -F /var/www/speczabor/dist/client/assets/ | grep -E "logo|icon|favicon"
    ls -F /var/www/speczabor/dist/client/ | grep -E "logo|icon|favicon"
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
