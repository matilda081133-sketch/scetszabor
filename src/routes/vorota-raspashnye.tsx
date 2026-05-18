import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import img1 from "@/assets/catalog/vorota-raspashnye-1.jpg";
import img2 from "@/assets/catalog/raschoska-2.jpg";

export const Route = createFileRoute("/vorota-raspashnye")({
  head: () => ({
    meta: [
      { title: "Распашные ворота под ключ — СПЕЦЗАБОР.РФ" },
      { name: "description", content: "Распашные ворота из профлиста, штакетника, жалюзи. Усиленные петли, автоматика. От 55 000 ₽." },
      { property: "og:title", content: "Распашные ворота — СПЕЦЗАБОР.РФ" },
      { property: "og:image", content: img1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="vorota-raspashnye"
      hero={img1}
      calcDefault="vorota-raspashnye"
      variants={[
        { title: "С зашивкой штакетником", img: img1, desc: "Самый популярный вариант. Аккуратный двусторонний вид.", href: "/products/vorota-raspashnye" },
        { title: "С зашивкой профлистом", img: img2, desc: "Глухие ворота — закрытый двор.", href: "/products/vorota-raspashnye" },
        { title: "С автоматикой", img: img1, desc: "Линейные приводы CAME/Nice. Открытие с пульта.", href: "/products/vorota-raspashnye" },
      ]}
      techPoints={[
        { title: "Каркас 60×40", desc: "С диагональными усилителями — не провиснут." },
        { title: "Петли усиленные", desc: "По 3 шт. на створку, регулируемые." },
        { title: "Засов и стопор", desc: "Защита от ветра и от случайного открывания." },
        { title: "Покраска", desc: "Эмаль 3 в 1 или порошковая. Любой RAL." },
      ]}
    />
  ),
});
