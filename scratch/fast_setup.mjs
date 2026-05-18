import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Перезапуск установки...');
  conn.exec(`
    killall -9 apt-get apt dpkg || true
    rm /var/lib/apt/lists/lock || true
    rm /var/lib/dpkg/lock* || true
    
    # Прямая установка без лишних проверок
    apt-get install -y curl nginx nodejs npm || apt-get update && apt-get install -y curl nginx nodejs npm
    npm install -g pm2
    mkdir -p /var/www/speczabor
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Готово!');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
