import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Финальная отладка...');
  conn.exec(`
    cd /var/www/speczabor
    
    # 1. Исправляем конфиг PM2
    echo "module.exports = {
      apps: [{
        name: 'speczabor',
        script: 'server-node.mjs',
        env: {
          NODE_ENV: 'production',
          PORT: 3000
        }
      }]
    }" > ecosystem.config.js
    
    # 2. Исправляем код сайта (заменяем getBuiltinModule на глобальный объект process)
    # Это самая важная часть
    sed -i 's/getBuiltinModule("node:process")/process/g' dist/server/assets/worker-entry-*.js
    sed -i 's/getBuiltinModule("node:process")/process/g' dist/server/index.js
    
    # 3. Запуск
    pm2 delete speczabor || true
    pm2 start ecosystem.config.js
    pm2 save
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Готово! Проверяю порт 3000...');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
