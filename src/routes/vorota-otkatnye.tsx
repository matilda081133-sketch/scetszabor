import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import img1 from "@/assets/catalog/vorota-otkatnye-1.jpg";
import img2 from "@/assets/catalog/vorota-otkatnye-2.jpg";

export const Route = createFileRoute("/vorota-otkatnye")({
  head: () => ({
    meta: [
      { title: "Откатные ворота под ключ — СПЕЦЗАБОР.РФ" },
      { name: "description", content: "Откатные автоматические ворота в СПб и ЛО. Ролики Дорхан, любая зашивка, привод CAME/Nice. От 85 000 ₽." },
      { property: "og:title", content: "Откатные ворота — СПЕЦЗАБОР.РФ" },
      { property: "og:image", content: img1 },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="vorota-otkatnye"
      hero={img1}
      calcDefault="vorota-otkatnye"
      variants={[
        { title: "Зашивка профлистом", img: img2, desc: "Бюджетная, но прочная зашивка." },
        { title: "Зашивка жалюзи", img: img1, desc: "Дизайнерский вариант под современный дом." },
        { title: "Зашивка штакетником", img: img2, desc: "Воздушная и стильная композиция." },
      ]}
      techPoints={[
        { title: "Балка с роликами", desc: "Усиленная направляющая, ролики Дорхан в комплекте." },
        { title: "Каркас 60×40", desc: "Усилители по диагонали — не провисают со временем." },
        { title: "Автоматика", desc: "CAME, Nice, FAAC. Управление с пульта и телефона." },
        { title: "Монтаж — 1 день", desc: "Бетонирование, выставление, тестовые запуски." },
      ]}
    />
  ),
});
