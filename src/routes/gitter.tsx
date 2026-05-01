import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import g1 from "@/assets/catalog/gitter-1.jpg";
import g2 from "@/assets/catalog/gitter-2.jpg";

export const Route = createFileRoute("/gitter")({
  head: () => ({
    meta: [
      { title: "Заборы из 3D-сетки Gitter — СПЕЦЗАБОР.РФ" },
      { name: "description", content: "3D-сетка Gitter для дач, СНТ, промобъектов. Пруток 3 и 3,8 мм, цинк + полимер. От 1 490 ₽/м.п." },
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
        { title: "Пруток 3 мм", img: g1, desc: "Бюджетный вариант для дач и СНТ." },
        { title: "Пруток 3,8 мм", img: g2, desc: "Усиленный вариант для промобъектов." },
        { title: "С козырьком", img: g2, desc: "Антивандальный верх — для периметров." },
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
