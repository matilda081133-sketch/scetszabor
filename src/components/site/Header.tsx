import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { CONTACTS, NAV } from "@/lib/site";
import logo from "@/assets/logo.png";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-graphite-deep/95 backdrop-blur supports-[backdrop-filter]:bg-graphite-deep/80 text-white">
      <div className="container-x flex items-center gap-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <img src={logo} alt="СПЕЦЗАБОР" className="h-8 md:h-10 w-auto" width={1536} height={1024} />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-widest text-orange">Заборы под ключ</span>
            <span className="text-[11px] text-white/60">{CONTACTS.region}</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-5 ml-6 text-sm">
          {NAV.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-white/80 hover:text-orange transition-colors"
              activeProps={{ className: "text-orange" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <a
            href={CONTACTS.phoneHref}
            className="hidden md:flex items-center gap-2 text-sm font-semibold hover:text-orange transition-colors"
          >
            <Phone className="size-4 text-orange" />
            {CONTACTS.phone}
          </a>
          <a
            href={CONTACTS.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-md bg-orange hover:bg-orange-bright text-graphite-deep font-bold px-4 py-2 text-sm transition-colors shadow-glow-orange"
          >
            Написать
          </a>
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden rounded-md border border-white/15 p-2"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="xl:hidden border-t border-white/10 bg-graphite">
          <div className="container-x py-4 grid gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-white/85 hover:text-orange"
                activeProps={{ className: "text-orange font-semibold" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={CONTACTS.phoneHref}
              className="mt-2 inline-flex items-center gap-2 text-orange font-semibold"
            >
              <Phone className="size-4" />
              {CONTACTS.phone}
            </a>
            <span className="text-xs text-white/50">{CONTACTS.workHours}</span>
          </div>
        </div>
      )}
    </header>
  );
}
