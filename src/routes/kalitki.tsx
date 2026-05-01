import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import img1 from "@/assets/catalog/kalitka-1.jpg";
import img2 from "@/assets/catalog/kalitka-2.jpg";

export const Route = createFileRoute("/kalitki")({
  head: () => ({
    meta: [
      { title: "Калитки под ключ — СПЕЦЗАБОР.РФ" },
      { name: "description", content: "Калитки под цвет забора. Замки, доводчики, домофон. От 24 000 ₽." },
      { property: "og:title", content: "Калитки — СПЕЦЗАБОР.РФ" },
      { property: "og:image", content: img1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="kalitki"
      hero={img1}
      calcDefault="kalitka"
      variants={[
        { title: "Калитка штакетник", img: img2, desc: "Под общий стиль забора, двусторонний окрас." },
        { title: "Калитка профлист", img: img1, desc: "Закрытая, бюджетная, надёжная." },
        { title: "С доводчиком", img: img2, desc: "Не хлопает, не остаётся открытой." },
      ]}
      techPoints={[
        { title: "Каркас 40×40", desc: "Профильная труба с усилением." },
        { title: "Замок врезной", desc: "Импортный цилиндровый механизм." },
        { title: "Петли регулируемые", desc: "3 шт., можно подстроить со временем." },
        { title: "Опции", desc: "Доводчик, домофон, электромагнитный замок." },
      ]}
    />
  ),
});
