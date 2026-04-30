import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import gt1 from "@/assets/gates-1.jpg";
import gt2 from "@/assets/gates-2.jpg";

export const Route = createFileRoute("/gates")({
  head: () => ({
    meta: [
      { title: "Ворота и калитки — СПЕЦЗАБОР" },
      { name: "description", content: "Откатные и распашные ворота с автоматикой. Расчёт противовеса по ГОСТ. СПб и Ленобласть." },
      { property: "og:title", content: "Ворота и калитки" },
      { property: "og:image", content: gt1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="gates"
      hero={gt1}
      variants={[
        { title: "Откатные ворота", img: gt1, desc: "Автоматика CAME / AN-Motors, фотоэлементы." },
        { title: "Распашные + калитка", img: gt2, desc: "Усиленные петли, замок, засов." },
        { title: "С автоматикой", img: gt1, desc: "Пульты, GSM-модуль, домофон опционально." },
      ]}
      techPoints={[
        { title: "Расчёт противовеса", desc: "По ГОСТ — ворота не провисают через год эксплуатации." },
        { title: "Швеллер 8–12", desc: "Закладная под рельс — навсегда, не «на скорую руку»." },
        { title: "Сварка короба", desc: "Углы 60×40, лаги 40×20 — жёсткая геометрия." },
        { title: "Автоматика", desc: "Подбираем по весу створки, не «универсальный» комплект." },
      ]}
    />
  ),
});
