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
    description: "Откатные ворота — оптимальное решение...",
  },
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
    description: "Распашные ворота — самое доступное решение...",
  },
  {
    id: "kalitka",
    category: "kalitki",
    title: "Калитка",
    short: "Стальная калитка под цвет забора. С замком, доводчиком, домофоном.",
    pricePerM: 24000,
    priceUnit: "шт.",
    height: "2,0 м",
    features: ["Каркас 40×40 мм", "Замок врезной", "Ручка-кноб", "Доводчик опционально"],
    tags: ["Универсально", "Безопасно", "Под цвет забора"],
    images: [kalitka1, kalitka2],
    description: "Калитка изготавливается под общий стиль...",
  },
  {
    id: "proflist",
    category: "proflist",
    title: "Забор из профлиста",
    short: "Глухой забор: защита от ветра, шума и взглядов.",
    pricePerM: 2470,
    height: "1,8 м",
    heights: heightsFromBase(2470),
    features: ["Столб 60×60 мм", "Лаги 40×20 мм", "Профлист С8 0,4 мм", "Эмаль 3 в 1"],
    tags: ["Полная глухота", "Защита от ветра", "Хит продаж"],
    images: [proflist1, proflist2],
    badge: "Хит",
    description: "Самый востребованный тип забора...",
  },
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
    description: "Один ряд штакетника с шагом 8 см...",
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
    description: "Двойная зашивка штакетника со смещением...",
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
    description: "Штакетник установлен горизонтально...",
  },
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
    images: [jaluzi3, jaluzi5, jaluzi4],
    badge: "Премиум",
    description: "Закрытый дизайнерский забор...",
  },
];

// Helper to transform Sanity data to our Product type
function transformSanityProduct(sp: any): Product {
  return {
    id: sp.slug.current,
    category: sp.slug.current.includes("vorota") ? (sp.slug.current as CategorySlug) : "proflist", // Basic mapping, adjust as needed
    title: sp.title,
    short: sp.description || "",
    pricePerM: sp.price || 0,
    height: "1,8 м", // Default or extract from description
    features: [],
    images: sp.gallery?.map((img: any) => img.asset?.url) || [],
    description: sp.fullContent,
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

export const PRODUCTS: Product[] = DYNAMIC_PRODUCTS.length > 0 ? DYNAMIC_PRODUCTS : STATIC_PRODUCTS;

export function productsByCategory(slug: CategorySlug) {
  return PRODUCTS.filter((p) => p.category === slug || (slug === "evroshtaketnik" && p.id.includes("evro")));
}

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export const CATEGORIES_ORDERED = Object.values(CATEGORIES).sort((a, b) => a.order - b.order);
