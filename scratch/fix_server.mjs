import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Снова на связи!');
  conn.exec(`
    # Установка Node.js и Nginx по шагам
    apt-get update
    apt-get install -y curl gnupg
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs nginx
    npm install -g pm2
    mkdir -p /var/www/speczabor
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => {
      console.log('🏁 Установка завершена с кодом:', code);
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
