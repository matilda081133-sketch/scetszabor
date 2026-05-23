import { CONTACTS } from "@/lib/site";
import { MessageCircle } from "lucide-react";

export function LeadBlock({
  title = "Рассчитайте стоимость вашего забора",
  subtitle = "Бесплатно приедем на участок (СПб и Ленинградская область). Изучим грунт, перепады высот и посчитаем, сколько стоит забор с установкой.",
  giftLabel = "Подарок: расчёт + 3D-эскиз забора",
}: {
  title?: string;
  subtitle?: string;
  giftLabel?: string;
}) {
  return (
    <section className="section-dark relative overflow-hidden rounded-3xl border border-white/5">
      <div className="absolute inset-y-0 right-0 w-1/2 hazard-stripe opacity-10 hidden md:block" />
      <div className="absolute -right-20 -top-20 size-72 rounded-full bg-orange/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 size-64 rounded-full bg-yellow/10 blur-3xl pointer-events-none" />
      <div className="relative p-8 md:p-14 grid gap-6 md:grid-cols-[1fr_auto] items-center">
        <div className="max-w-2xl">
          {giftLabel && (
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-yellow mb-3">
              <span className="size-1.5 rounded-full bg-yellow animate-pulse" />
              {giftLabel}
            </div>
          )}
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-balance">{title}</h2>
          <p className="text-white/70 mt-3 md:mt-4 text-sm md:text-base text-pretty max-w-lg">{subtitle}</p>
        </div>
        <div className="grid gap-3 w-full md:w-auto md:min-w-[300px] relative z-10">
          <a
            href={CONTACTS.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md btn-yellow px-6 py-4 text-center animate-pulse-ring"
          >
            Telegram — ответим за 5 мин
          </a>
          <a
            href={CONTACTS.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 flex items-center justify-center gap-2 backdrop-blur"
          >
            <MessageCircle className="size-5" />
            MAX
          </a>
          <a href={CONTACTS.phoneHref} className="text-center text-sm text-white/60 hover:text-yellow">
            или {CONTACTS.phone}
          </a>
          <p className="text-[10px] text-white/30 text-center leading-tight mt-1">
            Нажимая на кнопки связи, вы соглашаетесь с обработкой персональных данных (ФЗ-152).
          </p>
        </div>
      </div>
    </section>
  );
}
