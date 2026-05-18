import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gryay0m8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-02',
  token: 'skJ71CEaeETGNPJLp6qICsJEsWuSfh2fFmGdnkiPPOpoDgPakYU53Ic7zeShVqmWBjGUAoMYPCt5K3G7LOSg5lZlIF6nGkk2uSVQAdXq7SZDdTRx2kioMqxpNrISjSDUGWbjdFfSMYfyvMGSIJkQMoXJzycDUricOPBowdyuBPDbCzrbZEnN',
});

async function checkData() {
  try {
    const count = await client.fetch('count(*[_type == "product"])');
    console.log(`Количество товаров в базе: ${count}`);
    
    if (count > 0) {
      const first = await client.fetch('*[_type == "product"][0]{title}');
      console.log(`Первый товар: ${first.title}`);
    }
  } catch (e) {
    console.error('Ошибка запроса:', e.message);
  }
}

checkData();
