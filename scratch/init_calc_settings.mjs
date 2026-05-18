import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gryay0m8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-02',
  token: 'skJ71CEaeETGNPJLp6qICsJEsWuSfh2fFmGdnkiPPOpoDgPakYU53Ic7zeShVqmWBjGUAoMYPCt5K3G7LOSg5lZlIF6nGkk2uSVQAdXq7SZDdTRx2kioMqxpNrISjSDUGWbjdFfSMYfyvMGSIJkQMoXJzycDUricOPBowdyuBPDbCzrbZEnN',
});

async function initCalcSettings() {
  const settings = {
    _type: 'calcSettings',
    _id: 'calcSettings', // Fixed ID so it's a singleton
    prices: [
      { _key: '1', key: 'vorota-otkatnye', label: 'Ворота откатные', price: 85000 },
      { _key: '2', key: 'vorota-raspashnye', label: 'Ворота распашные', price: 55000 },
      { _key: '3', key: 'kalitka', label: 'Калитка', price: 24000 },
      { _key: '4', key: 'proflist', label: 'Профлист', price: 2470 },
      { _key: '5', key: 'evro-1ryad', label: 'Евроштакетник в 1 ряд', price: 2770 },
      { _key: '6', key: 'evro-shahmatka', label: 'Шахматка (2 ряда)', price: 3730 },
      { _key: '7', key: 'evro-gorizont', label: 'Евроштакетник горизонталь', price: 3290 },
      { _key: '8', key: 'gitter', label: '3D Gitter', price: 1490 },
      { _key: '9', key: 'jaluzi', label: 'Жалюзи', price: 4490 },
    ],
    heights: [
      { _key: 'h1', label: '1,5 м', value: 1.5, k: 0.9 },
      { _key: 'h2', label: '1,8 м', value: 1.8, k: 1.0 },
      { _key: 'h3', label: '2,0 м', value: 2.0, k: 1.12 },
      { _key: 'h4', label: '2,5 м', value: 2.5, k: 1.32 },
    ]
  };

  console.log('🚀 Инициализация настроек калькулятора в Sanity...');
  await client.createOrReplace(settings);
  console.log('✅ Настройки успешно загружены!');
}

initCalcSettings().catch(console.error);
