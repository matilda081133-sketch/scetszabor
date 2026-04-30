// Site-wide config: contacts, links, brand
export const CONTACTS = {
  phone: "+7 (812) 000-00-00",
  phoneHref: "tel:+78120000000",
  // Max messenger (placeholder — to replace later)
  maxUrl: "https://max.ru/speczabor",
  maxLabel: "Max",
  telegramUrl: "https://t.me/speczabor",
  telegramLabel: "Telegram",
  workHours: "Ежедневно 9:00 — 21:00",
  region: "СПб и Ленинградская область",
  email: "info@speczabor.ru",
};

export const NAV = [
  { to: "/", label: "Главная" },
  { to: "/proflist", label: "Профлист" },
  { to: "/evroshtaketnik", label: "Евроштакетник" },
  { to: "/derevo", label: "Деревянный" },
  { to: "/gitter", label: "3D-сетка" },
  { to: "/jaluzi", label: "Жалюзи" },
  { to: "/design", label: "Авторские" },
  { to: "/gates", label: "Ворота" },
  { to: "/catalog", label: "Каталог" },
] as const;
