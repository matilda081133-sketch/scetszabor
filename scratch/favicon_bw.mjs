import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Создание черно-белой иконки...');
  
  const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="white"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Arial Black, sans-serif" font-weight="900" font-size="56" fill="black" letter-spacing="-2">
    СПЕЦ/ЗАБОР.РФ
  </text>
</svg>
`.trim();

  conn.exec(`
    # Сохраняем SVG
    echo '${svgContent}' > /var/www/speczabor/dist/client/favicon_bw.svg
    
    # Конвертируем в PNG
    convert -background none /var/www/speczabor/dist/client/favicon_bw.svg -resize 512x512 /var/www/speczabor/dist/client/favicon-final-v4.png
    
    # Обновляем все HTML файлы на новое имя
    cd /var/www/speczabor/dist/client
    find . -name "*.html" -exec sed -i 's/href="\\/spec-icon-final.png"/href="\\/favicon-final-v4.png"/g' {} +
    find . -name "*.html" -exec sed -i 's/href="\\/logo-icon-v1.png"/href="\\/favicon-final-v4.png"/g' {} +
    find . -name "*.html" -exec sed -i 's/href="\\/favicon-new.png"/href="\\/favicon-final-v4.png"/g' {} +
    
    systemctl reload nginx
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Черно-белая иконка готова и установлена!');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
