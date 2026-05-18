import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Финальная шлифовка логотипа...');
  
  const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#111111"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Verdana, Geneva, sans-serif" font-weight="900" font-size="52" fill="white">
    СПЕЦ<tspan fill="#f97316">/</tspan>ЗАБОР<tspan fill="#fbbf24">.РФ</tspan>
  </text>
</svg>
`.trim();

  conn.exec(`
    echo '${svgContent}' > /var/www/speczabor/dist/client/favicon.svg
    convert -background none /var/www/speczabor/dist/client/favicon.svg -resize 512x512 /var/www/speczabor/dist/client/favicon.png
    cp /var/www/speczabor/dist/client/favicon.png /var/www/speczabor/dist/client/favicon-new.png
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Логотип обновлен. Он теперь яркий, четкий и точно как в шапке.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
