import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { LeadBlock } from "@/components/site/LeadBlock";
import { CATEGORIES_ORDERED, PRODUCTS, type CategorySlug } from "@/lib/catalog";
import { useCMS } from "@/lib/cms";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Каталог заборов и ворот — СПЕЦЗАБОР" },
      {
        name: "description",
        content:
          "Каталог заборов: профлист, евроштакетник, 3D-сетка, жалюзи, дизайнерские, ворота. Цены под ключ для СПб и Ленобласти.",
      },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const { content, loading } = useCMS();
  const [active, setActive] = useState<CategorySlug | "all">("all");
  
  // Use products from CMS if available, otherwise fallback to static products
  const displayProducts = content.products && content.products.length > 0 
    ? content.products.map((p: any) => ({
        id: p.slug?.current || p._id,
        category: p.category || "proflist",
        title: p.title,
        short: p.description,
        pricePerM: p.price,
        image: p.mainImage, // We will handle Sanity images in the ProductCard
        ...p
      }))
    : PRODUCTS;

  const list = active === "all" ? displayProducts : displayProducts.filter((p: any) => p.category === active);

  return (
    <SiteLayout>
      <section className="section-dark">
        <div className="container-x py-14 md:py-20">
          <div className="text-xs uppercase tracking-[0.25em] text-orange flex items-center gap-3">
            <span className="hazard-stripe h-1 w-10 rounded-sm" />
            Каталог
          </div>
          <h1 className="font-display text-4xl md:text-6xl mt-3">Заборы и ворота под ключ</h1>
          <p className="text-white/70 mt-4 max-w-2xl">
            Цены — под ключ: материалы, монтаж, бетонирование. Финальная смета формируется после
            инженерного замера на участке.
          </p>
        </div>
      </section>

      <div className="container-x py-8 sticky top-[68px] md:top-[76px] z-30 bg-background/95 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Chip active={active === "all"} onClick={() => setActive("all")}>
            Все ({PRODUCTS.length})
          </Chip>
          {CATEGORIES_ORDERED.map((c) => (
            <Chip key={c.slug} active={active === c.slug} onClick={() => setActive(c.slug)}>
              {c.title.replace(/^Заборы\s/i, "").replace(/^Забор\s/i, "").replace(/^из\s/i, "")}
            </Chip>
          ))}
        </div>
      </div>

      <section className="container-x pb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <div className="container-x">
        <LeadBlock title="Не нашли подходящего варианта?" subtitle="Сделаем нестандартное решение под ваш участок и бюджет." />
      </div>
      <div className="h-10" />
    </SiteLayout>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
        active
          ? "bg-graphite-deep text-white border-graphite-deep"
          : "bg-card border-border hover:border-orange"
      }`}
    >
      {children}
    </button>
  );
}
