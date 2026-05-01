// Catalog data: products grouped by category
import proflist1 from "@/assets/catalog/proflist-1.jpg";
import proflist2 from "@/assets/catalog/proflist-2.jpg";
import evro1 from "@/assets/catalog/evro-1.jpg";
import evro2 from "@/assets/catalog/evro-2.jpg";
import evroGorizont from "@/assets/catalog/evro-gorizont-1.jpg";
import shahmatka1 from "@/assets/catalog/shahmatka-1.jpg";
import shahmatka2 from "@/assets/catalog/shahmatka-2.jpg";
import gitter1 from "@/assets/catalog/gitter-1.jpg";
import gitter2 from "@/assets/catalog/gitter-2.jpg";
import jaluzi1 from "@/assets/catalog/jaluzi-1.jpg";
import jaluzi2 from "@/assets/catalog/jaluzi-2.jpg";
import jaluzi3 from "@/assets/catalog/jaluzi-3.jpg";
import jaluzi4 from "@/assets/catalog/jaluzi-4.jpg";
import jaluzi5 from "@/assets/catalog/jaluzi-5.jpg";
import jaluzi6 from "@/assets/catalog/jaluzi-6.jpg";
import jaluzi7 from "@/assets/catalog/jaluzi-7.jpg";
import avtorskie1 from "@/assets/catalog/avtorskie-1.jpg";
import avtorskie2 from "@/assets/catalog/avtorskie-2.jpg";
import avtorskie3 from "@/assets/catalog/avtorskie-3.jpg";
import design1 from "@/assets/catalog/design-1.jpg";
import design2 from "@/assets/catalog/design-2.jpg";
import raschoska1 from "@/assets/catalog/raschoska-1.jpg";
import raschoska2 from "@/assets/catalog/raschoska-2.jpg";
import otkatnye1 from "@/assets/catalog/vorota-otkatnye-1.jpg";
import otkatnye2 from "@/assets/catalog/vorota-otkatnye-2.jpg";
import raspashnye1 from "@/assets/catalog/vorota-raspashnye-1.jpg";
import kalitka1 from "@/assets/catalog/kalitka-1.jpg";
import kalitka2 from "@/assets/catalog/kalitka-2.jpg";
import betonLenta from "@/assets/catalog/beton-lenta-1.jpg";
import kirpichStolb from "@/assets/catalog/kirpich-stolb-1.jpg";
import bloki from "@/assets/catalog/bloki-1.jpg";
import svarSecii from "@/assets/catalog/svar-secii-1.jpg";

export type Product = {
  id: string;
  category: CategorySlug;
  title: string;
  short: string;
  /** Цена «от» — за м.п. для заборов или за изделие (ворота/калитки) */
  pricePerM: number;
  priceUnit?: "м.п." | "шт.";
  /** 4 стандартные высоты с ценами/коэффициентами */
  heights?: { h: string; price: number }[];
  height: string;
  features: string[];
  tags?: string[];
  images: string[];
  badge?: string;
  /** Полное описание для страницы товара */
  description?: string;
};

export type CategorySlug =
  | "vorota-otkatnye"
  | "vorota-raspashnye"
  | "kalitki"
  | "proflist"
  | "evroshtaketnik"
  | "gitter"
  | "jaluzi"
  | "dizainerskie";

export const CATEGORIES: Record<
  CategorySlug,
  { slug: CategorySlug; title: string; href: string; lead: string; order: number }
