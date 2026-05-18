import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gryay0m8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-02',
  token: 'skJ71CEaeETGNPJLp6qICsJEsWuSfh2fFmGdnkiPPOpoDgPakYU53Ic7zeShVqmWBjGUAoMYPCt5K3G7LOSg5lZlIF6nGkk2uSVQAdXq7SZDdTRx2kioMqxpNrISjSDUGWbjdFfSMYfyvMGSIJkQMoXJzycDUricOPBowdyuBPDbCzrbZEnN',
});

async function cleanup() {
  try {
    // Удаляем все документы без заголовка (те самые Untitled)
    console.log('🧹 Удаляю пустые черновики...');
    await client.delete({query: '*[_type == "product" && !defined(title)]'});
    console.log('✅ Очистка завершена.');
  } catch (e) {
    console.error('Ошибка:', e.message);
  }
}

cleanup();
