import { Client } from 'ssh2';
import fs from 'fs';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Загрузка обновленного кода на сервер...');
  const localContent = fs.readFileSync('c:/Users/Honor/OneDrive/Desktop/проект спецзабор/lovable-app/src/lib/catalog.ts', 'utf8');
  
  conn.exec(`cat > /var/www/speczabor/src/lib/catalog.ts << 'EOF'
${localContent}
EOF
    cd /var/www/speczabor
    npm run build
    pm2 restart speczabor
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Код загружен, проект пересобран и запущен!');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
