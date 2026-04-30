import { useState } from "react";
import { CONTACTS } from "@/lib/site";
import { MessageCircle, X } from "lucide-react";

export function FloatingCTA() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="rounded-xl bg-graphite-deep text-white p-4 shadow-card border border-white/10 max-w-[280px] animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start gap-2">
            <p className="text-sm leading-snug">
              Напишите нам — ответим за 5 минут и пришлём расчёт стоимости.
            </p>
            <button onClick={() => setOpen(false)} aria-label="Закрыть" className="text-white/60 hover:text-white">
              <X className="size-4" />
            </button>
          </div>
          <div className="mt-3 grid gap-2">
            <a
              href={CONTACTS.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-telegram px-3 py-2 text-center text-sm font-semibold"
            >
              Написать в Telegram
            </a>
            <a
              href={CONTACTS.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-orange px-3 py-2 text-center text-sm font-bold text-graphite-deep"
            >
              Написать в Max
            </a>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Связаться"
        className="size-14 rounded-full bg-orange text-graphite-deep shadow-glow-orange flex items-center justify-center hover:bg-orange-bright transition-all hover:scale-105 ring-4 ring-orange/30"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
