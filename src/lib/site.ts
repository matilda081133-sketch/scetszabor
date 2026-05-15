// Site-wide config: contacts, links, brand
export const CONTACTS = {
  phone: "+7 (921) 641-33-88",
  phoneRaw: "+79216413388",
  phoneHref: "tel:+79216413388",
  // Telegram-аккаунт компании
  telegramUrl: "https://t.me/SpecZabor",
  telegramHandle: "@SpecZabor",
  telegramLabel: "Telegram",
  // Max — для шапки/подвала как доп. канал
  maxUrl: "https://max.ru/+79216413388",
  maxLabel: "Max",
  workHours: "Ежедневно 9:00 — 21:00",
  region: "СПб и Ленинградская область",
  email: "info@спецзабор.рф",
  brand: "СПЕЦЗАБОР.РФ",
};

/**
 * Сформировать ссылку в Telegram с предзаполненным сообщением.
 * `subject` — название услуги/забора, попадает в текст письма.
 */
export function tgLink(subject: string) {
  const text = `Здравствуйте. Пишу с Вашего сайта по услуге: ${subject}.`;
  return `${CONTACTS.telegramUrl}?text=${encodeURIComponent(text)}`;
}

export type NavItem = {
  to: string;
  label: string;
  /** Якорь / внешняя ссылка — рендерим через <a>, а не <Link> */
  hash?: boolean;
};

export const NAV: NavItem[] = [
  { to: "/", label: "Главная" },
  { to: "/vorota-otkatnye", label: "Откатные ворота" },
  { to: "/vorota-raspashnye", label: "Распашные ворота" },
  { to: "/kalitki", label: "Калитки" },
  { to: "/proflist", label: "Профнастил" },
  { to: "/evroshtaketnik", label: "Евро Штакетник" },
  { to: "/gitter", label: "3D Gitter" },
  { to: "/jaluzi", label: "Жалюзи" },
  { to: "/dizainerskie", label: "Авторские" },
  { to: "/#reviews", label: "Отзывы", hash: true },
];
