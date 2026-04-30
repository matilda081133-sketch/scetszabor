import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import e1 from "@/assets/evro-1.jpg";
import e2 from "@/assets/evro-2.jpg";
import e3 from "@/assets/evro-3.jpg";

export const Route = createFileRoute("/evroshtaketnik")({
  head: () => ({
    meta: [
      { title: "Заборы из евроштакетника — СПЕЦЗАБОР" },
      { name: "description", content: "Евроштакетник в один ряд, шахматка, горизонталь. Двусторонний полимер, любой RAL. Монтаж в СПб и ЛО." },
      { property: "og:title", content: "Заборы из евроштакетника" },
      { property: "og:image", content: e1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="evroshtaketnik"
      hero={e1}
      calcDefault="evro"
      variants={[
        { title: "В один ряд 1,5 м", img: e1, desc: "Просвет 30–50 мм. Классика и аккуратность." },
        { title: "В один ряд 1,8 м", img: e2, desc: "Оптимальная высота для частного дома." },
        { title: "Горизонтальный", img: e3, desc: "Современный минимализм, акцент на ширине." },
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
