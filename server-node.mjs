import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import fs from 'fs';

// Глобальный полифилл в самом начале
globalThis.getBuiltinModule = (name) => {
  console.log('Polyfill called for:', name);
  if (name === 'node:process') return process;
  return null;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();

// Serve static client assets
app.use(express.static(join(__dirname, 'dist', 'client')));

let workerHandler;
let startupError = null;

try {
  const serverIndexPath = pathToFileURL(join(__dirname, 'dist', 'server', 'index.js')).href;
  const module = await import(serverIndexPath);
  workerHandler = module.default;
} catch (e) {
  console.error("Failed to load workerHandler:", e);
  startupError = e;
}

app.use(async (req, res) => {
  if (startupError) {
    return res.status(500).send(`
      <h1>Server Startup Error</h1>
      <pre>${startupError.stack || startupError.toString()}</pre>
    `);
  }
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
    res.status(500).send(`
      <h1>Request Error</h1>
      <pre>${e.stack || e.toString()}</pre>
    `);
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  fs.writeFileSync(join(__dirname, 'debug_error.txt'), err.stack || err.toString());
});

process.on('uncaughtException', (err) => {
  fs.writeFileSync(join(__dirname, 'debug_error.txt'), err.stack || err.toString());
});
