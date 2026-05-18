import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import fs from 'fs';

// Глобальный полифилл в самом начале
if (!process.getBuiltinModule) {
  process.getBuiltinModule = (name) => {
    if (name === 'node:process') return process;
    return null;
  };
}

const app = express();

// Add body parser for JSON
app.use(express.json());

// Telegram Lead API Route
app.post('/api/lead', async (req, res) => {
  const { name, phone, comment, subject } = req.body;
  const token = process.env.TELEGRAM_BOT_TOKEN; // To be filled by user
  const chatId = process.env.TELEGRAM_CHAT_ID; // To be filled by user
  
  const text = `Новая заявка (Спецзабор)!\nУслуга: ${subject || "—"}\nИмя: ${name || "—"}\nТелефон: ${phone || "—"}\nКомментарий: ${comment || "—"}`;
  
  console.log("LEAD RECEIVED:", text);

  if (!token || !chatId) {
    console.log("Telegram credentials not configured, skipping actual send.");
    return res.status(200).json({ success: true, fake: true });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    const result = await response.json();
    if (!result.ok) {
      console.error("Telegram API Error:", result);
      return res.status(500).json({ success: false, error: result.description });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to send to Telegram:", err);
    return res.status(500).json({ success: false, error: "Network error" });
  }
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;


// Serve static client assets
app.use(express.static(join(__dirname, 'dist', 'client')));

import { startTelegramBot } from './start-bot.mjs';

let workerHandler;
let startupError = null;

// Start bot polling in the background without blocking the server
startTelegramBot().catch(console.error);

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
