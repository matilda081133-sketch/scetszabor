import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Живая слежка за логами... Пожалуйста, зайдите на сайт!');
  conn.exec(`
    # Смотрим последние 20 строк логов доступа и ошибок
    tail -n 20 /var/log/nginx/access.log
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => conn.end())
      .on('data', (data) => process.stdout.write(data))
      .stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
