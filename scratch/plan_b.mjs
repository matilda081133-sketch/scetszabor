import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ План Б запущен!');
  conn.exec(`
    killall -9 apt-get apt dpkg || true
    
    # Быстрая установка Nginx (он обычно маленький)
    apt-get install -y nginx --fix-missing
    
    # Скачивание Node.js напрямую (бинарный файл, это быстро)
    cd /opt
    curl -L https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz -o node.tar.xz
    tar -xJf node.tar.xz
    ln -sf /opt/node-v20.11.0-linux-x64/bin/node /usr/local/bin/node
    ln -sf /opt/node-v20.11.0-linux-x64/bin/npm /usr/local/bin/npm
    ln -sf /opt/node-v20.11.0-linux-x64/bin/npx /usr/local/bin/npx
    
    # Установка PM2
    /usr/local/bin/npm install -g pm2
    ln -sf /opt/node-v20.11.0-linux-x64/bin/pm2 /usr/local/bin/pm2
    
    mkdir -p /var/www/speczabor
    echo "READY"
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 План Б завершен!');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
