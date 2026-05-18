import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Проверка файрвола и портов...');
  conn.exec(`
    # Проверяем, открыты ли порты 80 и 443
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    ufw status
    
    # Также проверим, что Nginx действительно слушает эти порты
    netstat -tulpn | grep nginx
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
