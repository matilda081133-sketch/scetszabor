import { j as jsxRuntimeExports } from "./sanity-core-D7KvhOfd.js";
import { S as SiteLayout, t as tgLink, C as CONTACTS } from "./SiteLayout-Cdr7Xz5s.js";
import { P as ProductCard } from "./ProductCard-TTZX0_W1.js";
import { C as Calculator } from "./Calculator-q7aU2dQF.js";
import { k as productsByCategory, C as CATEGORIES, u as urlFor, S as SectionHeader } from "./router-BV1aMPGC.js";
import { R as Ruler, H as Hammer, C as Camera, S as ShieldCheck, a as reactExports, T as Truck, d as CalendarClock, W as Wrench, P as Phone, e as Send, U as User, M as Mail, f as MapPin, h as Clock } from "./lucide-02V0d3fb.js";
import { u as useCMS } from "./cms-BHq_xw1j.js";
const RAL_PALETTE = [
  { name: "Зелёный мох", ral: "RAL 6005", hex: "#114232" },
  { name: "Шоколад", ral: "RAL 8017", hex: "#3a2519" },
  { name: "Вишня", ral: "RAL 3005", hex: "#651722" },
  { name: "Графит", ral: "RAL 7024", hex: "#2c2c2e" },
  { name: "Чёрный", ral: "RAL 9005", hex: "#0d0d0f" },
  { name: "Белый", ral: "RAL 9003", hex: "#f0f0eb" },
  { name: "Слоновая кость", ral: "RAL 1015", hex: "#e6d2a4" },
  { name: "Синий", ral: "RAL 5005", hex: "#1f3a78" },
  { name: "Красно-коричневый", ral: "RAL 3009", hex: "#612e2a" },
  { name: "Серый", ral: "RAL 7004", hex: "#9c9c9c" }
];
const CATS_WITH_RAL = [
  "proflist",
  "evroshtaketnik",
  "gitter",
  "jaluzi",
  "vorota-otkatnye",
  "vorota-raspashnye",
  "kalitki"
];
function CategoryPage({
  slug,
  hero,
  variants,
  techPoints,
  calcDefault
}) {
  const cat = CATEGORIES[slug];
  const products = productsByCategory(slug);
  const showRal = CATS_WITH_RAL.includes(slug);
  const { getProductContent } = useCMS();
  const cmsData = getProductContent(slug);
  const displayTitle = cmsData?.heroTitle || cat.title;
  const displayLead = cmsData?.fullContent || cat.lead;
  const displayHeroImg = cmsData?.mainImage ? urlFor(cmsData.mainImage).url() : hero;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative section-dark overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: displayHeroImg,
          alt: cat.title,
          width: 1280,
          height: 960,
          className: "absolute inset-0 size-full object-cover opacity-45"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-graphite-deep via-graphite-deep/85 to-graphite-deep/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x relative py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.25em] text-orange flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hazard-stripe h-1 w-10 rounded-sm" }),
          "Направление"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-6xl mt-3 leading-[0.95]", children: [
          displayTitle,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange", children: "с реальной гарантией" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-lg mt-4 max-w-2xl", children: displayLead }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#calc",
              className: "rounded-md btn-yellow btn-shiny px-6 py-3.5 shadow-glow-yellow",
              children: "Рассчитать стоимость"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: tgLink(`консультация — ${cat.title}`),
              target: "_blank",
              rel: "noopener noreferrer",
              className: "rounded-md bg-[#229ED9] text-white px-6 py-3.5 font-semibold transition-transform hover:-translate-y-0.5 shadow-md flex items-center gap-2",
              children: "Telegram"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: CONTACTS.maxUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "rounded-md bg-orange text-graphite-deep px-6 py-3.5 font-bold transition-transform hover:-translate-y-0.5 shadow-glow-orange flex items-center gap-2",
              children: "Max"
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTabs, {}),
    variants.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-x py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { kicker: "Варианты исполнения", title: "Подберите под свой участок" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-5 md:grid-cols-3", children: variants.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "group rounded-xl overflow-hidden bg-card border border-border hover:border-orange hover:-translate-y-0.5 transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: v.img,
                  alt: v.title,
                  loading: "lazy",
                  width: 1280,
                  height: 960,
                  className: "size-full object-cover transition-all duration-500 group-hover:opacity-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-graphite-deep text-2xl uppercase leading-tight", children: v.title }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl", children: v.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: v.desc })
            ] })
          ]
        },
        v.title
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl section-dark p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-0 w-1/3 hazard-stripe opacity-[0.07] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-yellow", children: "Не уверены, какой вариант ваш?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl md:text-3xl text-white mt-1", children: "Инженер приедет на замер и подскажет лучшее решение" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: tgLink(`вызов инженера — ${cat.title}`),
              target: "_blank",
              rel: "noopener noreferrer",
              className: "rounded-md btn-yellow px-6 py-3.5 whitespace-nowrap",
              children: "Вызвать инженера"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#calc",
              className: "rounded-md border border-white/25 hover:border-yellow hover:text-yellow px-6 py-3.5 font-semibold transition-colors text-white whitespace-nowrap",
              children: "Рассчитать стоимость"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-graphite text-white py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { light: true, kicker: "Технология", title: "Как мы монтируем" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: techPoints.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-graphite-deep rounded-xl p-6 border border-white/10 text-left hover:border-yellow/50 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-3xl text-yellow", children: [
              "0",
              i + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg mt-2", children: t.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/65 mt-2", children: t.desc })
          ]
        },
        t.title
      )) })
    ] }) }),
    showRal && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-x py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { kicker: "Цвета", title: "Доступные расцветки RAL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-2xl text-left", children: "Покраска по каталогу RAL с двух сторон. Ниже — самые востребованные. Полный каталог (более 200 оттенков) — по запросу." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4", children: RAL_PALETTE.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "group rounded-xl overflow-hidden border border-border bg-card hover:border-orange hover:-translate-y-0.5 transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "aspect-[4/3] w-full",
                style: { backgroundColor: c.hex },
                "aria-label": `${c.name} ${c.ral}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: c.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.ral })
            ] })
          ]
        },
        c.ral
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "calc", className: "container-x py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { kicker: "Калькулятор", title: "Стоимость за 30 секунд" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { defaultType: calcDefault }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "products", className: "container-x pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { kicker: "Каталог", title: `${cat.title} — позиции` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `mt-10 grid gap-6 ${products.length === 1 ? "md:grid-cols-1 max-w-2xl mx-auto" : products.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"}`,
          children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-x py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { kicker: "Преимущества", title: "Почему выбирают СПЕЦЗАБОР.РФ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: [
        { i: Ruler, t: "Инженер на замер", d: "Перепад высот, грунт, точная смета до договора." },
        { i: Hammer, t: "Сварка по ГОСТ", d: "Полные швы, обработка, антикоррозийное покрытие." },
        { i: Camera, t: "Фотофиксация", d: "Бетонирование, бутование, скрытые узлы — всё на фото." },
        { i: ShieldCheck, t: "Реальная гарантия", d: "Не «номинал в договоре», а сервис, который мы исполняем." }
      ].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-6 border border-border bg-card text-left hover:border-orange hover:shadow-card transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(b.i, { className: "size-7 text-orange" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg mt-3", children: b.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-2", children: b.d })
          ]
        },
        b.t
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ContactsBlock, { title: cat.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10" })
  ] });
}
function InfoTabs() {
  const [active, setActive] = reactExports.useState("delivery");
  const tabs = [
    { key: "delivery", icon: Truck, label: "Доставка" },
    { key: "terms", icon: CalendarClock, label: "Сроки" },
    { key: "warranty", icon: ShieldCheck, label: "Гарантия" },
    { key: "install", icon: Wrench, label: "Монтаж" }
  ];
  const content = {
    delivery: {
      title: "Доставка по СПб и Ленобласти",
      body: "Возим материал на свою бригаду — клиент не ловит грузовик отдельно. До 50 км от КАД — бесплатно при заказе под ключ.",
      bullets: ["До 50 км от КАД — бесплатно", "Дальше — 35 ₽/км", "Подъезд согласовываем заранее", "Разгрузка силами бригады"]
    },
    terms: {
      title: "Сроки от замера до сдачи",
      body: "Стандартный участок 30–50 м.п. — 5–10 дней с момента подписания договора. Сложные геометрии и ландшафт — обсуждаем индивидуально.",
      bullets: ["Замер — 1–2 дня", "Заготовка металла — 2–3 дня", "Монтаж — 2–5 дней", "Сдача с фотоотчётом"]
    },
    warranty: {
      title: "Гарантия по договору — 3 года",
      body: "Гарантия не «на бумаге»: при провисании ворот, наклоне столба или сколах краски — приезжаем и устраняем за свой счёт.",
      bullets: ["3 года на каркас и сварку", "5 лет на полимерное покрытие", "Сервис в течение 7 дней", "Документы — официально"]
    },
    install: {
      title: "Монтаж под ключ",
      body: "Бетонирование столбов на 1,2 м, бутование при необходимости. ГОСТовая сварка с полным проваром, обработка швов и антикор.",
      bullets: ["Глубина 1,2 м", "Бетон М300", "Сварка по ГОСТ 5264-80", "Грунт + покраска швов"]
    }
  };
  const c = content[active];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-x -mt-2 md:-mt-6 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card shadow-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 border-b border-border", children: tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActive(t.key),
        className: `flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-wider transition-colors border-r last:border-r-0 border-border ${active === t.key ? "bg-graphite-deep text-yellow" : "bg-card text-foreground hover:bg-secondary"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(t.icon, { className: "size-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.label })
        ]
      },
      t.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 grid md:grid-cols-[1.4fr_1fr] gap-6 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: c.body })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2 content-start", children: c.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 size-1.5 rounded-full bg-orange shrink-0" }),
        b
      ] }, b)) })
    ] })
  ] }) });
}
function ContactsBlock({ title }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-x py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { kicker: "Контакты", title: "Свяжитесь с нами" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-6 md:p-8 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: "СПЕЦЗАБОР.РФ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Изготовление и монтаж заборов в Санкт-Петербурге и Ленинградской области." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 grid gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: Phone, label: "Телефон", value: CONTACTS.phone, href: CONTACTS.phoneHref }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: Send, label: "Telegram", value: CONTACTS.telegramHandle, href: CONTACTS.telegramUrl, external: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: User, label: "Max", value: "Связаться с Максом", href: CONTACTS.maxUrl, external: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: Mail, label: "Email", value: CONTACTS.email, href: `mailto:${CONTACTS.email}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: MapPin, label: "Регион", value: CONTACTS.region }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContactRow, { icon: Clock, label: "Часы работы", value: CONTACTS.workHours })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MiniLeadForm, { subject: title })
    ] })
  ] });
}
function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external
}) {
  const inner = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-forest shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: value })
    ] })
  ] });
  if (!href) return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: inner });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href,
      target: external ? "_blank" : void 0,
      rel: external ? "noopener noreferrer" : void 0,
      className: "block hover:opacity-80 transition-opacity",
      children: inner
    }
  ) });
}
function MiniLeadForm({ subject }) {
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [comment, setComment] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Заявка с сайта.
Услуга: ${subject}
Имя: ${name || "—"}
Телефон: ${phone || "—"}
Комментарий: ${comment || "—"}`;
    window.open(`${CONTACTS.telegramUrl}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "rounded-2xl section-dark p-6 md:p-8 text-left border border-white/10 relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-0 w-1/2 hazard-stripe opacity-[0.07] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-yellow", children: "Быстрая заявка" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl md:text-3xl mt-2 text-white", children: "Оставьте заявку — рассчитаем за 30 минут" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/65 mt-2 text-sm", children: "Без навязчивых звонков. Перезваниваем только по делу." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Ваше имя",
                className: "w-full rounded-md bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/45 outline-none focus:border-yellow"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                placeholder: "Телефон или Telegram",
                className: "w-full rounded-md bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/45 outline-none focus:border-yellow",
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: comment,
                onChange: (e) => setComment(e.target.value),
                placeholder: "Коротко: длина забора, адрес участка",
                rows: 3,
                className: "w-full rounded-md bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/45 outline-none focus:border-yellow resize-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "rounded-md btn-yellow px-6 py-3.5", children: "Отправить заявку" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/40 leading-tight", children: "Нажимая «Отправить», вы даете согласие на обработку персональных данных в соответствии с ФЗ-152 и принимаете условия политики конфиденциальности." })
          ] })
        ] })
      ]
    }
  );
}
export {
  CategoryPage as C
};