> = {
  "vorota-otkatnye": {
    slug: "vorota-otkatnye",
    title: "Ворота откатные",
    href: "/vorota-otkatnye",
    lead: "Автоматика, ровный ход, экономия места на участке.",
    order: 1,
  },
  "vorota-raspashnye": {
    slug: "vorota-raspashnye",
    title: "Ворота распашные",
    href: "/vorota-raspashnye",
    lead: "Классика. Любые материалы зашивки и автоматика.",
    order: 2,
  },
  kalitki: {
    slug: "kalitki",
    title: "Калитки",
    href: "/kalitki",
    lead: "С замком, доводчиком, домофоном. Под цвет забора.",
    order: 3,
  },
  proflist: {
    slug: "proflist",
    title: "Забор из профлиста",
    href: "/proflist",
    lead: "Глухой забор. Защита от ветра, шума и взглядов.",
    order: 4,
  },
  evroshtaketnik: {
    slug: "evroshtaketnik",
    title: "Забор из евроштакетника",
    href: "/evroshtaketnik",
    lead: "В один ряд, шахматка и горизонтальный — всегда двусторонний окрас.",
    order: 5,
  },
  gitter: {
    slug: "gitter",
    title: "3D Gitter",
    href: "/gitter",
    lead: "Прочно, прозрачно, без обслуживания. Дача и промобъекты.",
    order: 6,
  },
  jaluzi: {
    slug: "jaluzi",
    title: "Забор Жалюзи",
    href: "/jaluzi",
    lead: "Премиальный дизайн. Приватность с продуваемостью.",
    order: 7,
  },
  dizainerskie: {
    slug: "dizainerskie",
    title: "Авторские заборы",
    href: "/dizainerskie",
    lead: "Кирпичные столбы, габионы, бетонные ленты, сварные секции, расчёска.",
    order: 8,
  },
};

/** Стандартные высоты для заборов */
const STD_HEIGHTS = ["1,5 м", "1,8 м", "2,0 м", "2,5 м"];

/** Хелпер: построить таблицу высот по базовой цене 1.8 м */
function heightsFromBase(base: number): { h: string; price: number }[] {
  return [
    { h: STD_HEIGHTS[0], price: Math.round((base * 0.9) / 10) * 10 },
    { h: STD_HEIGHTS[1], price: base },
    { h: STD_HEIGHTS[2], price: Math.round((base * 1.12) / 10) * 10 },
    { h: STD_HEIGHTS[3], price: Math.round((base * 1.32) / 10) * 10 },
  ];
}

