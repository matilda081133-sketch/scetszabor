import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Создаю современную SVG-иконку...');
  
  // Создаем SVG файл с текстом СПЕЦ/ЗАБОР.РФ
  const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#121212" rx="64"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="52" fill="white">
    СПЕЦ<tspan fill="#f97316">/</tspan>ЗАБОР<tspan fill="#eab308">.РФ</tspan>
  </text>
</svg>
`.trim();

  conn.exec(`
    # Сохраняем SVG иконку
    echo '${svgContent}' > /var/www/speczabor/dist/client/favicon.svg
    
    # Обновляем все HTML файлы, чтобы они использовали новую иконку
    cd /var/www/speczabor/dist/client
    find . -name "*.html" -exec sed -i 's/rel="icon" type="image\\/png" href="\\/favicon.png"/rel="icon" type="image\\/svg+xml" href="\\/favicon.svg"/g' {} +
    
    # Также заменим favicon.png (на всякий случай для старых систем)
    # Но так как у нас нет конвертера, мы просто оставим SVG как основной вариант через HTML
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Иконка обновлена! Очистите кэш браузера, чтобы увидеть изменения.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
