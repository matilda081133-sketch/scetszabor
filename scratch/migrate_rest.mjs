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
  // Добавляем то, что пропустили
  { id: "gitter-3", title: "3D Gitter, пруток 3 мм", price: 1490, description: "Бюджетный вариант для дачных участков.", fullContent: "Сварная 3D-сетка с прутком 3 мм...", images: ["gitter-1.jpg", "gitter-2.jpg"] },
  { id: "gitter-38", title: "3D Gitter, пруток 3,8 мм", price: 1890, description: "Усиленный вариант для промобъектов.", fullContent: "Усиленная версия с прутком 3,8 мм...", images: ["gitter-2.jpg", "gitter-1.jpg"] },
  { id: "design-betonnaya-lenta", title: "Бетонная лента под забор", price: 2890, description: "Цокольная декоративная лента.", fullContent: "Декоративный бетонный цоколь...", images: ["beton-lenta-1.jpg", "design-2.jpg"] },
  { id: "design-gabion", title: "Забор из габионов", price: 8990, description: "Сетка с натуральным камнем.", fullContent: "Стена из природного камня в металлической сетке...", images: ["design-1.jpg", "design-2.jpg"] },
  { id: "design-kirpich", title: "Забор с кирпичными столбами", price: 7490, description: "Классика премиум-сегмента.", fullContent: "Кирпичные столбы 380x380 мм на ленточном фундаменте...", images: ["avtorskie-1.jpg", "avtorskie-2.jpg"] },
  { id: "design-bloki", title: "Забор из блоков", price: 6490, description: "Декоративные бетонные блоки.", fullContent: "Столбы из декоративных бетонных блоков...", images: ["bloki-1.jpg", "design-1.jpg"] },
  { id: "design-raschoska", title: "Сварной забор «Расчёска»", price: 4290, description: "Кованый стиль.", fullContent: "Сварной забор из вертикальных прутков 12x12 мм...", images: ["raschoska-1.jpg", "raschoska-2.jpg"] },
  { id: "design-svarnoy", title: "Сварные секции", price: 6490, description: "Изготовим секции по эскизу заказчика.", fullContent: "Эксклюзивные сварные секции под индивидуальный проект...", images: ["svar-secii-1.jpg", "raschoska-1.jpg"] },
  { id: "design-avtorskiy", title: "Авторский забор-жалюзи", price: 5490, description: "Индивидуальный проект.", fullContent: "Авторская реализация забора-жалюзи...", images: ["avtorskie-3.jpg", "jaluzi-3.jpg"] }
];

async function uploadImage(fileName) {
  const filePath = path.join(ASSETS_PATH, fileName);
  if (!fs.existsSync(filePath)) return null;
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename: fileName });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function migrate() {
  console.log('🚀 Дозагрузка оставшихся товаров...');
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
    console.log(`✅ Добавлено: ${p.title}`);
  }
  console.log('🏁 Все товары успешно перенесены!');
}

migrate().catch(console.error);
