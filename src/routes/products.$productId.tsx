import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LeadBlock } from "@/components/site/LeadBlock";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS, productById, productsByCategory } from "@/lib/catalog";
import { tgLink } from "@/lib/site";
import { ChevronLeft, ChevronRight, Check, Ruler, Hammer, Camera, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const product = productById(params.productId);
    if (!product) return { meta: [{ title: "Товар не найден — СПЕЦЗАБОР.РФ" }] };
    return {
      meta: [
        { title: `${product.title} — цена под ключ — СПЕЦЗАБОР.РФ` },
        { name: "description", content: product.short },
        { property: "og:title", content: product.title },
        { property: "og:description", content: product.short },
        { property: "og:image", content: product.images[0] },
      ],
    };
  },
  loader: ({ params }) => {
    const product = productById(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-20 text-center">
        <h1 className="font-display text-4xl">Товар не найден</h1>
        <Link to="/catalog" className="mt-6 inline-block rounded-md btn-yellow px-6 py-3">
          Вернуться в каталог
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="container-x py-20 text-center">
        <h1 className="font-display text-3xl">Ошибка загрузки</h1>
        <p className="text-muted-foreground mt-2">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [idx, setIdx] = useState(0);
  const total = product.images.length;
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const cat = CATEGORIES[product.category];
  const others = productsByCategory(product.category).filter((p) => p.id !== product.id);
  const unit = product.priceUnit ?? "м.п.";

  return (
    <SiteLayout>
      {/* Crumbs */}
      <div className="container-x pt-6 text-xs text-muted-foreground flex flex-wrap gap-2">
        <Link to="/" className="hover:text-orange">Главная</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-orange">Каталог</Link>
        <span>/</span>
        <Link to={cat.href} className="hover:text-orange">{cat.title}</Link>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </div>

      {/* Top */}
      <section className="container-x py-8 md:py-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-card group">
            {product.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={product.title}
                width={1280}
                height={960}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
                  i === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {product.badge && (
              <span
                className={`absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm ${
                  product.badge === "Премиум" || product.badge === "Эксклюзив"
                    ? "badge-solid-orange"
                    : "badge-solid"
                }`}
              >
                {product.badge}
              </span>
            )}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Предыдущее"
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full bg-graphite-deep/80 text-white hover:bg-graphite-deep"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Следующее"
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full bg-graphite-deep/80 text-white hover:bg-graphite-deep"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>
          {total > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={`aspect-[4/3] rounded-md overflow-hidden border-2 transition-colors ${
                    i === idx ? "border-orange" : "border-transparent"
                  }`}
                >
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-orange">{cat.title}</div>
          <h1 className="font-display text-3xl md:text-5xl mt-3 leading-[1.05]">{product.title}</h1>
          <p className="text-muted-foreground mt-3 text-base">{product.short}</p>

          {product.tags && product.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-secondary text-forest-dark border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-2xl bg-graphite-deep text-white p-6">
            <div className="text-xs uppercase tracking-widest text-yellow">Цена</div>
            <div className="font-display text-4xl md:text-5xl leading-none mt-1">
              от {product.pricePerM.toLocaleString("ru-RU")}
              <span className="text-lg text-white/60 ml-1">₽/{unit}</span>
            </div>
            <p className="text-sm text-white/70 mt-3">
              Под ключ: материалы, монтаж, бетонирование. Финальная цена — после замера.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={tgLink(`расчёт стоимости — ${product.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md btn-yellow text-center py-3"
              >
                Рассчитать стоимость
              </a>
              <a
                href={tgLink(`получить подробности — ${product.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-white/10 hover:bg-white/15 text-white text-center font-semibold py-3"
              >
                Узнать подробнее
              </a>
            </div>
          </div>

          {/* Heights table */}
          {product.heights && product.heights.length > 0 && (
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-orange mb-2">
                Стандартные высоты
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.heights.map((h) => (
                  <div
                    key={h.h}
                    className="rounded-lg border border-border bg-card p-3 hover:border-orange transition-colors"
                  >
                    <div className="text-sm text-muted-foreground">{h.h}</div>
                    <div className="font-display text-xl">
                      {h.price.toLocaleString("ru-RU")}
                      <span className="text-xs text-muted-foreground font-sans ml-1">₽/{unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Description + features */}
      <section className="container-x py-10 md:py-14 border-t border-border grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-display text-2xl md:text-3xl">Описание</h2>
          <p className="mt-4 text-foreground/85 leading-relaxed">
            {product.description ?? product.short}
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl md:text-3xl">Характеристики</h2>
          <ul className="mt-4 grid gap-2.5">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <Check className="size-5 text-success shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why us */}
      <section className="section-graphite text-white py-14">
        <div className="container-x">
          <div className="text-xs uppercase tracking-[0.25em] text-yellow">Гарантии</div>
          <h2 className="font-display text-3xl md:text-4xl mt-2">Почему с нами безопасно</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { i: Ruler, t: "Инженер на замер", d: "Перепад высот, грунт, точная смета." },
              { i: Hammer, t: "Сварка по ГОСТ", d: "Полные швы, антикор, порошок." },
              { i: Camera, t: "Фотофиксация", d: "Скрытые узлы — всё на фото." },
              { i: ShieldCheck, t: "Гарантия", d: "По договору. Реально приезжаем." },
            ].map((b) => (
              <div key={b.t} className="bg-graphite-deep rounded-xl p-5 border border-white/10">
                <b.i className="size-7 text-yellow" />
                <div className="font-display text-lg mt-3">{b.t}</div>
                <div className="text-sm text-white/65 mt-1">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other in category */}
      {others.length > 0 && (
        <section className="container-x py-14">
          <h2 className="font-display text-2xl md:text-3xl">Другие в категории «{cat.title}»</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="container-x pb-10">
        <LeadBlock
          title={`Вызвать инженера — ${product.title}`}
          subtitle="Бесплатный замер. 3D-эскиз и смета в подарок."
        />
      </section>
    </SiteLayout>
  );
}

void PRODUCTS;
