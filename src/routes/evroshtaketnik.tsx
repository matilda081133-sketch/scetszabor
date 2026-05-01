import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import e1 from "@/assets/catalog/evro-1.jpg";
import e2 from "@/assets/catalog/shahmatka-1.jpg";
import e3 from "@/assets/catalog/evro-gorizont-1.jpg";

export const Route = createFileRoute("/evroshtaketnik")({
  head: () => ({
    meta: [
      { title: "Заборы из евроштакетника — СПЕЦЗАБОР.РФ" },
      { name: "description", content: "Евроштакетник в один ряд, шахматка, горизонталь. Двусторонний полимер, любой RAL. Монтаж в СПб и ЛО." },
      { property: "og:title", content: "Заборы из евроштакетника" },
      { property: "og:image", content: e1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="evroshtaketnik"
      hero={e1}
      calcDefault="evro-1ryad"
      variants={[
        { title: "В один ряд", img: e1, desc: "Зазор 4 см. Аккуратность и современный вид." },
        { title: "Шахматка (2 ряда)", img: e2, desc: "Полная приватность, двойная зашивка." },
        { title: "Горизонтальный", img: e3, desc: "Тренд 2026 — горизонтальная установка штакетника." },
      ]}
      techPoints={[
        { title: "Замер инженером", desc: "Учёт перепада высот: каждая секция выровнена." },
        { title: "Бутование или бетон", desc: "Подбираем по типу грунта — не по принципу «как обычно»." },
        { title: "Двусторонний полимер", desc: "Цвет с обеих сторон, не выгорает 10 лет." },
        { title: "Скрытый крепёж", desc: "Опционально — заклёпки или планки М-образные." },
      ]}
    />
  ),
});
