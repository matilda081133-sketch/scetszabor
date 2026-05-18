import { j as jsxRuntimeExports } from "./sanity-core-3hUdnev6.js";
import { a as reactExports } from "./lucide-DH97pPXW.js";
import { S as SiteLayout } from "./SiteLayout-5rQyx1ku.js";
import { P as ProductCard } from "./ProductCard-B-2v5fgT.js";
import { L as LeadBlock } from "./LeadBlock-CFNstSsH.js";
import { P as PRODUCTS, m as CATEGORIES_ORDERED } from "./router-6tRNnX8B.js";
import { u as useCMS } from "./cms-DQSl0w_-.js";
import "util";
import "os";
import "./worker-entry-BdWGRx4M.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function CatalogPage() {
  const {
    content
  } = useCMS();
  const [active, setActive] = reactExports.useState("all");
  const displayProducts = content.products && content.products.length > 0 ? content.products.map((p) => ({
    id: p.slug?.current || p._id,
    category: p.category || "proflist",
    title: p.title,
    short: p.description,
    pricePerM: p.price,
    image: p.mainImage,
    // We will handle Sanity images in the ProductCard
    ...p
  })) : PRODUCTS;
  const list = active === "all" ? displayProducts : displayProducts.filter((p) => p.category === active);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x py-14 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.25em] text-orange flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hazard-stripe h-1 w-10 rounded-sm" }),
        "Каталог"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-6xl mt-3", children: "Заборы и ворота под ключ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 mt-4 max-w-2xl", children: "Цены — под ключ: материалы, монтаж, бетонирование. Финальная смета формируется после инженерного замера на участке." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x py-8 sticky top-[68px] md:top-[76px] z-30 bg-background/95 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 overflow-x-auto pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { active: active === "all", onClick: () => setActive("all"), children: [
        "Все (",
        PRODUCTS.length,
        ")"
      ] }),
      CATEGORIES_ORDERED.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { active: active === c.slug, onClick: () => setActive(c.slug), children: c.title.replace(/^Заборы\s/i, "").replace(/^Забор\s/i, "").replace(/^из\s/i, "") }, c.slug))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-x pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: list.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeadBlock, { title: "Не нашли подходящего варианта?", subtitle: "Сделаем нестандартное решение под ваш участок и бюджет." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10" })
  ] });
}
function Chip({
  active,
  onClick,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick, className: `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${active ? "bg-graphite-deep text-white border-graphite-deep" : "bg-card border-border hover:border-orange"}`, children });
}
export {
  CatalogPage as component
};
