

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8986328079:AAGR3IMfBNmllYVpemnxoKZGgJ6A2tahyvQ';

export async function startTelegramBot() {
  let offset = 0;
  
  const botMessage = `Здравствуйте! Спасибо, что обратились в компанию СПЕЦЗАБОР. 🚧\n\nЧтобы мы могли дать максимально точный и быстрый ответ, пожалуйста, уточните:\n1. Какой тип забора или ворот вас интересует?\n2. Примерная длина (в метрах)\n3. Где находится ваш участок?\n\nМенеджер уже получил ваше сообщение и ответит вам в ближайшее время. Если у вас есть эскиз или фото — смело прикрепляйте!`;

  while (true) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=30`);
      if (!res.ok) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      const data = await res.json();
      if (!data.ok) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      
      for (const update of data.result) {
        offset = update.update_id + 1;
        
        if (update.message && update.message.text) {
          const chatId = update.message.chat.id;
          const text = update.message.text;
          
          // Send auto-reply to customer on first interaction
          if (text.startsWith('/start') || text.toLowerCase().includes('сайт') || text.toLowerCase().includes('здравствуйте') || text.toLowerCase().includes('забор') || text.toLowerCase().includes('услуг')) {
             await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({
                 chat_id: chatId,
                 text: botMessage
               })
             });
             
             // Forward to Admin Chat
             const adminChatId = process.env.TELEGRAM_CHAT_ID;
             if (adminChatId && String(chatId) !== String(adminChatId)) {
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    chat_id: adminChatId,
                    text: `🔔 НОВЫЙ ЛИД ИЗ БОТА!\nОт: @${update.message.from?.username || update.message.from?.first_name || 'клиента'}\nТекст: ${text}`
                  })
                });
             }
          }
        }
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}
