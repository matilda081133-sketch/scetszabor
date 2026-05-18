import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Глобальное исправление...');
  conn.exec(`
    cd /var/www/speczabor
    
    # Заменяем getBuiltinModule на пустую функцию, чтобы не было ошибок
    # Так как в Node.js process и так доступен глобально
    sed -i 's/getBuiltinModule("node:process")/process/g' dist/server/assets/worker-entry-*.js
    sed -i 's/getBuiltinModule("node:process")/process/g' dist/server/index.js
    
    # Убираем мои прошлые попытки с import() которые вызвали SyntaxError
    sed -i 's/import("node:process")/process/g' dist/server/assets/worker-entry-*.js
    
    # Перезапуск
    pm2 restart speczabor
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Исправлено. Проверяю...');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
