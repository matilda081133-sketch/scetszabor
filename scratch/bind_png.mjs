import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Финальная привязка PNG...');
  conn.exec(`
    cd /var/www/speczabor/dist/client
    # Обновляем все HTML
    find . -name "*.html" -exec sed -i 's/type="image\\/x-icon" href="\\/favicon.ico"/type="image\\/png" href="\\/favicon.png"/g' {} +
    find . -name "*.html" -exec sed -i 's/type="image\\/svg+xml" href="\\/favicon.svg"/type="image\\/png" href="\\/favicon.png"/g' {} +
    
    # Также добавим стандартную строку в head если ее вдруг нет
    # (но она должна быть так как мы ее меняли выше)
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Всё готово! Очищайте кэш (Ctrl+F5) и наслаждайтесь результатом.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
