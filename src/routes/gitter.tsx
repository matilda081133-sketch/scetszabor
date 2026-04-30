import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import g1 from "@/assets/gitter-1.jpg";
import g2 from "@/assets/gitter-2.jpg";

export const Route = createFileRoute("/gitter")({
  head: () => ({
    meta: [
      { title: "Заборы из 3D-сетки Gitter — СПЕЦЗАБОР" },
      { name: "description", content: "3D-сетка Gitter для дач, СНТ, промобъектов. Пруток 4–5 мм, цинк + полимер. Монтаж в СПб и Ленобласти." },
      { property: "og:title", content: "Заборы из 3D-сетки Gitter" },
      { property: "og:image", content: g1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="gitter"
      hero={g1}
      calcDefault="gitter"
      variants={[
        { title: "Высота 1.5 м", img: g1, desc: "Дачные участки, СНТ, разделение территорий." },
        { title: "Высота 2.0 м", img: g2, desc: "Промобъекты, склады, парковки." },
        { title: "С козырьком", img: g2, desc: "Усиление безопасности — антивандальный верх." },
      ]}
      techPoints={[
        { title: "Цинк + полимер", desc: "Двойная защита: не ржавеет десятилетиями." },
        { title: "Хомутовый крепёж", desc: "Жёсткая фиксация, антивандальные болты опционально." },
        { title: "Бутование столба", desc: "Оптимально для глинистых грунтов СПб и ЛО." },
        { title: "Сдача — за день", desc: "Стандартный участок 50 м монтируем за 1 рабочий день." },
      ]}
    />
  ),
});
