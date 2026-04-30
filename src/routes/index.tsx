import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Calculator } from "@/components/site/Calculator";
import { LeadBlock } from "@/components/site/LeadBlock";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { ShieldCheck, Hammer, Camera, Ruler, Award, Users } from "lucide-react";
import { CountStat } from "@/components/site/CountStat";
import { FAQ } from "@/components/site/FAQ";
import heroImg from "@/assets/hero-fence.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "СПЕЦЗАБОР — заборы под ключ в СПб и Ленобласти" },
      {
        name: "description",
        content:
          "Изготовление и монтаж заборов под ключ в Санкт-Петербурге и ЛО. Профлист, евроштакетник, 3D-сетка, жалюзи, ворота. Реальная гарантия по договору.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative section-dark overflow-hidden">
        <img
          src={heroImg}
          alt="Забор СПЕЦЗАБОР"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-deep/95 via-graphite-deep/70 to-graphite-deep/20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-graphite-deep to-transparent" />
        <div className="container-x relative py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-yellow">
              <span className="hazard-stripe h-1 w-10 rounded-sm" />
              СПб и Ленинградская область
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] mt-4 text-left animate-fade-up">
              Заборы под ключ
              <br />
              <span className="text-yellow">с реальной гарантией</span>
              <br />
              по договору
            </h1>
            <p className="text-white/80 text-base md:text-lg mt-5 max-w-xl text-left animate-fade-up" style={{ animationDelay: "0.15s" }}>
              Инженерный замер с учётом грунта. ГОСТовая сварка. Фото- и видеофиксация скрытых работ.
              Точная смета до старта работ — без сюрпризов.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <a href="#calc" className="rounded-md btn-yellow px-6 py-3.5">
                Рассчитать стоимость
              </a>
              <Link
                to="/catalog"
                className="rounded-md border border-white/30 hover:border-yellow hover:text-yellow px-6 py-3.5 font-semibold transition-colors"
              >
                Смотреть каталог
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 max-w-2xl">
              <CountStat value={12} suffix="+" label="лет опыта" />
              <CountStat value={1500} suffix="+" label="заборов сдано" />
              <CountStat value={3} suffix=" года" label="гарантия" />
              <CountStat value={0} suffix=" ₽" label="за замер" />
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section className="container-x py-14 md:py-16">
        <SectionHeader kicker="Направления" title="Что мы строим" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(CATEGORIES).map((c) => {
            const sample = PRODUCTS.find((p) => p.category === c.slug);
            return (
              <Link
                key={c.slug}
                to={c.href}
                className="group relative overflow-hidden rounded-xl bg-graphite-deep text-white aspect-[4/3] block"
              >
                {sample && (
                  <img
                    src={sample.images[0]}
                    alt={c.title}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="absolute inset-0 size-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-deep via-graphite-deep/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-display text-2xl group-hover:text-yellow transition-colors">{c.title}</div>
                  <div className="text-sm text-white/75 mt-1">{c.lead}</div>
                  <div className="mt-3 text-xs uppercase tracking-widest text-yellow flex items-center gap-2">
                    Подробнее
                    <span className="h-px flex-1 bg-yellow/50" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* APPROACH */}
      <section className="section-graphite text-white py-14 md:py-16">
        <div className="container-x">
          <SectionHeader light kicker="Наш подход" title="Чем мы отличаемся от «мальчика с рулеткой»" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { i: Ruler, t: "Инженер на замер", d: "Изучает перепад высот и состав грунта. Никаких «прикинем на месте»." },
              { i: Hammer, t: "Сварка по ГОСТ", d: "Каждый шов обработан и покрыт. Лаги — не «прихватка», а полный шов." },
              { i: Camera, t: "Фотофиксация", d: "Бетонирование, бутование, узлы — всё снимаем. Скрыть косяки не получится." },
              { i: ShieldCheck, t: "Реальная гарантия", d: "Если ворота провисли или забор повело — приезжаем и исправляем." },
            ].map((b) => (
              <div key={b.t} className="bg-graphite-deep rounded-xl p-6 border border-white/10 hover:border-yellow/50 transition-colors">
                <b.i className="size-8 text-yellow" />
                <div className="font-display text-xl mt-4">{b.t}</div>
                <div className="text-sm text-white/70 mt-2">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="container-x py-14 md:py-16">
        <SectionHeader kicker="Калькулятор" title="Узнайте стоимость за 30 секунд" />
        <div className="mt-8">
          <Calculator />
        </div>
      </section>

      {/* TOP PRODUCTS */}
      <section className="container-x py-14 md:py-16 border-t border-border">
        <SectionHeader kicker="Популярное" title="Топ позиций каталога" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.filter((p) => p.badge === "Хит" || p.badge === "Премиум").slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded-md bg-graphite-deep text-white px-6 py-3 font-semibold hover:bg-yellow hover:text-graphite-deep transition-colors"
          >
            Открыть полный каталог →
          </Link>
        </div>
      </section>

      {/* PROMOS */}
      <section className="container-x py-14 md:py-16 border-t border-border">
        <SectionHeader kicker="Акции" title="Спецпредложения" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <PromoCard icon={Award} title="−10% участникам СВО и пенсионерам" body="Честная скидка по удостоверению. Без ограничений по сумме заказа." />
          <PromoCard icon={Users} title="Реферальная программа" body="Приведите друга — получите 3% от суммы его договора наличными." accent />
          <PromoCard icon={ShieldCheck} title="Подарок при замере" body="3D-эскиз забора и черновая смета — бесплатно при вызове инженера." />
        </div>
      </section>

      {/* LEAD */}
      <section className="container-x py-10">
        <LeadBlock />
      </section>
    </SiteLayout>
  );
}

export function SectionHeader({
  kicker,
  title,
  light,
}: {
  kicker: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className="text-left">
      <div className="text-xs uppercase tracking-[0.25em] text-orange flex items-center gap-3">
        <span className="hazard-stripe h-1 w-10 rounded-sm" />
        {kicker}
      </div>
      <h2 className={`font-display text-3xl md:text-5xl mt-3 text-left ${light ? "text-white" : ""}`}>
        {title}
      </h2>
    </div>
  );
}

function PromoCard({
  icon: Icon,
  title,
  body,
  accent,
}: {
  icon: typeof Award;
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-6 border ${
        accent
          ? "bg-orange text-graphite-deep border-orange shadow-brutal"
          : "bg-card border-border"
      }`}
    >
      <Icon className={`size-8 ${accent ? "text-graphite-deep" : "text-orange"}`} />
      <div className="font-display text-xl mt-4">{title}</div>
      <div className={`text-sm mt-2 ${accent ? "text-graphite-deep/80" : "text-muted-foreground"}`}>
        {body}
      </div>
    </div>
  );
}
