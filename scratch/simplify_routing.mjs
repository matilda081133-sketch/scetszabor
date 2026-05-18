import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Упрощаю серверный код...');
  conn.exec(`
    cd /var/www/speczabor
    
    # Заменяем app.all на универсальный app.use
    sed -i "s/app.all('(.*)',/app.use(/" server-node.mjs
    
    pm2 restart speczabor
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Готово. Проверяем запуск...');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
