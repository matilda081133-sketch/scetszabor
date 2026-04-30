import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import r1 from "@/assets/catalog/raschoska-1.jpg";
import r2 from "@/assets/catalog/raschoska-2.jpg";

export const Route = createFileRoute("/raschoska")({
  head: () => ({
    meta: [
      { title: "Сварной забор «Расчёска» — СПЕЦЗАБОР" },
      { name: "description", content: "Сварной забор-расчёска из вертикальных прутков. Кованый стиль, антивандальное исполнение. СПб и ЛО." },
      { property: "og:title", content: "Сварной забор «Расчёска»" },
      { property: "og:image", content: r1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="raschoska"
      hero={r1}
      variants={[
        { title: "Стандарт 1,8 м", img: r1, desc: "Пруток 12 мм, каркас 40×20, порошковая покраска." },
        { title: "Премиум 2,0 м", img: r2, desc: "Усиленный пруток 14 мм, декор-вставки." },
        { title: "С пиками", img: r1, desc: "Антивандальные пики сверху по запросу." },
      ]}
      techPoints={[
        { title: "Полный сварной шов", desc: "Не «прихватка» — каждый пруток проварен по периметру." },
        { title: "Антикор + полимер", desc: "Грунт по металлу, затем порошковая покраска в камере." },
        { title: "Каркас из проф. трубы", desc: "40×20 или 40×40 — жёсткая геометрия секций." },
        { title: "Декор по запросу", desc: "Пики, кольца, завитки — кованые элементы под проект." },
      ]}
    />
  ),
});
