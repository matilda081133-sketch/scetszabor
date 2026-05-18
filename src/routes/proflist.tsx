import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import p1 from "@/assets/catalog/proflist-1.jpg";
import p2 from "@/assets/catalog/proflist-2.jpg";

export const Route = createFileRoute("/proflist")({
  head: () => ({
    meta: [
      { title: "Заборы из профлиста под ключ — СПЕЦЗАБОР.РФ" },
      { name: "description", content: "Монтаж заборов из профлиста С8 в СПб и ЛО. Усиленный металл, бетонирование, реальная гарантия. От 2 470 ₽/м.п." },
      { property: "og:title", content: "Заборы из профлиста — СПЕЦЗАБОР.РФ" },
      { property: "og:image", content: p1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="proflist"
      hero={p1}
      calcDefault="proflist"
      variants={[
        { title: "Окрас одна сторона", img: p1, desc: "Базовый вариант. Снаружи цвет, изнанка — оцинковка.", href: "/products/proflist" },
        { title: "Окрас две стороны", img: p2, desc: "Двусторонний полимер. Любой RAL по выбору.", href: "/products/proflist" },
        { title: "С кирпичными столбами", img: p2, desc: "Премиальный вид. Бетонная балка-цоколь.", href: "/products/proflist" },
      ]}
      techPoints={[
        { title: "Бурение лунки 1.5 м", desc: "Ниже глубины промерзания грунта по СПб и ЛО." },
        { title: "Бетонирование столба", desc: "Марка М300 с уплотнением. Не выдавит зимой." },
        { title: "Сварка по ГОСТ", desc: "Лаги к столбу — полный шов, антикоррозийная обработка." },
        { title: "Зашивка профлистом", desc: "Кровельный саморез в волну, без перетяжки и волны." },
      ]}
    />
  ),
});
