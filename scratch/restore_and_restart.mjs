import { Client } from 'ssh2';
import { readFileSync } from 'fs';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Загрузка исправления...');
  conn.sftp((err, sftp) => {
    if (err) throw err;
    
    // Загружаем обновленный server-node.mjs
    const localFile = 'server-node.mjs';
    const remoteFile = '/var/www/speczabor/server-node.mjs';
    
    sftp.fastPut(localFile, remoteFile, {}, (err) => {
      if (err) throw err;
      console.log('✅ Файл загружен. Перезапуск...');
      
      conn.exec(`
        cd /var/www/speczabor
        # Восстанавливаем оригинальные файлы из архива (чтобы убрать мои правки sed)
        tar -xzf /tmp/deploy_package.tar.gz server-node.mjs --exclude=server-node.mjs # восстановит всё кроме самого адаптера
        tar -xzf /tmp/deploy_package.tar.gz dist # восстановит папку dist
        
        pm2 restart speczabor
      `, (err, stream) => {
        if (err) throw err;
        stream.on('close', () => {
          console.log('🏁 Всё готово!');
          conn.end();
        }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
      });
    });
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
