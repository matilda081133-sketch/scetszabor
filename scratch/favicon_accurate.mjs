import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Создание точной копии логотипа для иконки...');
  
  const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#121212" rx="80"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Arial Black, sans-serif" font-weight="900" font-size="54" fill="white" letter-spacing="-2">
    СПЕЦ<tspan fill="#f97316">/</tspan>ЗАБОР<tspan fill="#eab308">.РФ</tspan>
  </text>
</svg>
`.trim();

  conn.exec(`
    # Сохраняем новый SVG
    echo '${svgContent}' > /var/www/speczabor/dist/client/favicon.svg
    
    # Конвертируем в PNG (используем ImageMagick, который мы уже поставили)
    convert -background none /var/www/speczabor/dist/client/favicon.svg -resize 512x512 /var/www/speczabor/dist/client/favicon.png
    cp /var/www/speczabor/dist/client/favicon.png /var/www/speczabor/dist/client/favicon-new.png
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Иконка обновлена! Теперь она выглядит в точности как ваш логотип.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
