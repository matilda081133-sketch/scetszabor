import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Проверка портов и процессов...');
  conn.exec(`
    # Смотрим, кто слушает порты
    netstat -tlpn
    
    # Смотрим реальные логи самого приложения (stdout)
    tail -n 50 /root/.pm2/logs/speczabor-out.log
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
