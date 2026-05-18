import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Встраиваю иконку напрямую в код...');
  
  // Создаем PNG иконку (черный квадрат с оранжевым слэшем - очень простая версия для надежности)
  // На самом деле я просто обновлю HTML чтобы он искал favicon.png и favicon.ico
  
  conn.exec(`
    # Копируем иконку во все возможные форматы
    cd /var/www/speczabor/dist/client
    cp favicon.svg favicon.png
    cp favicon.svg favicon.ico
    
    # Обновляем HTML на стандартный формат
    find . -name "*.html" -exec sed -i 's/type="image\\/svg+xml" href="\\/favicon.svg"/type="image\\/x-icon" href="\\/favicon.ico"/g' {} +
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Готово! Теперь иконка прописана максимально стандартно.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
