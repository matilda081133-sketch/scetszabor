import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Исправление кода...');
  conn.exec(`
    cd /var/www/speczabor
    # Заменяем специфичную для Cloudflare функцию на стандартную для Node.js
    sed -i 's/getBuiltinModule("node:process")/import("node:process")/g' dist/server/assets/worker-entry-*.js
    # И еще одну возможную проблему
    sed -i 's/getBuiltinModule/import/g' dist/server/assets/worker-entry-*.js
    
    # Пробуем запустить еще раз
    pm2 delete speczabor || true
    pm2 start ecosystem.config.mjs --env production
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Исправлено! Проверяю запуск...');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
