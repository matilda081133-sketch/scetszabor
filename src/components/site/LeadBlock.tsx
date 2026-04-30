import { CONTACTS } from "@/lib/site";
import engineerImg from "@/assets/engineer.png";

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
    <section className="section-dark relative overflow-hidden rounded-3xl border border-white/5">
      <div className="absolute inset-y-0 right-0 w-1/2 hazard-stripe opacity-10 hidden md:block" />
      <img
        src={engineerImg}
        alt="Инженер СПЕЦЗАБОР"
        loading="lazy"
        width={768}
        height={1024}
        className="hidden md:block absolute right-4 lg:right-10 bottom-0 h-[110%] w-auto object-contain pointer-events-none select-none animate-float drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
      />
      <div className="relative p-8 md:p-14 grid gap-6 md:grid-cols-[1fr_auto] items-center">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-yellow">
            <span className="size-1.5 rounded-full bg-yellow animate-pulse" />
            {giftLabel}
          </div>
          <h2 className="font-display text-3xl md:text-5xl mt-3 leading-[1.05]">{title}</h2>
          <p className="text-white/70 mt-3">{subtitle}</p>
        </div>
        <div className="grid gap-3 w-full md:w-auto md:min-w-[280px] relative z-10">
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
            className="rounded-md bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 text-center backdrop-blur"
          >
            Написать в Max
          </a>
          <a href={CONTACTS.phoneHref} className="text-center text-sm text-white/60 hover:text-yellow">
            или {CONTACTS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
