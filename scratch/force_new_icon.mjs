import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Принудительное обновление иконки (версия 3)...');
  conn.exec(`
    cd /var/www/speczabor/dist/client
    # Создаем файл с абсолютно новым именем
    cp favicon.png logo-icon-v1.png
    
    # Обновляем все HTML файлы, чтобы они искали именно это имя
    find . -name "*.html" -exec sed -i 's/href="\\/favicon-new.png"/href="\\/logo-icon-v1.png"/g' {} +
    find . -name "*.html" -exec sed -i 's/href="\\/favicon.png"/href="\\/logo-icon-v1.png"/g' {} +
    find . -name "*.html" -exec sed -i 's/href="\\/favicon.ico"/href="\\/logo-icon-v1.png"/g' {} +
    
    # Сбрасываем кэш Nginx
    systemctl reload nginx
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Всё! Теперь браузер просто не сможет подсунуть старую иконку.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
