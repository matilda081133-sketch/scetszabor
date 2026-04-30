import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import p1 from "@/assets/proflist-1.jpg";
import p2 from "@/assets/proflist-2.jpg";
import p3 from "@/assets/proflist-3.jpg";

export const Route = createFileRoute("/proflist")({
  head: () => ({
    meta: [
      { title: "Заборы из профлиста под ключ — СПЕЦЗАБОР" },
      { name: "description", content: "Монтаж заборов из профлиста С8/С20 в СПб и ЛО. Усиленный металл, бетонирование, реальная гарантия." },
      { property: "og:title", content: "Заборы из профлиста — СПЕЦЗАБОР" },
      { property: "og:image", content: p1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="proflist"
      hero={p1}
      calcDefault="proflist"
      variants={[
        { title: "Профлист С8", img: p1, desc: "Базовая волна. Лёгкий, недорогой, надёжный." },
        { title: "Профлист С20", img: p3, desc: "Жёсткое ребро для открытых ветреных участков." },
        { title: "С кирпичными столбами", img: p2, desc: "Премиальный вид. Бетонная балка-цоколь." },
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
