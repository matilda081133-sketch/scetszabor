import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Исправляю маршрутизацию...');
  conn.exec(`
    cd /var/www/speczabor
    
    # Исправляем одну строчку в коде сервера
    sed -i "s/app.all('\\*',/app.all('(.*)',/" server-node.mjs
    
    # Запускаем всё обратно
    pm2 restart speczabor
    echo "FIX_APPLIED"
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Готово! Проверяем...');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
