import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import d1 from "@/assets/design-1.jpg";
import d2 from "@/assets/design-2.jpg";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Дизайнерские заборы под ключ — СПЕЦЗАБОР" },
      { name: "description", content: "Кирпичные столбы, бетонные основания, габионы, комбинации материалов. Эксклюзивные заборы для частных домов." },
      { property: "og:title", content: "Дизайнерские заборы" },
      { property: "og:image", content: d1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="design"
      hero={d1}
      calcDefault="design"
      variants={[
        { title: "Кирпичные столбы", img: d1, desc: "Облицовочный кирпич, бетонная балка-цоколь." },
        { title: "Габионы + ламели", img: d2, desc: "Натуральный камень и металл/дерево." },
        { title: "Бетонные блоки", img: d1, desc: "Строгий минимализм с долговечностью." },
      ]}
      techPoints={[
        { title: "Бетонное основание", desc: "Армирование, заглубление до 1.5 м, морозостойкая марка." },
        { title: "Кладка столба", desc: "Облицовочный кирпич с закладной для каркаса забора." },
        { title: "Колпаки и отливы", desc: "Защита от воды — кладка не разрушается зимой." },
        { title: "Подсветка", desc: "Опциональная архитектурная подсветка по верху." },
      ]}
    />
  ),
});
