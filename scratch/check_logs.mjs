import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Проверка логов...');
  conn.exec(`pm2 status && pm2 logs speczabor --lines 50 --no-daemon`, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => conn.end())
      .on('data', (data) => {
        process.stdout.write(data);
        if (data.toString().includes('PM2 log stream end')) conn.end();
      })
      .stderr.on('data', (data) => process.stderr.write(data));
      
    // Убиваем поток через 10 секунд
    setTimeout(() => conn.end(), 10000);
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
