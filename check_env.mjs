import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  conn.exec('cat /var/www/speczabor/.env', (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      conn.end();
    }).on('data', (data) => {
      console.log('ENV CONTENT:\n' + data.toString());
    }).stderr.on('data', (data) => {
      console.error('STDERR: ' + data);
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
