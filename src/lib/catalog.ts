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
import raschoska1 from "@/assets/catalog/raschoska-1.jpg";
import raschoska2 from "@/assets/catalog/raschoska-2.jpg";

export type Product = {
  id: string;
  category: CategorySlug;
  title: string;
  short: string;
  pricePerM: number; // руб/м.п. под ключ
  height: string;
  features: string[];
  tags?: string[]; // короткие выгодные ярлыки
  images: string[];
  badge?: string;
};

export type CategorySlug =
  | "gitter"
  | "jaluzi"
  | "proflist"
  | "evroshtaketnik"
  | "shahmatka"
  | "design"
  | "raschoska"
  | "derevo";

export const CATEGORIES: Record<
  CategorySlug,
  { slug: CategorySlug; title: string; href: string; lead: string }
> = {
  gitter: {
    slug: "gitter",
    title: "Сетка 3D Gutter",
    href: "/gitter",
    lead: "Прочно, прозрачно, без обслуживания. Дача и промобъекты.",
  },
  jaluzi: {
    slug: "jaluzi",
    title: "Жалюзи",
    href: "/jaluzi",
    lead: "Премиальный дизайн. Приватность с продуваемостью.",
  },
  proflist: {
    slug: "proflist",
    title: "Профлист",
    href: "/proflist",
    lead: "Глухой забор. Защита от ветра, шума и взглядов.",
  },
  evroshtaketnik: {
    slug: "evroshtaketnik",
    title: "Евроштакетник",
    href: "/evroshtaketnik",
    lead: "Аккуратный современный вид в один ряд.",
  },
  shahmatka: {
    slug: "shahmatka",
    title: "Два ряда «Шахматка»",
    href: "/shahmatka",
    lead: "Двойная зашивка штакетника. Полная приватность.",
  },
  design: {
    slug: "design",
    title: "Авторские",
    href: "/design",
    lead: "Габионы, комбинации материалов, нестандартные решения.",
  },
  raschoska: {
    slug: "raschoska",
    title: "Сварной забор «Расчёска»",
    href: "/raschoska",
    lead: "Кованый стиль. Вертикальные прутки на сварном каркасе.",
  },
  derevo: {
    slug: "derevo",
    title: "Деревянный штакетник",
    href: "/derevo",
    lead: "Натуральное дерево с антисептической обработкой.",
  },
};

