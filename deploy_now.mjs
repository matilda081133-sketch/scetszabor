import { Client } from 'ssh2';
import fs from 'fs';

const conn = new Client();
const localZip = 'deploy_dist.zip';
const remoteZip = '/var/www/speczabor/deploy_dist.zip';
const remoteDir = '/var/www/speczabor';

console.log('Connecting to server...');

conn.on('ready', () => {
  console.log('✅ Connected via SSH.');
  
  conn.sftp((err, sftp) => {
    if (err) throw err;
    console.log('Starting upload of ' + localZip + ' ...');
    
    sftp.fastPut(localZip, remoteZip, (err) => {
      if (err) throw err;
      console.log('✅ Upload complete.');
      
      console.log('Unzipping and restarting PM2...');
      conn.exec(`
        cd ${remoteDir}
        rm -rf dist_backup
        mv dist dist_backup || true
        unzip -o deploy_dist.zip -d dist
        rm deploy_dist.zip
        pm2 restart speczabor
      `, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
          console.log('🏁 Deployment script completed with code ' + code);
          conn.end();
        }).on('data', (data) => {
          process.stdout.write(data);
        }).stderr.on('data', (data) => {
          process.stderr.write(data);
        });
      });
    });
  });
}).on('error', (err) => {
  console.error('SSH Connection Error:', err);
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'wZpW7V96p.,yn4',
  readyTimeout: 60000
});
