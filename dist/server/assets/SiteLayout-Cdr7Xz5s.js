import { j as jsxRuntimeExports } from "./sanity-core-D7KvhOfd.js";
import { L as Link } from "./router-BV1aMPGC.js";
import { a as reactExports, P as Phone, e as Send, X, s as Menu, U as User } from "./lucide-02V0d3fb.js";
import { u as useCMS } from "./cms-BHq_xw1j.js";
const CONTACTS = {
  phone: "+7 (921) 641-33-88",
  phoneHref: "tel:+79216413388",
  // Telegram-аккаунт компании
  telegramUrl: "https://t.me/SpecZabor",
  telegramHandle: "@SpecZabor",
  // Max — для шапки/подвала как доп. канал
  maxUrl: "https://max.ru/+79216413388",
  workHours: "Ежедневно 9:00 — 21:00",
  region: "СПб и Ленинградская область",
  email: "info@спецзабор.рф"
};
function tgLink(subject) {
  const text = `Здравствуйте. Пишу с Вашего сайта по услуге: ${subject}.`;
  return `${CONTACTS.telegramUrl}?text=${encodeURIComponent(text)}`;
}
const NAV = [
  { to: "/", label: "Главная" },
  { to: "/vorota-otkatnye", label: "Откатные ворота" },
  { to: "/vorota-raspashnye", label: "Распашные ворота" },
  { to: "/kalitki", label: "Калитки" },
  { to: "/proflist", label: "Профнастил" },
  { to: "/evroshtaketnik", label: "Евро Штакетник" },
  { to: "/gitter", label: "3D Gitter" },
  { to: "/jaluzi", label: "Жалюзи" },
  { to: "/dizainerskie", label: "Авторские" },
  { to: "/#reviews", label: "Отзывы", hash: true }
];
function Header() {
  const [open, setOpen] = reactExports.useState(false);
  const { content } = useCMS();
  const displayPhone = content.phone || CONTACTS.phone;
  const phoneHref = `tel:${displayPhone.replace(/[^\d+]/g, "")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-white/10 bg-graphite-deep/95 backdrop-blur supports-[backdrop-filter]:bg-graphite-deep/80 text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full px-4 md:px-8 grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl lg:text-3xl tracking-tight whitespace-nowrap", children: [
        "СПЕЦ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange", children: "/" }),
        "ЗАБОР",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow", children: ".РФ" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden xl:flex items-center justify-center gap-4 text-[13px]", children: NAV.slice(1).map(
        (n) => n.hash ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: n.to,
            className: "text-white/80 hover:text-yellow transition-colors whitespace-nowrap",
            children: n.label
          },
          n.to
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: n.to,
            className: "text-white/80 hover:text-yellow transition-colors whitespace-nowrap",
            activeProps: { className: "text-yellow" },
            activeOptions: { exact: true },
            children: n.label
          },
          n.to
        )
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: phoneHref,
            className: "hidden md:flex items-center gap-2 text-sm font-semibold hover:text-yellow transition-colors whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-yellow shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: displayPhone })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: CONTACTS.telegramUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hidden sm:inline-flex items-center gap-2 rounded-md btn-yellow btn-shiny px-4 py-2 text-sm whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-3.5" }),
              "Получить консультацию"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Меню",
            onClick: () => setOpen((v) => !v),
            className: "xl:hidden rounded-md border border-white/15 p-2",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xl:hidden border-t border-white/10 bg-graphite", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x py-4 grid gap-1", children: [
      NAV.map(
        (n) => n.hash ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: n.to,
            onClick: () => setOpen(false),
            className: "py-2 text-white/85 hover:text-yellow",
            children: n.label
          },
          n.to
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: n.to,
            onClick: () => setOpen(false),
            className: "py-2 text-white/85 hover:text-yellow",
            activeProps: { className: "text-yellow font-semibold" },
            activeOptions: { exact: true },
            children: n.label
          },
          n.to
        )
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: phoneHref,
          className: "mt-2 inline-flex items-center gap-2 text-yellow font-semibold",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4" }),
            displayPhone
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/55", children: CONTACTS.workHours })
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "section-dark mt-16 border-t border-white/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x py-14 grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-3xl tracking-tight", children: [
          "СПЕЦ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange", children: "/" }),
          "ЗАБОР",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow", children: ".РФ" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-white/65 max-w-md", children: "Изготовление и монтаж заборов в Санкт-Петербурге и Ленинградской области. Инженерный замер, ГОСТовая сварка, реальная гарантия по договору." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: tgLink("общая консультация по заборам"),
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-2 rounded-md bg-telegram px-4 py-2 text-sm font-semibold text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }),
                "Telegram"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: CONTACTS.maxUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-2 rounded-md bg-orange px-4 py-2 text-sm font-bold text-graphite-deep",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4" }),
                "Max"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-orange mb-3", children: "Каталог" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-white/75", children: NAV.slice(1, 9).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: n.to, className: "hover:text-orange", children: n.label }) }, n.to)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-orange mb-3", children: "Контакты" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-white/75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: CONTACTS.phoneHref, className: "hover:text-orange font-semibold", children: CONTACTS.phone }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: CONTACTS.workHours }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: CONTACTS.region }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: CONTACTS.email })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x py-5 flex flex-wrap gap-2 justify-between text-xs text-white/45", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " СПЕЦЗАБОР.РФ. Все права защищены."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Политика конфиденциальности" })
    ] }) })
  ] });
}
function FloatingCTA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4 pointer-events-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: CONTACTS.telegramUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Написать в Telegram",
        className: "pointer-events-auto group relative flex items-center justify-center size-12 rounded-full bg-[#229ED9] text-white shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,158,217,0.5)] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-5 fill-current" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-full mr-3 px-2 py-1 rounded bg-graphite-deep/80 backdrop-blur-sm text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 uppercase tracking-wider", children: "Telegram" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: CONTACTS.maxUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Связаться с Максом",
        className: "pointer-events-auto group relative flex items-center justify-center size-14 rounded-full bg-orange text-graphite-deep shadow-glow-orange hover:scale-110 transition-all duration-300 hover:bg-orange-bright ring-4 ring-orange/20 animate-in fade-in slide-in-from-bottom-6 duration-700",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-6 fill-current" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 size-3 bg-red-500 rounded-full border-2 border-white animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-full mr-3 px-2 py-1 rounded bg-graphite-deep/80 backdrop-blur-sm text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 uppercase tracking-wider", children: "Связаться с Максом" })
        ]
      }
    )
  ] });
}
function SiteLayout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingCTA, {})
  ] });
}
export {
  CONTACTS as C,
  SiteLayout as S,
  tgLink as t
};