export const PRODUCTS: Product[] = [
  // Сетка 3D Gutter — цены lenzk.ru
  {
    id: "gitter-1.5",
    category: "gitter",
    title: "Сетка 3D Gutter 1,5 м",
    short: "Дачные участки, СНТ, разделение территорий.",
    pricePerM: 1490,
    height: "1.5 м",
    features: ["Пруток 4 мм", "Полимер RAL 6005/7024", "Столб 60×40", "Хомутовый крепёж"],
    tags: ["Бюджетно","Без обслуживания","Прозрачно"],
    images: [gitter1, gitter2],
  },
  {
    id: "gitter-2.0",
    category: "gitter",
    title: "Сетка 3D Gutter 2,0 м",
    short: "Промобъекты, парковки, склады.",
    pricePerM: 1890,
    height: "2.0 м",
    features: ["Пруток 5 мм", "Усиленный столб 80×40", "Антивандальный крепёж", "Цинк + полимер"],
    tags: ["Промобъекты","Антивандально","Усиленный"],
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
    tags: ["Самый частый запрос","Современный дизайн","Приватность"],
    images: [jaluzi1, jaluzi2],
    badge: "Хит",
  },
  {
    id: "jaluzi-premium",
    category: "jaluzi",
    title: "Жалюзи «Премиум»",
    short: "Полная приватность с эффектом продуваемости.",
    pricePerM: 5290,
    height: "2.0 м",
    features: ["Усиленная ламель", "ПЭ-полимер 35 мкм", "Гарантия цвета 10 лет", "Скрытый крепёж"],
    tags: ["Премиум","Полная приватность","Скрытый крепёж"],
    images: [jaluzi2, jaluzi1],
  },

  // Профлист — Эконом / Стандарт (Стандарт = премиум-вариант, без отдельного «Премиум»)
  {
    id: "proflist-econom",
    category: "proflist",
    title: "Профлист «Эконом»",
    short: "Каркас грунтован ГФ-021. Базовый бюджетный вариант.",
    pricePerM: 2470,
    height: "1.8 м",
    features: ["Столб 60×60 мм", "Лаги 40×20 мм", "Профлист С8 0,4 мм", "Покрытие ГФ-021"],
    tags: ["Бюджетно","Защита от ветра","Полная глухота"],
    images: [proflist1, proflist2],
  },
  {
    id: "proflist-standart",
    category: "proflist",
    title: "Профлист «Стандарт»",
    short: "Премиум-исполнение: окрашенный каркас эмалью 3в1.",
    pricePerM: 2680,
    height: "1.8 м",
    features: ["Столб 60×60 мм", "Лаги 40×20 мм", "Профлист С8 0,4 мм", "Эмаль 3в1"],
    tags: ["Надёжность креплений","Долговечно","Окрашенный каркас"],
    images: [proflist2, proflist1],
    badge: "Премиум",
  },

  // Евроштакетник (один ряд)
  {
    id: "evro-econom",
    category: "evroshtaketnik",
    title: "Евроштакетник «Эконом»",
    short: "В один ряд, зазор 4 см. Каркас грунтован ГФ-021.",
    pricePerM: 2770,
    height: "1.5 м",
    features: ["Столб 60×60 мм", "Лаги 40×20 мм", "Штакетник 0,4 мм", "Двустороннее покрытие"],
    tags: ["Бюджетно","Современный вид","Двусторонний"],
    images: [evro1, evro2],
  },
  {
    id: "evro-standart",
    category: "evroshtaketnik",
    title: "Евроштакетник «Стандарт» 1,5 м",
    short: "В один ряд, зазор 4 см. Окрашенный каркас.",
    pricePerM: 2880,
    height: "1.5 м",
    features: ["Столб 60×60 мм", "Лаги 40×20 мм", "Штакетник 0,4 мм", "Эмаль 3в1"],
    tags: ["Хит продаж","Надёжность креплений","Современный дизайн"],
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
    tags: ["Оптимальная высота","Современный дизайн","Двусторонний"],
    images: [evro1, evro2],
  },

  // Два ряда «Шахматка»
  {
    id: "shahmatka-15",
    category: "shahmatka",
    title: "Шахматка «Стандарт» 1,5 м",
    short: "Два ряда штакетника в шахматном порядке. Не просматривается.",
    pricePerM: 3730,
    height: "1.5 м",
    features: ["Двойная зашивка", "Зазор 7 см", "Полная приватность", "Окрашенный каркас"],
    tags: ["Полная приватность","Хит запросов","Двойная зашивка"],
    images: [shahmatka1, shahmatka2],
    badge: "Хит",
  },
  {
    id: "shahmatka-18",
    category: "shahmatka",
    title: "Шахматка «Стандарт» 1,8 м",
    short: "Шахматка, оптимальная высота для частного дома.",
    pricePerM: 3930,
    height: "1.8 м",
    features: ["Шахматное заполнение", "Эмаль 3в1", "Зазор 7 см", "Двусторонний"],
    tags: ["Приватность","Оптимальная высота","Двусторонний"],
    images: [shahmatka2, shahmatka1],
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
    tags: ["Эксклюзив","Ландшафт","Долговечно"],
    images: [design1, design2],
    badge: "Эксклюзив",
  },
  {
    id: "design-combo",
    category: "design",
    title: "Авторская комбинация",
    short: "Дерево + металл, габионы + дерево, нестандартные проекты.",
    pricePerM: 7490,
    height: "2.0 м",
    features: ["Под ваш проект", "Кованая фурнитура", "Антисептик", "Индивидуальный замер"],
    tags: ["Под проект","Кованая фурнитура","Индивидуально"],
    images: [design2, design1],
  },

  // Сварной забор «Расчёска»
  {
    id: "raschoska-standart",
    category: "raschoska",
    title: "Сварной «Расчёска» 1,8 м",
    short: "Кованый стиль из вертикальных прутков на сварном каркасе.",
    pricePerM: 4290,
    height: "1.8 м",
    features: ["Пруток 12×12 мм", "Каркас 40×20 мм", "Порошковая покраска", "Пики сверху"],
    tags: ["Кованый стиль","Надёжность","Декор"],
    images: [raschoska1, raschoska2],
    badge: "Хит",
  },
  {
    id: "raschoska-premium",
    category: "raschoska",
    title: "Сварной «Расчёска» Премиум 2,0 м",
    short: "Усиленный каркас, декоративные элементы под ковку.",
    pricePerM: 5490,
    height: "2.0 м",
    features: ["Пруток 14×14 мм", "Каркас 40×40 мм", "Антикор + полимер", "Декор-вставки"],
    tags: ["Премиум","Антикор","Декор-вставки"],
    images: [raschoska2, raschoska1],
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
    tags: ["Натурально","Бюджетно","Антисептик"],
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
    tags: ["Премиум","Лиственница","Гарантия 5 лет"],
    images: [derevo2, derevo1],
    badge: "Премиум",
  },
];

export function productsByCategory(slug: CategorySlug) {
  return PRODUCTS.filter((p) => p.category === slug);
}
