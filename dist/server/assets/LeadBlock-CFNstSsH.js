import { j as jsxRuntimeExports } from "./sanity-core-3hUdnev6.js";
import { C as CONTACTS } from "./SiteLayout-5rQyx1ku.js";
import { M as MessageCircle } from "./lucide-DH97pPXW.js";
function LeadBlock({
  title = "Вызвать инженера на замер",
  subtitle = "Бесплатно. Приедем с инструментом, изучим грунт и перепады. Точный расчёт — на месте.",
  giftLabel = "Подарок: расчёт + 3D-эскиз забора"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "section-dark relative overflow-hidden rounded-3xl border border-white/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-0 w-1/2 hazard-stripe opacity-10 hidden md:block" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-20 -top-20 size-72 rounded-full bg-orange/15 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-16 -bottom-16 size-64 rounded-full bg-yellow/10 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-8 md:p-14 grid gap-6 md:grid-cols-[1fr_auto] items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        giftLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs uppercase tracking-widest text-yellow mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-yellow animate-pulse" }),
          giftLabel
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-5xl leading-[1.05]", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 mt-3", children: subtitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 w-full md:w-auto md:min-w-[300px] relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: CONTACTS.telegramUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "rounded-md btn-yellow px-6 py-4 text-center animate-pulse-ring",
            children: "Telegram — ответим за 5 мин"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: CONTACTS.maxUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "rounded-md bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 flex items-center justify-center gap-2 backdrop-blur",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-5" }),
              "MAX"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: CONTACTS.phoneHref, className: "text-center text-sm text-white/60 hover:text-yellow", children: [
          "или ",
          CONTACTS.phone
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 text-center leading-tight mt-1", children: "Нажимая на кнопки связи, вы соглашаетесь с обработкой персональных данных (ФЗ-152)." })
      ] })
    ] })
  ] });
}
export {
  LeadBlock as L
};
