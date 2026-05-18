import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Глубокий поиск и исправление...');
  conn.exec(`
    cd /var/www/speczabor
    # Ищем все файлы, где встречается getBuiltinModule
    grep -l "getBuiltinModule" dist/server/assets/*.js dist/server/*.js | xargs -I {} sed -i 's/getBuiltinModule("node:process")/process/g' {}
    grep -l "getBuiltinModule" dist/server/assets/*.js dist/server/*.js | xargs -I {} sed -i 's/getBuiltinModule/import/g' {}
    
    # Также проверим, нет ли там других проблем
    pm2 restart speczabor
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Попытка завершена.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
