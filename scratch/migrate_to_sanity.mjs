import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: 'gryay0m8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-02',
  token: 'skJ71CEaeETGNPJLp6qICsJEsWuSfh2fFmGdnkiPPOpoDgPakYU53Ic7zeShVqmWBjGUAoMYPCt5K3G7LOSg5lZlIF6nGkk2uSVQAdXq7SZDdTRx2kioMqxpNrISjSDUGWbjdFfSMYfyvMGSIJkQMoXJzycDUricOPBowdyuBPDbCzrbZEnN',
});

const ASSETS_PATH = 'c:/Users/Honor/OneDrive/Desktop/проект спецзабор/lovable-app/src/assets/catalog';

const productsData = [
  { id: "vorota-otkatnye", title: "Ворота откатные", price: 85000, description: "Автоматические откатные ворота на роликах.", fullContent: "Откатные ворота — оптимальное решение...", images: ["vorota-otkatnye-1.jpg", "vorota-otkatnye-2.jpg"] },
  { id: "vorota-raspashnye", title: "Ворота распашные", price: 55000, description: "Классика — две створки.", fullContent: "Распашные ворота — самое доступное решение...", images: ["vorota-raspashnye-1.jpg", "raschoska-2.jpg"] },
  { id: "kalitka", title: "Калитка", price: 24000, description: "Стальная калитка под цвет забора.", fullContent: "Калитка изготавливается под общий стиль...", images: ["kalitka-1.jpg", "kalitka-2.jpg"] },
  { id: "proflist", title: "Забор из профлиста", price: 2470, description: "Глухой забор.", fullContent: "Самый востребованный тип забора...", images: ["proflist-1.jpg", "proflist-2.jpg"] },
  { id: "evro-odin-ryad", title: "Евроштакетник в один ряд", price: 2770, description: "Аккуратный современный вид.", fullContent: "Один ряд штакетника с шагом 8 см...", images: ["evro-1.jpg", "evro-2.jpg"] },
  { id: "evro-shahmatka", title: "Евроштакетник в два ряда «Шахматка»", price: 3730, description: "Полная приватность.", fullContent: "Двойная зашивка штакетника со смещением...", images: ["shahmatka-1.jpg", "shahmatka-2.jpg"] },
  { id: "evro-gorizont", title: "Евроштакетник горизонтальный", price: 3290, description: "Горизонтальная зашивка.", fullContent: "Штакетник установлен горизонтально...", images: ["evro-gorizont-1.jpg", "evro-1.jpg"] },
  { id: "jaluzi", title: "Забор Жалюзи", price: 4490, description: "Премиальный дизайн.", fullContent: "Закрытый дизайнерский забор...", images: ["jaluzi-3.jpg", "jaluzi-5.jpg", "jaluzi-4.jpg"] }
];

async function uploadImage(fileName) {
  const filePath = path.join(ASSETS_PATH, fileName);
  if (!fs.existsSync(filePath)) return null;
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename: fileName });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function migrate() {
  console.log('🚀 Перезапуск миграции с фиксом ключей...');
  for (const p of productsData) {
    const gallery = [];
    for (const img of p.images) {
      const uploaded = await uploadImage(img);
      if (uploaded) {
        gallery.push({ ...uploaded, _key: Math.random().toString(36).substring(2, 9) });
      }
    }
    const doc = {
      _type: 'product',
      _id: `migrated-${p.id}`,
      title: p.title,
      slug: { _type: 'slug', current: p.id },
      price: p.price,
      description: p.description,
      fullContent: p.fullContent,
      mainImage: gallery[0],
      gallery: gallery
    };
    await client.createOrReplace(doc);
    console.log(`✅ Исправлено: ${p.title}`);
  }
  console.log('🏁 Ошибки устранены!');
}

migrate().catch(console.error);
