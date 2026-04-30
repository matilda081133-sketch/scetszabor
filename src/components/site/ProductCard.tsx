import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CONTACTS } from "@/lib/site";

export function ProductCard({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  const total = product.images.length;
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  return (
    <article className="group flex flex-col bg-card text-card-foreground rounded-xl overflow-hidden border border-border shadow-card hover:shadow-glow-orange transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={product.title}
            loading="lazy"
            width={1280}
            height={960}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {product.badge && (
          <span className="absolute top-3 left-3 hazard-stripe text-white text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
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
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Фото ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? "w-6 bg-orange" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl">{product.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{product.short}</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-foreground/80">
          {product.features.map((f) => (
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
              <span className="text-sm text-muted-foreground font-sans ml-1">
                ₽/м.п.
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground">высота {product.height}</div>
          </div>
          <a
            href={CONTACTS.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-graphite-deep text-white text-sm font-semibold px-3 py-2 hover:bg-orange hover:text-graphite-deep transition-colors"
          >
            Заказать
          </a>
        </div>
      </div>
    </article>
  );
}
