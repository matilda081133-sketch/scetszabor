import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Ручной запуск для проверки...');
  conn.exec(`
    cd /var/www/speczabor
    # Отключаем мониторинг PM2 который спамит в логи
    pm2 set pm2-io:enabled false
    pm2 stop speczabor || true
    
    # Запускаем вручную на 10 секунд и смотрим всё, что он пишет
    export PORT=3000
    node server-node.mjs
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => conn.end())
      .on('data', (data) => process.stdout.write(data))
      .stderr.on('data', (data) => process.stderr.write(data));
      
    // Останавливаем через 10 секунд чтобы не зависло
    setTimeout(() => {
       console.log('--- КОНЕЦ ПРОВЕРКИ ---');
       conn.end();
    }, 10000);
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
