// Catalog data: products grouped by category, prices from lenzk.ru
import proflist1 from "@/assets/catalog/proflist-1.jpg";
import proflist2 from "@/assets/catalog/proflist-2.jpg";
import evro1 from "@/assets/catalog/evro-1.jpg";
import evro2 from "@/assets/catalog/evro-2.jpg";
import shahmatka1 from "@/assets/catalog/shahmatka-1.jpg";
import shahmatka2 from "@/assets/catalog/shahmatka-2.jpg";
import gitter1 from "@/assets/catalog/gitter-1.jpg";
import gitter2 from "@/assets/catalog/gitter-2.jpg";
import jaluzi1 from "@/assets/catalog/jaluzi-1.jpg";
import jaluzi2 from "@/assets/catalog/jaluzi-2.jpg";
import derevo1 from "@/assets/catalog/derevo-1.jpg";
import derevo2 from "@/assets/catalog/derevo-2.jpg";
import design1 from "@/assets/catalog/design-1.jpg";
import design2 from "@/assets/catalog/design-2.jpg";

export type Product = {
  id: string;
  category: CategorySlug;
  title: string;
  short: string;
  pricePerM: number; // руб/м.п. под ключ
  height: string;
  features: string[];
  images: string[];
  badge?: string;
};

export type CategorySlug =
  | "proflist"
  | "evroshtaketnik"
  | "gitter"
  | "jaluzi"
  | "derevo"
  | "design"
  | "gates";

export const CATEGORIES: Record<
  CategorySlug,
  { slug: CategorySlug; title: string; href: string; lead: string }
> = {
  proflist: {
    slug: "proflist",
    title: "Заборы из профлиста",
    href: "/proflist",
    lead: "Глухой забор. Защита от ветра, шума и взглядов.",
  },
  evroshtaketnik: {
    slug: "evroshtaketnik",
    title: "Заборы из евроштакетника",
    href: "/evroshtaketnik",
    lead: "Аккуратный современный вид. Один ряд или шахматка.",
  },
  gitter: {
    slug: "gitter",
    title: "3D-сетка Gitter",
    href: "/gitter",
    lead: "Прочно, прозрачно, без обслуживания. Дача и промобъекты.",
  },
  jaluzi: {
    slug: "jaluzi",
    title: "Заборы-жалюзи",
    href: "/jaluzi",
    lead: "Премиальный дизайн. Приватность с продуваемостью.",
  },
  derevo: {
    slug: "derevo",
    title: "Деревянный штакетник",
    href: "/derevo",
    lead: "Натуральное дерево с антисептической обработкой.",
  },
  design: {
    slug: "design",
    title: "Авторские заборы",
    href: "/design",
    lead: "Габионы, комбинации материалов, нестандартные решения.",
  },
  gates: {
    slug: "gates",
    title: "Ворота и калитки",
    href: "/gates",
    lead: "Откатные, распашные, с автоматикой.",
  },
};

