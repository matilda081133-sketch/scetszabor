import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Очистка и установка...');
  conn.exec(`
    # Убиваем зависшие процессы установки
    killall apt apt-get dpkg || true
    rm /var/lib/apt/lists/lock || true
    rm /var/cache/apt/archives/lock || true
    rm /var/lib/dpkg/lock* || true
    dpkg --configure -a
    
    # Чистая установка
    export DEBIAN_FRONTEND=noninteractive
    apt-get update
    apt-get install -y curl gnupg nginx
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    npm install -g pm2
    mkdir -p /var/www/speczabor
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('✅ Всё установили!');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
