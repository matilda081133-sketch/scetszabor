import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tgLink } from "@/lib/site";

export function ProductCard({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  const total = product.images.length;
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((i) => (i + 1) % total);
  };
  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((i) => (i - 1 + total) % total);
  };
  // Hover swap on the image — выполнение клиентского пожелания: меняется цвет/фото
  const onEnter = () => total > 1 && setIdx(1);
  const onLeave = () => setIdx(0);

  const unit = product.priceUnit ?? "м.п.";

  return (
    <article className="group flex flex-col bg-card text-card-foreground rounded-xl overflow-hidden border border-border shadow-card hover:shadow-glow-orange hover:-translate-y-0.5 transition-all duration-300">
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        className="block"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {product.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={product.title}
              loading="lazy"
              width={1280}
              height={960}
              className={`absolute inset-0 size-full object-cover transition-all duration-500 ${
                i === idx ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          ))}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm ${
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
                aria-label="Предыдущее фото"
                className="absolute left-2 top-1/2 -translate-y-1/2 size-9 grid place-items-center rounded-full bg-graphite-deep/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-graphite-deep"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Следующее фото"
                className="absolute right-2 top-1/2 -translate-y-1/2 size-9 grid place-items-center rounded-full bg-graphite-deep/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-graphite-deep"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link to="/products/$productId" params={{ productId: product.id }}>
          <h3 className="font-display text-xl group-hover:text-orange transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{product.short}</p>

        {product.tags && product.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
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

        <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-foreground/80">
          {product.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 rounded-full bg-forest shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-border flex items-end justify-between gap-3">
          <div>
            <div className="text-xs text-muted-foreground">от</div>
            <div className="font-display text-2xl">
              {product.pricePerM.toLocaleString("ru-RU")}
              <span className="text-sm text-muted-foreground font-sans ml-1">₽/{unit}</span>
            </div>
            <div className="text-[11px] text-muted-foreground">высота {product.height}</div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <a
            href={tgLink(`расчёт стоимости — ${product.title}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md btn-yellow text-center text-sm py-2.5"
          >
            Рассчитать
          </a>
          <Link
            to="/products/$productId"
            params={{ productId: product.id }}
            className="rounded-md bg-graphite-deep text-white text-center text-sm font-semibold py-2.5 hover:bg-orange hover:text-graphite-deep transition-colors"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}
