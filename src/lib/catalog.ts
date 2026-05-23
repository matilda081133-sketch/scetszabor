import { client } from "./sanity/client";

// Catalog data: products grouped by category
import proflist1 from "@/assets/catalog/proflist-1.jpg";
// ... (imports remain the same for fallback)
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
import gitter1 from "@/assets/catalog/gitter-1.jpg";
import gitter2 from "@/assets/catalog/gitter-2.jpg";

export type Product = {
  id: string;
  category: CategorySlug;
  title: string;
  short: string;
  pricePerM: number;
  priceUnit?: "м.п." | "шт.";
  heights?: { h: string; price: number }[];
  height: string;
  features: string[];
  tags?: string[];
  images: string[];
  badge?: string;
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

const STD_HEIGHTS = ["1,5 м", "1,8 м", "2,0 м", "2,5 м"];

function heightsFromBase(base: number): { h: string; price: number }[] {
  return [
    { h: STD_HEIGHTS[0], price: Math.round((base * 0.9) / 10) * 10 },
    { h: STD_HEIGHTS[1], price: base },
    { h: STD_HEIGHTS[2], price: Math.round((base * 1.12) / 10) * 10 },
    { h: STD_HEIGHTS[3], price: Math.round((base * 1.32) / 10) * 10 },
  ];
}

// Hardcoded fallback data
const STATIC_PRODUCTS: Product[] = [
  {
    id: "vorota-otkatnye",
    category: "vorota-otkatnye",
    title: "Ворота откатные",
    short: "Откатные ворота под ключ с итальянской автоматикой. Усиленная балка Ролтэк, жесткий каркас ГОСТ и антикоррозийная защита. Идеальный вариант для экономии места с гарантией долговечности.",
    pricePerM: 85000,
    priceUnit: "шт.",
    height: "1,8 / 2,0 м",
    heights: [
      { h: "1,8 м", price: 85000 },
      { h: "2,0 м", price: 92000 },
    ],
    features: ["Каркас 60х40х2 мм", "Балка Ролтэк Микро/Эко", "Антикоррозийный грунт", "Итальянская автоматика"],
    tags: ["Самый частый запрос", "Экономия места", "Комфорт"],
    images: [otkatnye1, otkatnye2],
    badge: "Хит",
    description: "Откатные ворота — это современный стандарт загородного дома. Никаких провисающих створок и снега, мешающего выезду. Мы используем усиленный каркас и премиальную фурнитуру, чтобы ворота служили десятилетиями без перекосов. Вы можете выбрать любую зашивку: от глухого профлиста до дизайнерского жалюзи. Интеграция автоматики возможна как сразу при монтаже, так и позже.",
  },
  {
    id: "vorota-raspashnye",
    category: "vorota-raspashnye",
    title: "Ворота распашные",
    short: "Распашные ворота из металла ГОСТ с усиленными петлями на подшипниках. Жесткий каркас исключает провисание. Долговечное решение под любую зашивку с возможностью установки автоматики.",
    pricePerM: 55000,
    priceUnit: "шт.",
    height: "2,0 м",
    features: ["Столбы 80х80х3 мм", "Каркас 40х40х2 мм", "Петли на подшипниках", "Нижние стопора и засов"],
    tags: ["Бюджетно", "Надёжность креплений", "Любая зашивка"],
    images: [raspashnye1, raschoska2],
    description: "Распашные ворота — проверенное временем, самое доступное и надежное решение. Идеально подходят для участков, где нет места для отката створки. Мы комплектуем ворота усиленными петлями и надежными засовами, чтобы исключить провисание и люфт. Зашивка — на ваш выбор: от евроштакетника до профлиста. При желании сразу установим итальянские приводы для автоматического открытия с пульта.",
  },
  {
    id: "kalitka",
    category: "kalitki",
    title: "Калитка",
    short: "Надежная стальная калитка в едином стиле с забором. Усиленный жесткий каркас из профильной трубы 40х40 мм полностью исключает провисания и перекосы. В комплекте надежный врезной замок и эргономичная ручка.",
    pricePerM: 24000,
    priceUnit: "шт.",
    height: "2,0 м",
    features: ["Столбы 60х60х2 мм", "Каркас 40х40х2 мм", "Врезной узкопрофильный замок", "Заглушки ПВХ на столбы"],
    tags: ["Универсально", "Безопасно", "Под цвет забора"],
    images: [kalitka1, kalitka2],
    description: "Калитка — это лицо вашего участка. Мы изготавливаем её под общий стиль забора, используя жесткий каркас 40х40 мм, который не деформируется со временем. В базовую комплектацию уже входит надежный врезной замок и эргономичная ручка-кноб. Дополнительно можно установить доводчик и подготовить каркас под видеодомофон или электромеханический замок.",
  },
  {
    id: "proflist",
    category: "proflist",
    title: "Забор из профлиста",
    short: "Глухой забор из профнастила ГОСТ толщиной 0.45 мм. Максимальная приватность, защита от ветра и дорожного шума. Антикоррозийный грунт и мощные столбы обеспечивают ветровую устойчивость.",
    pricePerM: 2470,
    height: "1,8 м",
    heights: heightsFromBase(2470),
    features: ["Столбы 60х60х2 мм", "Профлист 0.45 мм ГОСТ", "Лаги 40х20х1.5 мм", "Антикоррозийный грунт ГФ-021"],
    tags: ["Полная глухота", "Защита от ветра", "Хит продаж"],
    images: [proflist1, proflist2],
    badge: "Хит",
    description: "Забор из профлиста — абсолютный хит для тех, кто ценит приватность. Он полностью закрывает участок от чужих взглядов, снижает уровень дорожного шума и защищает от сквозняков. Мы используем качественный металл ГОСТ толщиной 0.4 мм с полимерным покрытием, который не выцветает на солнце и не ржавеет. Мощный каркас обеспечивает высокую ветровую устойчивость.",
  },
  {
    id: "evro-odin-ryad",
    category: "evroshtaketnik",
    title: "Евроштакетник в один ряд",
    short: "Евроштакетник в один ряд для идеальной циркуляции воздуха. Двусторонний окрас, металл 0.45 мм ГОСТ и завальцованные края. Стильное и безопасное ограждение с долгим сроком службы.",
    pricePerM: 2770,
    height: "1,8 м",
    heights: heightsFromBase(2770),
    features: ["Штакетник 0.45 мм ГОСТ", "Столбы 60х60х2 мм", "Лаги 40х20х1.5 мм", "Завальцованные края (безопасно)"],
    tags: ["Современный дизайн", "Двусторонний", "Хит запросов"],
    images: [evro1, evro2],
    badge: "Хит",
    description: "Евроштакетник в один ряд — выбор эстетов. Он обеспечивает участку правильную циркуляцию воздуха, не создавая «парникового эффекта» (что критично для растений), при этом выглядит стильно и современно. Мы устанавливаем планки с идеальным зазором 4 см, а двусторонний окрас гарантирует, что забор будет выглядеть премиально как с улицы, так и со двора.",
  },
  {
    id: "evro-shahmatka",
    category: "evroshtaketnik",
    title: "Евроштакетник в два ряда «Шахматка»",
    short: "Забор-шахматка из евроштакетника. Двойная зашивка обеспечивает полную приватность, сохраняя отличную продуваемость. Премиальный дизайн и массивная конструкция из металла ГОСТ.",
    pricePerM: 3730,
    height: "1,8 м",
    heights: heightsFromBase(3730),
    features: ["Штакетник 0.45 мм", "Столбы 60х60х2 мм", "Шаг планок 7-8 см", "Каркас выкрашен в цвет забора"],
    tags: ["Приватность", "Двойная зашивка", "Премиум"],
    images: [shahmatka1, shahmatka2],
    badge: "Премиум",
    description: "Шахматка решает главную дилемму: как закрыться от соседей, но не превратить участок в глухую коробку. Планки устанавливаются в два ряда со смещением: под прямым углом забор выглядит абсолютно глухим, но при этом отлично пропускает воздух под углом. Выглядит массивно, дорого и одинаково красиво с обеих сторон. Настоящий премиум-класс.",
  },
  {
    id: "evro-gorizont",
    category: "evroshtaketnik",
    title: "Евроштакетник горизонтальный",
    short: "Горизонтальный евроштакетник для современных коттеджей. Усиленный П-образный профиль исключает провисание ламелей. Строгая геометрия и антикоррозийная защита премиум-класса.",
    pricePerM: 4100,
    height: "1,8 м",
    heights: heightsFromBase(4100),
    features: ["Штакетник 0.45 мм", "Усиленный П-образный профиль", "Столбы 80х80х3 мм", "Скрытый крепеж заклепками"],
    tags: ["Нестандартно", "Дизайн", "Премиум"],
    images: [evroGorizont, evro1],
    description: "Горизонтальный евроштакетник — выбор для современной архитектуры в стиле барнхаус или хай-тек. Планки крепятся горизонтально, создавая строгий ритмичный рисунок фасада. Мы используем усиленный П-образный профиль для исключения провисания длинных ламелей. Идеально сочетается с кирпичными и габионными столбами.",
  },
  {
    id: "jaluzi",
    category: "jaluzi",
    title: "Забор Жалюзи",
    short: "Забор Жалюзи со скрытым крепежом без саморезов. Толстый металл 0.45 мм, цинк и полимерное покрытие. Полная приватность с улицы и идеальная вентиляция участка. Премиальная эстетика.",
    pricePerM: 6500,
    height: "1,8 м",
    heights: heightsFromBase(6500),
    features: ["Ламели 0.45-0.5 мм", "Скрытый крепеж (без саморезов)", "Оцинковка + Полимер", "П-образная планка по контуру"],
    tags: ["Элитно", "Скрытый крепёж", "Дизайн"],
    images: [jaluzi1, jaluzi2],
    badge: "Премиум",
    description: "Забор-жалюзи — символ статуса и безупречного вкуса. Особый профиль ламелей расположен под углом: с улицы ваш участок абсолютно не просматривается, но со стороны двора вы видите улицу. Конструкция обеспечивает идеальную вентиляцию, необходимую для ландшафтного дизайна. Мы используем толстый металл 0.45 мм и технологию скрытого крепежа — никаких саморезов на фасаде, только монолитная эстетика.",
  },
  {
    id: "gitter",
    category: "gitter",
    title: "Забор из 3D-сетки Gitter",
    short: "Антивандальный забор из 3D-сетки Gitter. Стальной пруток до 4 мм с V-образными ребрами жесткости. Заводское цинкование и порошковое покрытие гарантируют 15+ лет без ржавчины. Максимум света.",
    pricePerM: 1950,
    height: "1,73 м",
    heights: heightsFromBase(1950),
    features: ["Пруток 3.5 или 4 мм", "Столбы 60х40х1.5 мм", "Ячейка 50х200 мм", "Оцинковка + RAL порошок"],
    tags: ["Антивандально", "Светопропускание", "Эконом"],
    images: [gitter1, gitter2],
    badge: "Хит",
    description: "Сетка Gitter 3D — лучшее решение для сохранения естественного освещения участка. Благодаря V-образным ребрам жесткости и прутку 4 мм, забор обладает высокой антивандальной стойкостью: его практически невозможно погнуть или разрезать бытовым инструментом. Заводское антикоррозийное покрытие гарантирует 15+ лет службы без подкрасов. Отлично подходит для садоводств с требованиями к прозрачности ограждений.",
  },
  {
    id: "dizainerskie",
    category: "dizainerskie",
    title: "Авторские заборы",
    short: "Комбинированные заборы на ленточном фундаменте с кирпичными или габионными столбами. Инженерный расчет ветровых нагрузок, арматура А500С и долговечные материалы для эксклюзивных проектов.",
    pricePerM: 15000,
    height: "2,0 м",
    heights: heightsFromBase(15000),
    features: ["Ростверк на буронабивных сваях", "Кирпич ЛСР / Габионы", "Арматура А500С", "Точный инженерный расчет"],
    tags: ["Эксклюзив", "Капитально", "Под ключ"],
    images: [design1, design2],
    badge: "Авторские",
    description: "Дизайнерские заборы — для тех, кто не признает стандартов. Мы реализуем комбинированные ограждения любой сложности: массивные кирпичные столбы на железобетонном фундаменте, экологичные габионы с природным камнем, секции лазерной резки металла или ограждения в стиле «расческа». Каждый проект рассчитывается индивидуально инженером-конструктором с учетом геологии участка и ветровых нагрузок. Ваш дом начинается с идеального забора.",
  },
];

// Helper to transform Sanity data to our Product type
function transformSanityProduct(sp: any): Product {
  const staticMatch = STATIC_PRODUCTS.find(p => p.id === sp.slug.current);
  return {
    id: sp.slug.current,
    category: staticMatch ? staticMatch.category : (sp.slug.current.includes("vorota") ? (sp.slug.current as CategorySlug) : "proflist"),
    title: sp.title || staticMatch?.title || "",
    short: staticMatch?.short || sp.description || "",
    pricePerM: sp.price || staticMatch?.pricePerM || 0,
    height: "1,8 м",
    features: sp.features?.length > 0 ? sp.features : (staticMatch?.features || ["Монтаж по СНиП", "Гарантия по договору", "Качественные материалы", "Инженерный замер"]),
    images: sp.gallery?.map((img: any) => img.asset?.url) || staticMatch?.images || [],
    description: sp.fullContent || staticMatch?.description || sp.description || "",
    badge: sp.badge || staticMatch?.badge || "",
    tags: staticMatch?.tags || [],
  };
}

let DYNAMIC_PRODUCTS: Product[] = [];

try {
  const sanityProducts = await client.fetch('*[_type == "product"]{..., "gallery": gallery[]{..., asset->{url}}}');
  if (sanityProducts && sanityProducts.length > 0) {
    DYNAMIC_PRODUCTS = sanityProducts.map(transformSanityProduct);
  }
} catch (e) {
  console.error("Sanity fetch failed, using fallback catalog:", e);
}

export const PRODUCTS: Product[] = STATIC_PRODUCTS.map(staticProd => {
  const dynamicProd = DYNAMIC_PRODUCTS.find(dp => dp.id === staticProd.id);
  return dynamicProd || staticProd;
});

// Also add any dynamic products that might not exist in STATIC_PRODUCTS at all
DYNAMIC_PRODUCTS.forEach(dp => {
  if (!PRODUCTS.find(p => p.id === dp.id)) {
    PRODUCTS.push(dp);
  }
});

export function productsByCategory(slug: CategorySlug) {
  return PRODUCTS.filter((p) => p.category === slug || (slug === "evroshtaketnik" && p.id.includes("evro")));
}

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export const CATEGORIES_ORDERED = Object.values(CATEGORIES).sort((a, b) => a.order - b.order);
