import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import j1 from "@/assets/jaluzi-1.jpg";
import j2 from "@/assets/jaluzi-2.jpg";

export const Route = createFileRoute("/jaluzi")({
  head: () => ({
    meta: [
      { title: "Заборы-жалюзи (ламели) — СПЕЦЗАБОР" },
      { name: "description", content: "Премиальные заборы из ламелей-жалюзи. Приватность с продуваемостью, любой RAL и текстуры дерева." },
      { property: "og:title", content: "Заборы-жалюзи" },
      { property: "og:image", content: j1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="jaluzi"
      hero={j1}
      calcDefault="jaluzi"
      variants={[
        { title: "Стандартные ламели", img: j1, desc: "Двусторонний RAL, ширина 100 мм." },
        { title: "Wood-print", img: j2, desc: "Печать «под дерево» на металле, без обслуживания." },
        { title: "С автоматикой створок", img: j1, desc: "Поворотные ламели на отдельных секциях." },
      ]}
      techPoints={[
        { title: "Алюм. направляющие", desc: "Жёсткий каркас, никаких просадок и зазоров." },
        { title: "Полимер 35 мкм", desc: "Не выгорает на солнце, гарантия цвета 10 лет." },
        { title: "Скрытый крепёж", desc: "Чистый внешний вид без саморезов наружу." },
        { title: "Точная геометрия", desc: "Замер инженером — каждая секция в одной плоскости." },
      ]}
    />
  ),
});
