import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('✅ Подключено. Применяю финальный фикс...');
  conn.exec(`
    cd /var/www/speczabor
    
    # 1. Точечно устанавливаем express (не перегрузит память)
    npm install express
    
    # 2. Перезаписываем серверный адаптер с правильным полифиллом
    cat << 'EOF' > server-node.mjs
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

// Глобальный полифилл в самом начале
globalThis.getBuiltinModule = (name) => {
  if (name === 'node:process') return process;
  return null;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const serverIndexPath = pathToFileURL(join(__dirname, 'dist', 'server', 'index.js')).href;
const { default: workerHandler } = await import(serverIndexPath);

import express from 'express';
const app = express();

app.all('*', async (req, res) => {
  try {
    const url = new URL(req.url, \`http://\${req.headers.host}\`);
    const request = new Request(url.href, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    const response = await workerHandler.fetch(request, {
      env: process.env,
    });

    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    const body = await response.text();
    res.send(body);
  } catch (e) {
    console.error('Error handling request:', e);
    res.status(500).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});
EOF

    # 3. Перезапускаем сайт
    pm2 restart speczabor
    echo "READY_TO_CHECK"
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('🏁 Скрипт выполнен.');
      conn.end();
    }).on('data', (data) => process.stdout.write(data)).stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '83.217.202.153',
  port: 22,
  username: 'root',
  password: 'ueaB+,E3fUYM.9'
});
