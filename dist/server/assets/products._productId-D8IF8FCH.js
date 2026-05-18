import { j as jsxRuntimeExports } from "./sanity-core-3hUdnev6.js";
import { R as Route, o as productById, C as CATEGORIES, l as productsByCategory, L as Link, u as urlFor } from "./router-6tRNnX8B.js";
import { n as notFound } from "./worker-entry-BdWGRx4M.js";
import { a as reactExports, q as ChevronLeft, s as ChevronRight, p as Check, R as Ruler, H as Hammer, C as Camera, S as ShieldCheck } from "./lucide-DH97pPXW.js";
import { u as useCMS } from "./cms-DQSl0w_-.js";
import { S as SiteLayout, t as tgLink } from "./SiteLayout-5rQyx1ku.js";
import { L as LeadBlock } from "./LeadBlock-CFNstSsH.js";
import { P as ProductCard } from "./ProductCard-B-2v5fgT.js";
import "util";
import "os";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function ProductPage() {
  const {
    productId
  } = Route.useParams();
  const {
    content,
    loading
  } = useCMS();
  const cmsProduct = content.products?.find((p) => p.slug?.current === productId || p._id === productId);
  const product = cmsProduct ? {
    ...cmsProduct,
    id: cmsProduct.slug?.current || cmsProduct._id,
    pricePerM: cmsProduct.price,
    short: cmsProduct.description,
    images: cmsProduct.gallery || [cmsProduct.mainImage],
    description: cmsProduct.fullContent,
    features: cmsProduct.features || []
  } : productById(productId);
  if (!product && !loading) throw notFound();
  if (!product) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen bg-background" });
  const [idx, setIdx] = reactExports.useState(0);
  const total = product.images.length;
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const cat = CATEGORIES[product.category] || CATEGORIES["proflist"];
  const others = productsByCategory(product.category).filter((p) => p.id !== product.id);
  const unit = product.priceUnit ?? "м.п.";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x pt-6 text-xs text-muted-foreground flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-orange", children: "Главная" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalog", className: "hover:text-orange", children: "Каталог" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: cat.href, className: "hover:text-orange", children: cat.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: product.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-x py-8 md:py-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-card group", children: [
          product.images.map((img, i) => {
            const src = typeof img === "string" ? img : urlFor(img).width(1200).url();
            return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: product.title, width: 1280, height: 960, className: `absolute inset-0 size-full object-cover transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}` }, src || i);
          }),
          product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm ${product.badge === "Премиум" || product.badge === "Эксклюзив" ? "badge-solid-orange" : "badge-solid"}`, children: product.badge }),
          total > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: prev, "aria-label": "Предыдущее", className: "absolute left-3 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full bg-graphite-deep/80 text-white hover:bg-graphite-deep", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: next, "aria-label": "Следующее", className: "absolute right-3 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full bg-graphite-deep/80 text-white hover:bg-graphite-deep", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-5" }) })
          ] })
        ] }),
        total > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-4 gap-2", children: product.images.map((img, i) => {
          const src = typeof img === "string" ? img : urlFor(img).width(300).url();
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIdx(i), className: `aspect-[4/3] rounded-md overflow-hidden border-2 transition-colors ${i === idx ? "border-orange" : "border-transparent"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "size-full object-cover" }) }, src || i);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.25em] text-orange", children: cat.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-5xl mt-3 leading-[1.05]", children: product.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 text-base", children: product.short }),
        product.tags && product.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-1.5", children: product.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-secondary text-forest-dark border border-border", children: t }, t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl bg-graphite-deep text-white p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-yellow", children: "Цена" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl md:text-5xl leading-none mt-1", children: [
            "от ",
            product.pricePerM.toLocaleString("ru-RU"),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg text-white/60 ml-1", children: [
              "₽/",
              unit
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/70 mt-3", children: "Под ключ: материалы, монтаж, бетонирование. Финальная цена — после замера." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: tgLink(`расчёт стоимости — ${product.title}`), target: "_blank", rel: "noopener noreferrer", className: "rounded-md btn-yellow text-center py-3", children: "Калькулятор стоимости" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: tgLink(`получить подробности — ${product.title}`), target: "_blank", rel: "noopener noreferrer", className: "rounded-md bg-white/10 hover:bg-white/15 text-white text-center font-semibold py-3", children: "Узнать подробнее" })
          ] })
        ] }),
        product.heights && product.heights.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-orange mb-2", children: "Стандартные высоты" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: product.heights.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-3 hover:border-orange transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: h.h }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-xl", children: [
              h.price.toLocaleString("ru-RU"),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-sans ml-1", children: [
                "₽/",
                unit
              ] })
            ] })
          ] }, h.h)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-x py-10 md:py-14 border-t border-border grid gap-10 md:grid-cols-[1.4fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl", children: "Описание" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-foreground/85 leading-relaxed", children: product.description ?? product.short })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl", children: "Характеристики" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid gap-2.5", children: product.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-5 text-success shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
        ] }, f)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-graphite text-white py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.25em] text-yellow", children: "Гарантии" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl mt-2", children: "Почему с нами безопасно" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [{
        i: Ruler,
        t: "Инженер на замер",
        d: "Перепад высот, грунт, точная смета."
      }, {
        i: Hammer,
        t: "Сварка по ГОСТ",
        d: "Полные швы, антикор, порошок."
      }, {
        i: Camera,
        t: "Фотофиксация",
        d: "Скрытые узлы — всё на фото."
      }, {
        i: ShieldCheck,
        t: "Гарантия",
        d: "По договору. Реально приезжаем."
      }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-graphite-deep rounded-xl p-5 border border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(b.i, { className: "size-7 text-yellow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg mt-3", children: b.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/65 mt-1", children: b.d })
      ] }, b.t)) })
    ] }) }),
    others.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-x py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl md:text-3xl", children: [
        "Другие в категории «",
        cat.title,
        "»"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: others.slice(0, 3).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-x py-14 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeadBlock, { title: `Вызвать инженера — ${product.title}`, subtitle: "Бесплатный замер. 3D-эскиз и смета в подарок." }) })
  ] });
}
export {
  ProductPage as component
};
