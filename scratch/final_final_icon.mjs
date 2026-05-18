import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Последний рывок: иконка с новым именем...');
  conn.exec(`
    cd /var/www/speczabor/dist/client
    cp favicon.png favicon-new.png
    find . -name "*.html" -exec sed -i 's/href="\\/favicon.ico"/href="\\/favicon-new.png"/g' {} +
    find . -name "*.html" -exec sed -i 's/href="\\/favicon.png"/href="\\/favicon-new.png"/g' {} +
    systemctl reload nginx
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Всё! Иконка обновлена везде.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
