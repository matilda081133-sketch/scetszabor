import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import hero from "@/assets/catalog/avtorskie-2.jpg";
import img1 from "@/assets/catalog/avtorskie-1.jpg";
import img2 from "@/assets/catalog/avtorskie-3.jpg";
import img3 from "@/assets/catalog/beton-lenta-1.jpg";

export const Route = createFileRoute("/dizainerskie")({
  head: () => ({
    meta: [
      { title: "Авторские заборы премиум — СПЕЦЗАБОР.РФ" },
      { name: "description", content: "Кирпичные столбы, габионы, бетонные ленты, блоки, сварные секции, забор-расчёска. Эксклюзивные решения для премиум-сегмента." },
      { property: "og:title", content: "Авторские заборы — СПЕЦЗАБОР.РФ" },
      { property: "og:image", content: hero },
    ],
  }),
  component: () => (
    <CategoryPage
      slug="dizainerskie"
      hero={hero}
      variants={[
        { title: "Кирпичные столбы", img: img1, desc: "Монументальная надежность. Капитальное решение, которое простоит десятилетия.", href: "/products/dizainerskie" },
        { title: "Авторский жалюзи", img: img2, desc: "Эксклюзивное ограждение, подчеркивающее статус вашего участка и архитектуру.", href: "/products/dizainerskie" },
        { title: "Бетонная лента", img: img3, desc: "Защита от вымывания грунта. Делает внешний вид любого забора значительно дороже.", href: "/products/dizainerskie" },
      ]}
      techPoints={[
        { title: "Точный инженерный расчёт", desc: "Проектируем нагрузки так, чтобы забор не дал трещину на пучинистом грунте." },
        { title: "Ленточный фундамент", desc: "Армированный, под марку грунта." },
        { title: "Лазерная резка", desc: "Декоративные элементы любой формы." },
        { title: "Антикор + полимер", desc: "Срок службы 25+ лет." },
      ]}
    />
  ),
});
