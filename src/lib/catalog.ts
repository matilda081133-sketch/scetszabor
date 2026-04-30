// Catalog data: products grouped by category, prices in line with lenzk.ru avg
import proflist1 from "@/assets/proflist-1.jpg";
import proflist2 from "@/assets/proflist-2.jpg";
import proflist3 from "@/assets/proflist-3.jpg";
import evro1 from "@/assets/evro-1.jpg";
import evro2 from "@/assets/evro-2.jpg";
import evro3 from "@/assets/evro-3.jpg";
import gitter1 from "@/assets/gitter-1.jpg";
import gitter2 from "@/assets/gitter-2.jpg";
import jaluzi1 from "@/assets/jaluzi-1.jpg";
import jaluzi2 from "@/assets/jaluzi-2.jpg";
import design1 from "@/assets/design-1.jpg";
import design2 from "@/assets/design-2.jpg";
import gates1 from "@/assets/gates-1.jpg";
import gates2 from "@/assets/gates-2.jpg";

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
    lead: "Аккуратный современный вид. Ряд, шахматка, горизонталь.",
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
  design: {
    slug: "design",
    title: "Дизайнерские заборы",
    href: "/design",
    lead: "Кирпичные столбы, габионы, комбинации материалов.",
  },
  gates: {
    slug: "gates",
    title: "Ворота и калитки",
    href: "/gates",
    lead: "Откатные, распашные, с автоматикой. Расчёт противовеса.",
  },
};

export const PRODUCTS: Product[] = [
  // Proflist
  {
    id: "proflist-c8-0.45",
    category: "proflist",
    title: "Профлист С8, 0,45 мм",
    short: "Базовый забор. Полимерное покрытие, полная зашивка.",
    pricePerM: 1990,
    height: "1.8 м",
    features: ["Столб 60×60×2 мм", "Лаги 40×20×2 мм", "Бетонирование", "Цвет на выбор RAL"],
    images: [proflist1, proflist2, proflist3],
    badge: "Хит",
  },
  {
    id: "proflist-c8-0.5",
    category: "proflist",
    title: "Профлист С8, 0,5 мм",
    short: "Усиленный металл, гарантия от выгорания.",
    pricePerM: 2290,
    height: "2.0 м",
    features: ["Столб 60×60×2 мм", "Лаги 40×40×2 мм", "Двусторонний ECOSTEEL", "Заглушки"],
    images: [proflist2, proflist3, proflist1],
  },
  {
    id: "proflist-c20",
    category: "proflist",
    title: "Профлист С20, 0,5 мм",
    short: "Высокая ветровая нагрузка. Для открытых участков.",
    pricePerM: 2590,
    height: "2.0 м",
    features: ["Жёсткое ребро С20", "Столб 60×60×3 мм", "3 лаги", "Антикоррозия"],
    images: [proflist3, proflist1, proflist2],
  },
  // Evroshtaketnik
  {
    id: "evro-1ryad",
    category: "evroshtaketnik",
    title: "Евроштакетник в один ряд",
    short: "Классическая зашивка с просветом.",
    pricePerM: 2290,
    height: "1.8 м",
    features: ["Штакетник 110 мм", "Двусторонний полимер", "Просвет 30–50 мм", "RAL на выбор"],
    images: [evro1, evro2, evro3],
    badge: "Хит",
  },
  {
    id: "evro-shahmatka",
    category: "evroshtaketnik",
    title: "Евроштакетник «шахматка»",
    short: "Двойная зашивка. Не видно с улицы — продувается.",
    pricePerM: 2890,
    height: "1.8 м",
    features: ["2 ряда штакетника", "Полная приватность", "Эффект объёма", "ГОСТовая сварка"],
    images: [evro2, evro3, evro1],
  },
  {
    id: "evro-gorizont",
    category: "evroshtaketnik",
    title: "Евроштакетник горизонтальный",
    short: "Современный вид, акцент на ширине участка.",
    pricePerM: 2790,
    height: "1.8 м",
    features: ["Горизонтальная зашивка", "Доп. опоры", "Скрытый крепёж", "Любая длина"],
    images: [evro3, evro1, evro2],
  },
  // Gitter
  {
    id: "gitter-1.5",
    category: "gitter",
    title: "3D-сетка Gitter 1,5 м",
    short: "Дачные участки, СНТ, разделение территорий.",
    pricePerM: 1490,
    height: "1.5 м",
    features: ["Пруток 4 мм", "Полимер RAL 6005", "Столб 60×40", "Хомутовый крепёж"],
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
  // Jaluzi
  {
    id: "jaluzi-standart",
    category: "jaluzi",
    title: "Жалюзи Standart",
    short: "Закрытый дизайнерский забор с продуваемостью.",
    pricePerM: 4490,
    height: "2.0 м",
    features: ["Ламель 100 мм", "Двусторонний цвет", "Алюминиевые направляющие", "Не выгорает"],
    images: [jaluzi1, jaluzi2],
    badge: "Премиум",
  },
  {
    id: "jaluzi-wood",
    category: "jaluzi",
    title: "Жалюзи Wood-print",
    short: "Текстура дерева на металле. Без обслуживания.",
    pricePerM: 5290,
    height: "2.0 м",
    features: ["Печать под дерево", "ПЭ-полимер 35 мкм", "Гарантия цвета 10 лет", "Скрытый крепёж"],
    images: [jaluzi2, jaluzi1],
  },
  // Design
  {
    id: "design-brick",
    category: "design",
    title: "Кирпичные столбы + профлист",
    short: "Премиальный вид. Бетонное основание.",
    pricePerM: 7990,
    height: "2.0 м",
    features: ["Столб 380×380 мм", "Бетонная балка-цоколь", "Облицовочный кирпич", "Колпаки"],
    images: [design1, design2],
  },
  {
    id: "design-gabion",
    category: "design",
    title: "Габионы + ламели",
    short: "Современный ландшафтный дизайн.",
    pricePerM: 8990,
    height: "1.8 м",
    features: ["Габион 0,5 м", "Деревянные/металл. ламели", "Подсветка опционально", "Долговечно"],
    images: [design2, design1],
    badge: "Эксклюзив",
  },
  // Gates
  {
    id: "gates-otkat",
    category: "gates",
    title: "Откатные ворота 4 м",
    short: "С автоматикой. Расчёт противовеса по ГОСТ.",
    pricePerM: 89000,
    height: "2.0 м",
    features: ["Каркас 60×40", "Зашивка любая", "Автоматика CAME/AN-Motors", "Пульт + фотоэлементы"],
    images: [gates1, gates2],
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
    images: [gates2, gates1],
  },
];

export function productsByCategory(slug: CategorySlug) {
  return PRODUCTS.filter((p) => p.category === slug);
}
