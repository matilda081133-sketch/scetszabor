import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Исправляю код напрямую...');
  conn.exec(`
    cd /var/www/speczabor
    # Находим файл и заменяем в нем проблемную команду на стандартную
    find dist/server/assets/ -name "worker-entry-*.js" -exec sed -i 's/getBuiltinModule("node:process")/process/g' {} +
    
    # Также проверим другие файлы
    find dist/server/ -name "*.js" -exec sed -i 's/getBuiltinModule("node:process")/process/g' {} +
    
    pm2 restart speczabor
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Исправлено.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
