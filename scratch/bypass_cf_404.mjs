import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Использование абсолютно нового имени для иконки...');
  conn.exec(`
    cd /var/www/speczabor/dist/client
    cp favicon.png spec-icon-final.png
    
    # Сразу обновляем все HTML
    find . -name "*.html" -exec sed -i 's/href="\\/logo-icon-v1.png"/href="\\/spec-icon-final.png"/g' {} +
    find . -name "*.html" -exec sed -i 's/href="\\/favicon.png"/href="\\/spec-icon-final.png"/g' {} +
    find . -name "*.html" -exec sed -i 's/href="\\/favicon.ico"/href="\\/spec-icon-final.png"/g' {} +
    
    systemctl reload nginx
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Готово. Это имя точно не в кэше.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
