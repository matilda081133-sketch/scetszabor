import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Генерация реальной PNG-иконки...');
  conn.exec(`
    # Устанавливаем ImageMagick для работы с графикой
    apt-get update && apt-get install -y imagemagick
    
    # Создаем PNG иконку из нашего SVG
    convert -background none /var/www/speczabor/dist/client/favicon.svg -resize 32x32 /var/www/speczabor/dist/client/favicon.png
    convert -background none /var/www/speczabor/dist/client/favicon.svg -resize 16x16 /var/www/speczabor/dist/client/favicon.ico
    
    # Права доступа
    chmod 644 /var/www/speczabor/dist/client/favicon.*
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Иконка создана в реальном формате PNG! Теперь браузер точно её увидит.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
