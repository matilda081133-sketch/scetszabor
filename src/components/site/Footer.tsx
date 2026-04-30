import { Link } from "@tanstack/react-router";
import { CONTACTS, NAV } from "@/lib/site";

export function Footer() {
  return (
    <footer className="section-dark mt-16 border-t border-white/10">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-tight">
            СПЕЦ<span className="text-orange">/</span>ЗАБОР
          </div>
          <p className="mt-3 text-sm text-white/65 max-w-md">
            Изготовление и монтаж заборов в Санкт-Петербурге и Ленинградской области.
            Инженерный замер, ГОСТовая сварка, реальная гарантия по договору.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={CONTACTS.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-telegram px-4 py-2 text-sm font-semibold text-white"
            >
              Telegram
            </a>
            <a
              href={CONTACTS.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-orange px-4 py-2 text-sm font-bold text-graphite-deep"
            >
              Max
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-orange mb-3">Каталог</div>
          <ul className="space-y-2 text-sm text-white/75">
            {NAV.slice(1, 7).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-orange">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-orange mb-3">Контакты</div>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <a href={CONTACTS.phoneHref} className="hover:text-orange font-semibold">{CONTACTS.phone}</a>
            </li>
            <li>{CONTACTS.workHours}</li>
            <li>{CONTACTS.region}</li>
            <li>{CONTACTS.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-wrap gap-2 justify-between text-xs text-white/45">
          <span>© {new Date().getFullYear()} СПЕЦЗАБОР. Все права защищены.</span>
          <span>Политика конфиденциальности</span>
        </div>
      </div>
    </footer>
  );
}
