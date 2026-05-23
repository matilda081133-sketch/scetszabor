import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tgLink } from "@/lib/site";
import { urlFor } from "@/lib/sanity/client";
import { LeadModal } from "@/components/site/LeadModal";

export function ProductCard({ product }: { product: any }) {
  const [idx, setIdx] = useState(0);
  
  // Normalize images to handle both static (strings) and Sanity (objects)
  const productImages = (product.gallery || (product.images ? product.images : (product.mainImage ? [product.mainImage] : [])));
  const total = productImages.length;

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

  const getImageUrl = (img: any) => {
    if (typeof img === 'string') return img;
    if (img?._type === 'image' || img?.asset) return urlFor(img).width(800).url();
    return '';
  };

  return (
    <article className="group flex flex-col bg-card text-card-foreground rounded-xl overflow-hidden border border-border shadow-card hover:shadow-glow-orange hover:-translate-y-0.5 transition-all duration-300">
      <div 
        className="relative aspect-[4/3] overflow-hidden bg-muted"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="absolute inset-0 z-0"
        >
          {productImages.map((img: any, i: number) => {
            const src = getImageUrl(img);
            return (
              <img
                key={src || i}
                src={src}
                alt={product.title}
                loading="lazy"
                width={800}
                height={600}
                className={`absolute inset-0 size-full object-cover transition-all duration-500 ${
                  i === idx ? "opacity-100 scale-105" : "opacity-0 scale-100"
                }`}
              />
            );
          })}
        </Link>

        {/* Dots */}
        {total > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {productImages.map((_: any, i: number) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setIdx(i); }}
                className={`size-1.5 rounded-full transition-all ${
                  i === idx ? "bg-orange w-4" : "bg-white/50 hover:bg-white"
                }`}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Small orange hint on hover instead of full overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
          <div className="bg-orange text-graphite-deep text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-lg">
            Подробнее
          </div>
        </div>

        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm z-10 ${
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
              className="absolute left-2 top-1/2 -translate-y-1/2 size-8 grid place-items-center rounded-full bg-graphite-deep/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-graphite-deep z-20"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Следующее фото"
              className="absolute right-2 top-1/2 -translate-y-1/2 size-8 grid place-items-center rounded-full bg-graphite-deep/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-graphite-deep z-20"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Link to="/products/$productId" params={{ productId: product.id }}>
          <h3 className="font-display text-xl group-hover:text-orange transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{product.short}</p>

        {product.tags && product.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.tags.map((t: string) => (
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
          {product.features.slice(0, 4).map((f: string) => (
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
          <LeadModal subject={`Рассчёт стоимости — ${product.title}`}>
            <button
              type="button"
              className="rounded-md btn-yellow btn-shiny text-center text-sm py-2.5"
            >
              Рассчитать
            </button>
          </LeadModal>
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
