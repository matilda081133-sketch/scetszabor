import { CONTACTS } from "@/lib/site";

export function LeadBlock({
  title = "Вызвать инженера на замер",
  subtitle = "Бесплатно. Приедем с инструментом, изучим грунт и перепады. Точный расчёт — на месте.",
  giftLabel = "Подарок: расчёт + 3D-эскиз забора",
}: {
  title?: string;
  subtitle?: string;
  giftLabel?: string;
}) {
  return (
    <section className="section-dark relative overflow-hidden rounded-3xl">
      <div className="absolute inset-y-0 right-0 w-1/3 hazard-stripe opacity-20 hidden md:block" />
      <div className="relative p-8 md:p-14 grid gap-6 md:grid-cols-[1fr_auto] items-center">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-orange">
            <span className="size-1.5 rounded-full bg-orange animate-pulse" />
            {giftLabel}
          </div>
          <h2 className="font-display text-3xl md:text-5xl mt-3">{title}</h2>
          <p className="text-white/70 mt-3">{subtitle}</p>
        </div>
        <div className="grid gap-3 w-full md:w-auto">
          <a
            href={CONTACTS.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-orange text-graphite-deep font-bold px-6 py-4 text-center shadow-glow-orange hover:bg-orange-bright transition-colors"
          >
            Telegram — ответим за 5 мин
          </a>
          <a
            href={CONTACTS.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 text-center"
          >
            Написать в Max
          </a>
          <a href={CONTACTS.phoneHref} className="text-center text-sm text-white/60 hover:text-orange">
            или {CONTACTS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
