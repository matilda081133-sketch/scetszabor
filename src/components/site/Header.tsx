import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { CONTACTS, NAV } from "@/lib/site";
import logo from "@/assets/logo-spec.png";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-graphite-deep/95 backdrop-blur supports-[backdrop-filter]:bg-graphite-deep/80 text-white">
      <div className="container-x flex items-center gap-3 lg:gap-5 py-2 lg:py-2.5">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <img src={logo} alt="СПЕЦЗАБОР" className="h-10 lg:h-12 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" width={1280} height={853} />
          <span className="hidden lg:flex flex-col leading-tight whitespace-nowrap">
            <span className="font-display text-base tracking-tight">СПЕЦЗАБОР</span>
            <span className="text-[10px] text-white/55 uppercase tracking-wider">{CONTACTS.region}</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center justify-center gap-4 flex-1 text-[13px]">
          {NAV.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-white/80 hover:text-yellow transition-colors whitespace-nowrap"
              activeProps={{ className: "text-yellow" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto xl:ml-0 flex items-center gap-2 md:gap-3 shrink-0">
          <a
            href={CONTACTS.phoneHref}
            className="hidden md:flex items-center gap-2 text-sm font-semibold hover:text-yellow transition-colors whitespace-nowrap"
          >
            <Phone className="size-4 text-yellow shrink-0" />
            <span>{CONTACTS.phone}</span>
          </a>
          <a
            href={CONTACTS.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-md btn-yellow px-4 py-2 text-sm whitespace-nowrap"
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
                className="py-2 text-white/85 hover:text-yellow"
                activeProps={{ className: "text-yellow font-semibold" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={CONTACTS.phoneHref}
              className="mt-2 inline-flex items-center gap-2 text-yellow font-semibold"
            >
              <Phone className="size-4" />
              {CONTACTS.phone}
            </a>
            <span className="text-xs text-white/55">{CONTACTS.workHours}</span>
          </div>
        </div>
      )}
    </header>
  );
}
