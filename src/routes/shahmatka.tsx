import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import sh1 from "@/assets/catalog/shahmatka-1.jpg";
import sh2 from "@/assets/catalog/shahmatka-2.jpg";

export const Route = createFileRoute("/shahmatka")({
  head: () => ({
    meta: [
      { title: "Забор «Шахматка» в два ряда — СПЕЦЗАБОР" },
      { name: "description", content: "Двойная зашивка евроштакетника в шахматном порядке. Полная приватность, продуваемость. СПб и ЛО." },
      { property: "og:title", content: "Заборы «Шахматка»" },
      { property: "og:image", content: sh1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="shahmatka"
      hero={sh1}
      variants={[
        { title: "Шахматка 1,5 м", img: sh1, desc: "Универсальная высота для дачи и СНТ." },
        { title: "Шахматка 1,8 м", img: sh2, desc: "Оптимальная высота для частного дома." },
        { title: "Двусторонняя", img: sh1, desc: "Ровный вид с обеих сторон участка." },
      ]}
      techPoints={[
        { title: "Двойная зашивка", desc: "Два ряда штакетника со смещением — не просматривается насквозь." },
        { title: "Зазор 7 см", desc: "Воздух проходит, взгляд — нет. Не парусит на ветру." },
        { title: "Эмаль 3в1", desc: "Каркас окрашен по металлу. Не ржавеет под закладной." },
        { title: "Бетонирование", desc: "Столбы на глубину промерзания. Не «гуляют» весной." },
      ]}
      calcDefault="shahmatka"
    />
  ),
});