export const PRODUCTS: Product[] = [
  // 1. Ворота откатные
  {
    id: "vorota-otkatnye",
    category: "vorota-otkatnye",
    title: "Ворота откатные",
    short: "Автоматические откатные ворота на роликах. Любая зашивка под цвет забора.",
    pricePerM: 85000,
    priceUnit: "шт.",
    height: "1,8 / 2,0 м",
    heights: [
      { h: "1,8 м", price: 85000 },
      { h: "2,0 м", price: 92000 },
    ],
    features: ["Каркас 60×40 мм", "Ролики «Дорхан»", "Автоматика опционально", "Зашивка любая"],
    tags: ["Самый частый запрос", "Экономия места", "Автоматика"],
    images: [otkatnye1, otkatnye2],
    badge: "Хит",
    description:
      "Откатные ворота — оптимальное решение для участка с ограниченным пространством. Полотно сдвигается вдоль забора по направляющей балке на роликовых опорах. Каркас из профильной трубы 60×40 и 40×20 мм, грунтовка ГФ-021 + порошковая или эмаль 3 в 1. Стандартный проём 4 м, высота полотна 1,8 или 2,0 м. Автоматика «Дорхан», CAME или Nice — по запросу.",
  },
  // 2. Ворота распашные
  {
    id: "vorota-raspashnye",
    category: "vorota-raspashnye",
    title: "Ворота распашные",
    short: "Классика — две створки. Любая зашивка, ручной или автоматический привод.",
    pricePerM: 55000,
    priceUnit: "шт.",
    height: "2,0 м",
    features: ["Две створки", "Усиленные петли 3 шт.", "Засов, стопор", "Автоматика опционально"],
    tags: ["Бюджетно", "Надёжность креплений", "Любая зашивка"],
    images: [raspashnye1, raschoska2],
    description:
      "Распашные ворота — самое доступное и проверенное решение. Каркас из профильной трубы 60×40 и 40×20 мм с диагональными усилителями, петли усиленные регулируемые (3 шт. на створку). Зашивка под общий стиль забора: профлист, евроштакетник, жалюзи. Автоматика — линейные приводы CAME, Nice, FAAC.",
  },
  // 3. Калитки
  {
    id: "kalitka",
    category: "kalitki",
    title: "Калитка",
    short: "Стальная калитка под цвет забора. С замком, доводчиком, домофоном — по запросу.",
    pricePerM: 24000,
    priceUnit: "шт.",
    height: "2,0 м",
    features: ["Каркас 40×40 мм", "Замок врезной", "Ручка-кноб", "Доводчик опционально"],
    tags: ["Универсально", "Безопасно", "Под цвет забора"],
    images: [kalitka1, kalitka2],
    description:
      "Калитка изготавливается под общий стиль и цвет забора. Каркас из профильной трубы 40×40 мм с усилителями, петли регулируемые 3 шт. Замок врезной импортный с цилиндровым механизмом, ручка-кноб или скоба. Опции: доводчик, электромагнитный замок, домофон, видеоглазок.",
  },

  // 4. Профлист — единая цена, 4 высоты, окрас одна/две стороны
  {
    id: "proflist",
    category: "proflist",
    title: "Забор из профлиста",
    short: "Глухой забор: защита от ветра, шума и взглядов. Двусторонний окрас по запросу.",
    pricePerM: 2470,
    height: "1,8 м",
    heights: heightsFromBase(2470),
    features: ["Столб 60×60 мм", "Лаги 40×20 мм", "Профлист С8 0,4 мм", "Эмаль 3 в 1"],
    tags: ["Полная глухота", "Защита от ветра", "Хит продаж"],
    images: [proflist1, proflist2],
    badge: "Хит",
    description:
      "Самый востребованный тип забора. Каркас: столбы 60×60 мм бетонируются на глубину 1,2 м, лаги 40×20 мм. Зашивка профлистом С8 толщиной 0,4 мм с двусторонним полимерным покрытием. По умолчанию — одна сторона цвет, изнанка — оцинковка; за доплату делаем двустороннее окрашивание под выбранный RAL.",
  },

  // 5. Евроштакетник — 3 вида, всегда двусторонний окрас, цена от вида и высоты
  {
    id: "evro-odin-ryad",
    category: "evroshtaketnik",
    title: "Евроштакетник в один ряд",
    short: "Аккуратный современный вид. Зазор 4 см, всегда двусторонний окрас.",
    pricePerM: 2770,
    height: "1,8 м",
    heights: heightsFromBase(2770),
    features: ["Штакетник 0,4 мм", "Двусторонний окрас", "Зазор 4 см", "Эмаль 3 в 1"],
    tags: ["Современный дизайн", "Двусторонний", "Хит запросов"],
    images: [evro1, evro2],
    badge: "Хит",
    description:
      "Один ряд штакетника с шагом 8 см (зазор 4 см). Двустороннее полимерное покрытие — забор одинаково красив со стороны улицы и со стороны участка. Каркас на столбах 60×60 мм, лаги 40×20 мм с эмалью 3 в 1.",
  },
  {
    id: "evro-shahmatka",
    category: "evroshtaketnik",
    title: "Евроштакетник в два ряда «Шахматка»",
    short: "Полная приватность. Двойная зашивка штакетника в шахматном порядке.",
    pricePerM: 3730,
    height: "1,8 м",
    heights: heightsFromBase(3730),
    features: ["Двойная зашивка", "Зазор 7 см", "Полная приватность", "Двусторонний"],
    tags: ["Приватность", "Двойная зашивка", "Премиум"],
    images: [shahmatka1, shahmatka2],
    badge: "Премиум",
    description:
      "Двойная зашивка штакетника со смещением создаёт эффект полной непросматриваемости при сохранении продуваемости. Подходит для участков рядом с дорогой и соседями. Двусторонний окрас, эмаль 3 в 1 на каркасе.",
  },
  {
    id: "evro-gorizont",
    category: "evroshtaketnik",
    title: "Евроштакетник горизонтальный",
    short: "Горизонтальная зашивка — самый современный стиль 2026 года.",
    pricePerM: 3290,
    height: "1,8 м",
    heights: heightsFromBase(3290),
    features: ["Горизонтальная установка", "Усиленные стойки", "Двусторонний", "Любой RAL"],
    tags: ["Современный дизайн", "Тренд 2026", "Двусторонний"],
    images: [evroGorizont, evro1],
    description:
      "Штакетник установлен горизонтально между усиленными стойками. Самый трендовый вариант последних лет — выглядит дорого, монтируется быстро. Все элементы окрашены с двух сторон.",
  },

  // 6. 3D Gitter — 4 высоты, две толщины
  {
    id: "gitter-3",
    category: "gitter",
    title: "3D Gitter, пруток 3 мм",
    short: "Бюджетный вариант для дачных участков и СНТ.",
    pricePerM: 1490,
    height: "1,8 м",
    heights: heightsFromBase(1490),
    features: ["Пруток 3 мм", "Полимер RAL 6005/7024", "Столб 60×40", "Хомутовый крепёж"],
    tags: ["Бюджетно", "Без обслуживания", "Прозрачно"],
    images: [gitter1, gitter2],
    description:
      "Сварная 3D-сетка с прутком 3 мм. Полимерное покрытие в стандартных цветах RAL 6005 (зелёный) и RAL 7024 (графит). Высоты 1,5/1,7/2,0/2,4 м. Простой и надёжный забор без обслуживания.",
  },
  {
    id: "gitter-38",
    category: "gitter",
    title: "3D Gitter, пруток 3,8 мм",
    short: "Усиленный вариант для промобъектов и периметров.",
    pricePerM: 1890,
    height: "1,8 м",
    heights: heightsFromBase(1890),
    features: ["Пруток 3,8 мм", "Усиленный столб 80×40", "Антивандальный крепёж", "Цинк + полимер"],
    tags: ["Усиленный", "Антивандально", "Промобъекты"],
    images: [gitter2, gitter1],
    description:
      "Усиленная версия с прутком 3,8 мм и столбами 80×40 мм. Применяется на промышленных объектах, парковках и периметральных ограждениях. Двойная защита: цинк + полимер.",
  },

  // 7. Жалюзи — один товар, цена от высоты
  {
    id: "jaluzi",
    category: "jaluzi",
    title: "Забор Жалюзи",
    short: "Премиальный дизайн с продуваемостью. Двусторонняя ламель 100 мм.",
    pricePerM: 4490,
    height: "1,8 м",
    heights: heightsFromBase(4490),
    features: ["Ламель 100 мм", "Двусторонний цвет", "Алюминиевые направляющие", "Не выгорает"],
    tags: ["Самый частый запрос", "Современный дизайн", "Приватность"],
    images: [jaluzi3, jaluzi5, jaluzi4, jaluzi6, jaluzi7, jaluzi1, jaluzi2],
    badge: "Премиум",
    description:
      "Закрытый дизайнерский забор с эффектом продуваемости. Ламели 100 мм устанавливаются с перекрытием — изнутри и снаружи участка не просматривается. Покрытие — двусторонний полимер ПЭ 25–35 мкм, не выгорает. Гарантия цвета до 10 лет.",
  },

  // 8. Дизайнерские
  {
    id: "design-betonnaya-lenta",
    category: "dizainerskie",
    title: "Бетонная лента под забор",
    short: "Цокольная декоративная лента под любой вид забора.",
    pricePerM: 2890,
    height: "0,3–0,5 м",
    features: ["Армирование", "Опалубка", "Марка бетона М300", "Любая высота"],
    tags: ["Цоколь", "Декор", "Долговечно"],
    images: [betonLenta, design2],
    description:
      "Декоративный бетонный цоколь под забор — закрывает зазор между землёй и полотном, защищает от животных и грязи. Армируется металлическим каркасом, заливается бетоном М300. Высота от 30 см.",
  },
  {
    id: "design-gabion",
    category: "dizainerskie",
    title: "Забор из габионов",
    short: "Сетка с натуральным камнем. Ландшафтный премиум.",
    pricePerM: 8990,
    height: "1,8 м",
    features: ["Сетка 4 мм оцинк.", "Гранитный камень 40–70 мм", "Каркас из проф. трубы", "Долговечно"],
    tags: ["Эксклюзив", "Ландшафт", "Долговечно"],
    images: [design1, design2],
    badge: "Эксклюзив",
    description:
      "Стена из природного камня в металлической сетке. Идеально вписывается в ландшафтный дизайн, шумопоглощает, не требует обслуживания. Каркас из профтрубы и оцинкованной сетки 4 мм. Камень — гранит фракции 40–70 мм.",
  },
  {
    id: "design-kirpich",
    category: "dizainerskie",
    title: "Забор с кирпичными столбами",
    short: "Классика премиум-сегмента. Кирпичные столбы + металлическая зашивка.",
    pricePerM: 7490,
    height: "1,8 м",
    features: ["Кирпич клинкерный", "Армопояс", "Закладные детали", "Колпаки на столбы"],
    tags: ["Премиум", "Классика", "Долговечно"],
    images: [avtorskie1, avtorskie2],
    badge: "Премиум",
    description:
      "Кирпичные столбы 380×380 мм на ленточном фундаменте, между ними — металлическая зашивка (евроштакетник, жалюзи, ковка). Закладные детали интегрированы в кладку. Колпаки металлические или бетонные.",
  },
  {
    id: "design-bloki",
    category: "dizainerskie",
    title: "Забор из блоков",
    short: "Декоративные бетонные блоки под рваный камень или гладкий бетон.",
    pricePerM: 6490,
    height: "1,8 м",
    features: ["Бетонные блоки", "Армопояс", "Любая текстура", "Под покраску"],
    tags: ["Декор", "Под камень", "Современно"],
    images: [bloki, design1],
    description:
      "Столбы из декоративных бетонных блоков под рваный камень или гладкий бетон. Между столбами — металлическая или деревянная зашивка. Бюджетная альтернатива кирпичу с похожим визуальным эффектом.",
  },
  {
    id: "design-raschoska",
    category: "dizainerskie",
    title: "Сварной забор «Расчёска»",
    short: "Кованый стиль. Вертикальные прутки на сварном каркасе.",
    pricePerM: 4290,
    height: "1,8 м",
    heights: heightsFromBase(4290),
    features: ["Пруток 12×12 мм", "Каркас 40×20 мм", "Порошковая покраска", "Пики сверху"],
    tags: ["Кованый стиль", "Надёжность", "Декор"],
    images: [raschoska1, raschoska2],
    badge: "Хит",
    description:
      "Сварной забор из вертикальных прутков 12×12 мм на каркасе 40×20 мм. Декоративные пики сверху. Порошковая покраска RAL по выбору. Стилистика — лёгкая ковка, подходит к каменным и кирпичным столбам.",
  },
  {
    id: "design-svarnoy",
    category: "dizainerskie",
    title: "Сварные секции — любая конфигурация",
    short: "Изготовим секции по эскизу заказчика. Ковка, лазерная резка, комбинации.",
    pricePerM: 6490,
    height: "1,8 м",
    features: ["По эскизу", "Лазерная резка", "Кованая фурнитура", "Антикор + полимер"],
    tags: ["Под проект", "Эксклюзив", "Лазерная резка"],
    images: [svarSecii, raschoska1],
    badge: "Эксклюзив",
    description:
      "Эксклюзивные сварные секции под индивидуальный проект. Лазерная резка декоративных элементов, кованая фурнитура, комбинированные материалы. Антикоррозионная обработка + порошковое покрытие.",
  },
  {
    id: "design-avtorskiy",
    category: "dizainerskie",
    title: "Авторский забор-жалюзи",
    short: "Индивидуальный проект — жалюзи, авторский каркас, нестандартная высота.",
    pricePerM: 5490,
    height: "1,8 м",
    features: ["Индивидуальный эскиз", "Усиленный каркас", "Двусторонний полимер", "Любой RAL"],
    tags: ["Авторский", "Под проект", "Премиум"],
    images: [avtorskie3, jaluzi3],
    badge: "Премиум",
    description:
      "Авторская реализация забора-жалюзи под индивидуальный проект. Подходит для участков с акцентом на современную архитектуру. Двусторонний полимер, любой RAL, усиленные стойки и направляющие.",
  },
];

export function productsByCategory(slug: CategorySlug) {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

/** Категории по порядку из ТЗ */
export const CATEGORIES_ORDERED = Object.values(CATEGORIES).sort((a, b) => a.order - b.order);
