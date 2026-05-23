import { Link } from "@tanstack/react-router";
import { CONTACTS, NAV, tgLink } from "@/lib/site";
import { Send, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="section-dark mt-16 border-t border-white/10">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-tight">
            СПЕЦ<span className="text-orange">/</span>ЗАБОР<span className="text-yellow">.РФ</span>
          </div>
          <p className="mt-4 text-sm text-white/65 max-w-md leading-relaxed">
            Производство и профессиональный монтаж заборов, откатных ворот и калиток в Санкт-Петербурге и Ленобласти. Строим надежные ограждения из <strong>профнастила, штакетника, 3D сетки Гиттер и жалюзи</strong>. Собственные бригады, монтаж по СНиП, бутование столбов и официальный договор.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={tgLink("общая консультация по заборам")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-10 rounded-full bg-[#2AABEE] text-white hover:scale-110 transition-transform shadow-lg shadow-[#2AABEE]/20"
              title="Написать в Telegram"
            >
              <Send className="size-4 -ml-0.5" />
            </a>
            <a
              href={CONTACTS.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-10 rounded-full bg-orange text-graphite-deep hover:scale-110 transition-transform shadow-lg shadow-orange/20"
              title="Написать в MAX"
            >
              <MessageCircle className="size-5" />
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-orange mb-3">Каталог</div>
          <ul className="space-y-2 text-sm text-white/75">
            {NAV.slice(1, 9).map((n) => (
              <li key={n.to}>
                <Link to={n.to as "/proflist"} className="hover:text-orange">{n.label}</Link>
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