export const PRODUCTS: Product[] = [
  // Профлист — цены lenzk.ru (Эконом / Стандарт / Премиум)
  {
    id: "proflist-econom",
    category: "proflist",
    title: "Профлист «Эконом»",
    short: "Каркас грунтован ГФ-021. Базовый бюджетный вариант.",
    pricePerM: 2470,
    height: "1.8 м",
    features: ["Столб 60×60 мм", "Лаги 40×20 мм", "Профлист С8 0,4 мм", "Покрытие ГФ-021"],
    images: [proflist1, proflist2],
  },
  {
    id: "proflist-standart",
    category: "proflist",
    title: "Профлист «Стандарт»",
    short: "Окрашенный каркас эмалью 3в1. Самый популярный вариант.",
    pricePerM: 2680,
    height: "1.8 м",
    features: ["Столб 60×60 мм", "Лаги 40×20 мм", "Профлист С8 0,4 мм", "Эмаль 3в1"],
    images: [proflist2, proflist1],
    badge: "Хит",
  },
  {
    id: "proflist-premium",
    category: "proflist",
    title: "Профлист «Премиум»",
    short: "Усиленный каркас, двусторонний полимер.",
    pricePerM: 3290,
    height: "2.0 м",
    features: ["Столб 60×60×2 мм", "Лаги 40×40 мм", "Профлист 0,5 мм", "ECOSTEEL 2-сторон."],
    images: [proflist1, proflist2],
  },

  // Евроштакетник — цены lenzk.ru
  {
    id: "evro-econom",
    category: "evroshtaketnik",
    title: "Евроштакетник «Эконом»",
    short: "В один ряд, зазор 4 см. Каркас грунтован ГФ-021.",
    pricePerM: 2770,
    height: "1.5 м",
    features: ["Столб 60×60 мм", "Лаги 40×20 мм", "Штакетник 0,4 мм", "Двустороннее покрытие"],
    images: [evro1, evro2],
  },
  {
    id: "evro-standart",
    category: "evroshtaketnik",
    title: "Евроштакетник «Стандарт»",
    short: "В один ряд, зазор 4 см. Окрашенный каркас.",
    pricePerM: 2880,
    height: "1.5 м",
    features: ["Столб 60×60 мм", "Лаги 40×20 мм", "Штакетник 0,4 мм", "Эмаль 3в1"],
    images: [evro2, evro1],
    badge: "Хит",
  },
  {
    id: "evro-standart-18",
    category: "evroshtaketnik",
    title: "Евроштакетник «Стандарт» 1,8 м",
    short: "Один ряд, оптимальная высота для дома.",
    pricePerM: 3040,
    height: "1.8 м",
    features: ["Столб 60×60 мм", "Лаги 40×20 мм", "Штакетник 0,4 мм", "Эмаль 3в1"],
    images: [evro1, evro2],
  },
  {
    id: "evro-premium",
    category: "evroshtaketnik",
    title: "Евроштакетник «Премиум» шахматка",
    short: "Два ряда в шахматном порядке. Не просматривается.",
    pricePerM: 3730,
    height: "1.5 м",
    features: ["Двойная зашивка", "Зазор 7 см", "Полная приватность", "Окрашенный каркас"],
    images: [shahmatka1, shahmatka2],
    badge: "Премиум",
  },
  {
    id: "evro-premium-18",
    category: "evroshtaketnik",
    title: "Евроштакетник «Премиум» 1,8 м",
    short: "Шахматка, оптимальная высота.",
    pricePerM: 3930,
    height: "1.8 м",
    features: ["Шахматное заполнение", "Эмаль 3в1", "Зазор 7 см", "Двусторонний"],
    images: [shahmatka2, shahmatka1],
  },

  // 3D Gitter — цены lenzk.ru
  {
    id: "gitter-1.5",
    category: "gitter",
    title: "3D-сетка Gitter 1,5 м",
    short: "Дачные участки, СНТ, разделение территорий.",
    pricePerM: 1490,
    height: "1.5 м",
    features: ["Пруток 4 мм", "Полимер RAL 6005/7024", "Столб 60×40", "Хомутовый крепёж"],
    images: [gitter1, gitter2],
  },
  {
    id: "gitter-2.0",
    category: "gitter",
    title: "3D-сетка Gitter 2,0 м",
    short: "Промобъекты, парковки, склады.",
    pricePerM: 1890,
    height: "2.0 м",
    features: ["Пруток 5 мм", "Усиленный столб 80×40", "Антивандальный крепёж", "Цинк + полимер"],
    images: [gitter2, gitter1],
  },

  // Жалюзи
  {
    id: "jaluzi-standart",
    category: "jaluzi",
    title: "Жалюзи «Стандарт»",
    short: "Закрытый дизайнерский забор с продуваемостью.",
    pricePerM: 4490,
    height: "2.0 м",
    features: ["Ламель 100 мм", "Двусторонний цвет", "Алюминиевые направляющие", "Не выгорает"],
    images: [jaluzi1, jaluzi2],
    badge: "Премиум",
  },
  {
    id: "jaluzi-premium",
    category: "jaluzi",
    title: "Жалюзи «Премиум»",
    short: "Полная приватность с эффектом продуваемости.",
    pricePerM: 5290,
    height: "2.0 м",
    features: ["Усиленная ламель", "ПЭ-полимер 35 мкм", "Гарантия цвета 10 лет", "Скрытый крепёж"],
    images: [jaluzi2, jaluzi1],
  },

  // Деревянный штакетник
  {
    id: "derevo-standart",
    category: "derevo",
    title: "Деревянный штакетник «Стандарт»",
    short: "Сосна камерной сушки с антисептиком.",
    pricePerM: 1990,
    height: "1.8 м",
    features: ["Доска 20×90 мм", "Антисептик-морилка", "Металлический каркас", "Бетонирование"],
    images: [derevo1, derevo2],
  },
  {
    id: "derevo-premium",
    category: "derevo",
    title: "Деревянный штакетник «Премиум»",
    short: "Лиственница с маслом. Долговечный вариант.",
    pricePerM: 2790,
    height: "1.8 м",
    features: ["Лиственница", "Масло Pinotex", "Скрытый крепёж", "Гарантия 5 лет"],
    images: [derevo2, derevo1],
  },

  // Авторские
  {
    id: "design-gabion",
    category: "design",
    title: "Габионы каменные",
    short: "Стена из камня в сетке. Ландшафтный премиум.",
    pricePerM: 8990,
    height: "1.8 м",
    features: ["Сетка 4 мм оцинк.", "Гранитный камень 40–70 мм", "Каркас из проф. трубы", "Долговечно"],
    images: [design1, design2],
    badge: "Эксклюзив",
  },
  {
    id: "design-wood-gate",
    category: "design",
    title: "Авторские деревянные ворота",
    short: "Массивная конструкция из обрезной доски.",
    pricePerM: 7490,
    height: "2.0 м",
    features: ["Сосна/лиственница", "Кованая фурнитура", "Антисептик", "Под ваш проект"],
    images: [design2, design1],
  },

  // Ворота
  {
    id: "gates-otkat",
    category: "gates",
    title: "Откатные ворота 4 м",
    short: "С автоматикой. Расчёт противовеса по ГОСТ.",
    pricePerM: 89000,
    height: "2.0 м",
    features: ["Каркас 60×40", "Зашивка любая", "Автоматика NICE/AN-Motors", "Пульт + фотоэлементы"],
    images: [shahmatka1, shahmatka2],
    badge: "Под ключ",
  },
  {
    id: "gates-raspash",
    category: "gates",
    title: "Распашные ворота 4 м + калитка",
    short: "Комплект для частного дома.",
    pricePerM: 64000,
    height: "2.0 м",
    features: ["2 створки + калитка", "Усиленные петли", "Засов, замок", "Автоматика по запросу"],
    images: [shahmatka2, shahmatka1],
  },
];

export function productsByCategory(slug: CategorySlug) {
  return PRODUCTS.filter((p) => p.category === slug);
}
