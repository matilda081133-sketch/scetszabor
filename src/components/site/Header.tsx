import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Send } from "lucide-react";
import { useState } from "react";
import { CONTACTS, NAV } from "@/lib/site";
import { useCMS } from "@/lib/cms";
import { LeadModal } from "@/components/site/LeadModal";

// Официальная иконка мессенджера MAX (VK)
function MaxIcon({ size = 20 }: { size?: number }) {
  return (
    <img
      src="https://max.ru/favicon.png"
      width={size}
      height={size}
      alt="MAX"
      style={{ borderRadius: "22%", display: "block", objectFit: "cover" }}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "https://max.ru/favicon.ico";
      }}
    />
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { content } = useCMS();
  const displayPhone = content.phone || CONTACTS.phone;
  const phoneHref = `tel:${displayPhone.replace(/[^\d+]/g, "")}`;
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-graphite-deep/95 backdrop-blur supports-[backdrop-filter]:bg-graphite-deep/80 text-white">
      <div className="w-full px-4 md:px-8 grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3">
        {/* Left: logo */}
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl lg:text-3xl tracking-tight whitespace-nowrap">
            СПЕЦ<span className="text-orange">/</span>ЗАБОР<span className="text-yellow">.РФ</span>
          </span>
        </Link>

        {/* Center: nav */}
        <nav className="hidden xl:flex items-center justify-center gap-4 text-[13px]">
          {NAV.slice(1).map((n) =>
            n.hash ? (
              <a
                key={n.to}
                href={n.to}
                className="text-white/80 hover:text-yellow transition-colors whitespace-nowrap"
              >
                {n.label}
              </a>
            ) : (
              <Link
                key={n.to}
                to={n.to as "/proflist"}
                className="text-white/80 hover:text-yellow transition-colors whitespace-nowrap"
                activeProps={{ className: "text-yellow" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            )
          )}
        </nav>

        {/* Right: contacts */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Phone — visible on mobile too */}
          <a
            href={phoneHref}
            className="flex items-center gap-1.5 text-sm font-semibold hover:text-yellow transition-colors whitespace-nowrap"
          >
            <Phone className="size-4 text-yellow shrink-0" />
            <span className="hidden sm:inline">{displayPhone}</span>
          </a>
          {/* Telegram link */}
          <a
            href={CONTACTS.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden rounded-[22%]"
          >
            <img
              src="https://telegram.org/img/t_logo.png"
              width={28}
              height={28}
              alt="Telegram"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://telegram.org/favicon.ico"; }}
            />
          </a>
          {/* MAX link — official icon, always visible */}
          <a
            href={CONTACTS.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MAX"
            className="flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <MaxIcon size={28} />
          </a>
          <LeadModal subject="Заказ обратного звонка">
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-2 rounded-md btn-yellow btn-shiny px-4 py-2 text-sm whitespace-nowrap"
            >
              <Send className="size-3.5" />
              Получить консультацию
            </button>
          </LeadModal>
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
            {NAV.map((n) =>
              n.hash ? (
                <a
                  key={n.to}
                  href={n.to}
                  onClick={() => setOpen(false)}
                  className="py-2 text-white/85 hover:text-yellow"
                >
                  {n.label}
                </a>
              ) : (
                <Link
                  key={n.to}
                  to={n.to as "/proflist"}
                  onClick={() => setOpen(false)}
                  className="py-2 text-white/85 hover:text-yellow"
                  activeProps={{ className: "text-yellow font-semibold" }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              )
            )}
            <a
              href={phoneHref}
              className="mt-2 inline-flex items-center gap-2 text-yellow font-semibold"
            >
              <Phone className="size-4" />
              {displayPhone}
            </a>
            <a
              href={CONTACTS.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold"
            >
              <MaxIcon size={22} />
              Написать в MAX
            </a>
            <span className="text-xs text-white/55">{CONTACTS.workHours}</span>
          </div>
        </div>
      )}
    </header>
  );
}
