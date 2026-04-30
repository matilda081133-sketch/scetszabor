import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { Calculator } from "@/components/site/Calculator";
import { LeadBlock } from "@/components/site/LeadBlock";
import { SectionHeader } from "@/routes/index";
import { CATEGORIES, productsByCategory, type CategorySlug } from "@/lib/catalog";
import { ShieldCheck, Hammer, Camera, Ruler } from "lucide-react";

export function CategoryPage({
  slug,
  hero,
  variants,
  techPoints,
  calcDefault,
}: {
  slug: CategorySlug;
  hero: string;
  variants: { title: string; img: string; desc: string }[];
  techPoints: { title: string; desc: string }[];
  calcDefault?: string;
}) {
  const cat = CATEGORIES[slug];
  const products = productsByCategory(slug);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative section-dark overflow-hidden">
        <img
          src={hero}
          alt={cat.title}
          width={1280}
          height={960}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-deep via-graphite-deep/80 to-transparent" />
        <div className="container-x relative py-20 md:py-28 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.25em] text-orange flex items-center gap-3">
            <span className="hazard-stripe h-1 w-10 rounded-sm" />
            Направление
          </div>
          <h1 className="font-display text-4xl md:text-6xl mt-3 leading-[0.95]">
            {cat.title} <span className="text-orange">с реальной гарантией</span>
          </h1>
          <p className="text-white/75 text-lg mt-4">{cat.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#calc" className="rounded-md bg-orange text-graphite-deep font-bold px-6 py-3.5 shadow-glow-orange hover:bg-orange-bright transition-colors">
              Рассчитать стоимость
            </a>
            <a href="#products" className="rounded-md border border-white/25 hover:border-orange hover:text-orange px-6 py-3.5 font-semibold transition-colors">
              Смотреть варианты
            </a>
          </div>
        </div>
      </section>

      {/* Variants */}
      {variants.length > 0 && (
        <section className="container-x py-16">
          <SectionHeader kicker="Варианты исполнения" title="Подберите под свой участок" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {variants.map((v) => (
              <div key={v.title} className="rounded-xl overflow-hidden bg-card border border-border">
                <img src={v.img} alt={v.title} loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <div className="font-display text-xl">{v.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech */}
      <section className="section-graphite text-white py-16">
        <div className="container-x">
          <SectionHeader light kicker="Технология" title="Как мы монтируем" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {techPoints.map((t, i) => (
              <div key={t.title} className="bg-graphite-deep rounded-xl p-6 border border-white/10">
                <div className="font-display text-3xl text-orange">0{i + 1}</div>
                <div className="font-display text-lg mt-2">{t.title}</div>
                <div className="text-sm text-white/65 mt-2">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calc */}
      <section id="calc" className="container-x py-16">
        <SectionHeader kicker="Калькулятор" title="Стоимость за 30 секунд" />
        <div className="mt-10">
          <Calculator defaultType={calcDefault} />
        </div>
      </section>

      {/* Products */}
      <section id="products" className="container-x pb-10">
        <SectionHeader kicker="Каталог" title={`${cat.title} — позиции`} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="container-x py-16">
        <SectionHeader kicker="Доверие" title="Почему с нами безопасно" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Ruler, t: "Инженер на замер", d: "Перепад высот, грунт, точная смета до договора." },
            { i: Hammer, t: "Сварка по ГОСТ", d: "Полные швы, обработка, антикоррозийное покрытие." },
            { i: Camera, t: "Фотофиксация", d: "Бетонирование, бутование, скрытые узлы — всё на фото." },
            { i: ShieldCheck, t: "Реальная гарантия", d: "Не «номинал в договоре», а сервис, который мы исполняем." },
          ].map((b) => (
            <div key={b.t} className="rounded-xl p-6 border border-border bg-card">
              <b.i className="size-7 text-orange" />
              <div className="font-display text-lg mt-3">{b.t}</div>
              <div className="text-sm text-muted-foreground mt-2">{b.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x">
        <LeadBlock />
      </section>
      <div className="h-10" />
    </SiteLayout>
  );
}
