import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

// Глобальный полифилл в самом начале
globalThis.getBuiltinModule = (name) => {
  console.log('Polyfill called for:', name);
  if (name === 'node:process') return process;
  return null;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const serverIndexPath = pathToFileURL(join(__dirname, 'dist', 'server', 'index.js')).href;
const { default: workerHandler } = await import(serverIndexPath);

import express from 'express';
const app = express();

// Serve static client assets
app.use(express.static(join(__dirname, 'dist', 'client')));

app.use(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
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
  console.log(`Server running at http://localhost:${PORT}`);
});
