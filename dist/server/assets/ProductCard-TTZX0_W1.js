import { j as jsxRuntimeExports } from "./sanity-core-D7KvhOfd.js";
import { L as Link, u as urlFor } from "./router-BV1aMPGC.js";
import { a as reactExports, p as ChevronLeft, q as ChevronRight } from "./lucide-02V0d3fb.js";
import { t as tgLink } from "./SiteLayout-Cdr7Xz5s.js";
function ProductCard({ product }) {
  const [idx, setIdx] = reactExports.useState(0);
  const productImages = product.gallery || (product.images ? product.images : product.mainImage ? [product.mainImage] : []);
  const total = productImages.length;
  const next = (e) => {
    e.preventDefault();
    setIdx((i) => (i + 1) % total);
  };
  const prev = (e) => {
    e.preventDefault();
    setIdx((i) => (i - 1 + total) % total);
  };
  const onEnter = () => total > 1 && setIdx(1);
  const onLeave = () => setIdx(0);
  const unit = product.priceUnit ?? "м.п.";
  const getImageUrl = (img) => {
    if (typeof img === "string") return img;
    if (img?._type === "image" || img?.asset) return urlFor(img).width(800).url();
    return "";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group flex flex-col bg-card text-card-foreground rounded-xl overflow-hidden border border-border shadow-card hover:shadow-glow-orange hover:-translate-y-0.5 transition-all duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative aspect-[4/3] overflow-hidden bg-muted",
        onMouseEnter: onEnter,
        onMouseLeave: onLeave,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: product.id.startsWith("/") ? product.id : `/products/${product.id}`,
              className: "absolute inset-0 z-0",
              children: productImages.map((img, i) => {
                const src = getImageUrl(img);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src,
                    alt: product.title,
                    loading: "lazy",
                    width: 800,
                    height: 600,
                    className: `absolute inset-0 size-full object-cover transition-all duration-500 ${i === idx ? "opacity-100 scale-105" : "opacity-0 scale-100"}`
                  },
                  src || i
                );
              })
            }
          ),
          total > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10", children: productImages.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: (e) => {
                e.preventDefault();
                setIdx(i);
              },
              className: `size-1.5 rounded-full transition-all ${i === idx ? "bg-orange w-4" : "bg-white/50 hover:bg-white"}`,
              "aria-label": `Фото ${i + 1}`
            },
            i
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange text-graphite-deep text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-lg", children: "Подробнее" }) }),
          product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm z-10 ${product.badge === "Премиум" || product.badge === "Эксклюзив" ? "badge-solid-orange" : "badge-solid"}`,
              children: product.badge
            }
          ),
          total > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: prev,
                "aria-label": "Предыдущее фото",
                className: "absolute left-2 top-1/2 -translate-y-1/2 size-8 grid place-items-center rounded-full bg-graphite-deep/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-graphite-deep z-20",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: next,
                "aria-label": "Следующее фото",
                className: "absolute right-2 top-1/2 -translate-y-1/2 size-8 grid place-items-center rounded-full bg-graphite-deep/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-graphite-deep z-20",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4" })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$productId", params: { productId: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl group-hover:text-orange transition-colors", children: product.title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: product.short }),
      product.tags && product.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: product.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "inline-flex items-center text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-secondary text-forest-dark border border-border",
          children: t
        },
        t
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-foreground/80", children: product.features.slice(0, 4).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 size-1.5 rounded-full bg-forest shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
      ] }, f)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 pt-4 border-t border-border flex items-end justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "от" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl", children: [
          product.pricePerM.toLocaleString("ru-RU"),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-sans ml-1", children: [
            "₽/",
            unit
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
          "высота ",
          product.height
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: tgLink(`расчёт стоимости — ${product.title}`),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "rounded-md btn-yellow btn-shiny text-center text-sm py-2.5",
            children: "Рассчитать"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products/$productId",
            params: { productId: product.id },
            className: "rounded-md bg-graphite-deep text-white text-center text-sm font-semibold py-2.5 hover:bg-orange hover:text-graphite-deep transition-colors",
            children: "Подробнее"
          }
        )
      ] })
    ] })
  ] });
}
export {
  ProductCard as P
};
