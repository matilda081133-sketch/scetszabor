import { Client } from 'ssh2';
import * as fs from 'fs';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Подключено. Начинаем загрузку файлов...');
  conn.sftp((err, sftp) => {
    if (err) throw err;
    
    const remoteDistZip = '/var/www/speczabor/dist.zip';
    const remoteServerNode = '/var/www/speczabor/server-node.mjs';
    
    console.log('Загрузка dist.zip...');
    sftp.fastPut('dist.zip', remoteDistZip, (err) => {
      if (err) throw err;
      console.log('Загрузка server-node.mjs...');
      
      sftp.fastPut('server-node.mjs', remoteServerNode, (err) => {
        if (err) throw err;
        console.log('✅ Файлы загружены. Распаковка и перезапуск...');
        
        conn.exec(`
          cd /var/www/speczabor
          rm -rf dist
          mkdir dist
          unzip -o dist.zip -d dist/
          rm dist.zip
          pm2 restart speczabor || pm2 restart all
        `, (err, stream) => {
          if (err) throw err;
          stream.on('close', () => {
            console.log('🏁 Деплой успешно завершен!');
            conn.end();
          }).on('data', (data) => process.stdout.write(data))
            .stderr.on('data', (data) => process.stderr.write(data));
        });
      });
    });
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'wZpW7V96p.,yn4'
});
