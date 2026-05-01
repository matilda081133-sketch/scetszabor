import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import img1 from "@/assets/catalog/design-1.jpg";
import img2 from "@/assets/catalog/beton-lenta-1.jpg";
import img3 from "@/assets/catalog/kirpich-stolb-1.jpg";

export const Route = createFileRoute("/dizainerskie")({
  head: () => ({
    meta: [
      { title: "Дизайнерские заборы премиум — СПЕЦЗАБОР.РФ" },
      { name: "description", content: "Габионы, бетонные ленты, кирпичные столбы, блоки, сварные секции, забор-расчёска. Эксклюзивные решения для премиум-сегмента." },
      { property: "og:title", content: "Дизайнерские заборы — СПЕЦЗАБОР.РФ" },
      { property: "og:image", content: img1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="dizainerskie"
      hero={img1}
      variants={[
        { title: "Габионы", img: img1, desc: "Стена из камня в металлической сетке." },
        { title: "Бетонная лента", img: img2, desc: "Декоративный цоколь под любой забор." },
        { title: "Кирпичные столбы", img: img3, desc: "Премиум-классика на ленточном фундаменте." },
      ]}
      techPoints={[
        { title: "Индивидуальный проект", desc: "Эскиз и смета — после замера." },
        { title: "Ленточный фундамент", desc: "Армированный, под марку грунта." },
        { title: "Лазерная резка", desc: "Декоративные элементы любой формы." },
        { title: "Антикор + полимер", desc: "Срок службы 25+ лет." },
      ]}
    />
  ),
});
