import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Сборка и запуск новой версии с админкой...');
  conn.exec(`
    cd /var/www/speczabor
    # Устанавливаем зависимости, если появились новые (например, @sanity/client)
    npm install
    
    # Собираем проект
    npm run build
    
    # Перезапускаем приложение через pm2
    pm2 restart speczabor
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Всё готово! Сайт обновлен и подключен к админке.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
