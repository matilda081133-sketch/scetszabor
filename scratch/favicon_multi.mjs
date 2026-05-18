import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Финальный штурм иконки...');
  conn.exec(`
    # Создаем классический favicon.ico (просто копируем SVG, современные браузеры поймут)
    cp /var/www/speczabor/dist/client/favicon.svg /var/www/speczabor/dist/client/favicon.ico
    
    # И еще раз favicon.png
    cp /var/www/speczabor/dist/client/favicon.svg /var/www/speczabor/dist/client/favicon.png
    
    # Очищаем кэш Nginx (хотя он тут не при чем, но на всякий случай)
    systemctl reload nginx
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Готово! Попробуйте открыть сайт в режиме Инкогнито (Ctrl+Shift+N) — там иконка должна появиться первой.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
