import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Фикс иконки...');
  conn.exec(`
    # Создаем папку если ее нет
    mkdir -p /var/www/speczabor/dist/client
    
    # Обновляем HTML
    cd /var/www/speczabor/dist/client
    find . -name "*.html" -exec sed -i 's/href="\\/favicon.png"/href="\\/favicon.svg"/g' {} +
    find . -name "*.html" -exec sed -i 's/type="image\\/png"/type="image\\/svg+xml"/g' {} +
    
    # Перезапускаем Nginx для уверенности
    systemctl reload nginx
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Иконка должна появиться! Пожалуйста, обновите страницу через Ctrl+F5.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
