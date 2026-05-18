import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Перезапуск...');
  conn.exec(`
    cd /var/www/speczabor
    # Переименовываем в .cjs чтобы PM2 не ругался
    mv ecosystem.config.js ecosystem.config.cjs || true
    
    # Запуск
    pm2 delete speczabor || true
    pm2 start ecosystem.config.cjs
    pm2 save
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Попытка запуска завершена.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
