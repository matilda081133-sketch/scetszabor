import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import d1 from "@/assets/catalog/derevo-1.jpg";
import d2 from "@/assets/catalog/derevo-2.jpg";

export const Route = createFileRoute("/derevo")({
  head: () => ({
    meta: [
      { title: "Деревянный штакетник под ключ — СПЕЦЗАБОР" },
      { name: "description", content: "Монтаж деревянных заборов из сосны и лиственницы в СПб и ЛО. Антисептическая обработка, металлический каркас." },
      { property: "og:title", content: "Деревянный штакетник — СПЕЦЗАБОР" },
      { property: "og:image", content: d1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="derevo"
      hero={d1}
      variants={[
        { title: "Сосна камерной сушки", img: d1, desc: "Доска 20×90 мм с антисептической пропиткой." },
        { title: "Лиственница", img: d2, desc: "Премиум вариант — десятилетия без обслуживания." },
        { title: "Под покраску", img: d1, desc: "Подготовка под выбранный вами оттенок морилки или масла." },
      ]}
      techPoints={[
        { title: "Сушка и калибровка", desc: "Только сухая доска — не поведёт после монтажа." },
        { title: "Антисептик в 2 слоя", desc: "Защита от грибка, плесени и насекомых." },
        { title: "Металлический каркас", desc: "Столбы 60×60 и лаги — основа служит десятилетиями." },
        { title: "Скрытый крепёж", desc: "Оцинкованный саморез под цвет доски." },
      ]}
    />
  ),
});
