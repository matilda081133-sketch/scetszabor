import { Play, Send, Mic, Camera, Smile, Plus, ChevronLeft, MoreVertical, Star, Video, ExternalLink } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { client, urlFor } from "@/lib/sanity/client";

type Review = {
  name: string;
  message: string;
  product?: string;
  rating?: number;
  date?: string;
  videoUrl?: string;
  source?: 'telegram' | 'avito' | 'site';
  sourceUrl?: string;
  avatarUrl?: string;
};

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await client.fetch(`*[_type == "review"] | order(date desc){
          author,
          text,
          rating,
          date,
          source,
          sourceUrl,
          videoUrl,
          "avatarUrl": avatar.asset->url
        }`);
        
        if (data && data.length > 0) {
          setReviews(data.map((r: any) => ({
            name: r.author,
            message: r.text,
            rating: r.rating,
            date: r.date,
            source: r.source,
            sourceUrl: r.sourceUrl,
            videoUrl: r.videoUrl,
            avatarUrl: r.avatarUrl,
            product: r.source === 'avito' ? "Отзыв с Авито" : (r.source === 'telegram' ? "Отзыв из Telegram" : "Отзыв клиента")
          })));
        }
      } catch (e) {
        console.error("Failed to load reviews from Sanity", e);
      }
    }
    loadReviews();
  }, []);

  return (
    <section id="reviews" className="container-x py-14 md:py-20">
      <div className="text-left">
        <div className="text-xs uppercase tracking-[0.25em] text-orange flex items-center gap-3">
          <span className="hazard-stripe h-1 w-10 rounded-sm" />
          Отзывы клиентов
        </div>
        <h2 className="font-display text-3xl md:text-5xl mt-3 leading-[1.05]">
          Что пишут <span className="text-forest">после сдачи объекта</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Реальные отзывы наших клиентов. Мы работаем честно, и это подтверждают сотни довольных заказчиков.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.length > 0 ? (
          reviews.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-muted-foreground italic">
            Отзывы подгружаются...
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name ? review.name.split(' ').map(n => n[0]).join('').toUpperCase() : "?";
  
  return (
    <figure className="group flex flex-col rounded-2xl bg-card border border-border shadow-card hover:shadow-glow-orange hover:-translate-y-0.5 transition-all overflow-hidden">
      <div className="p-4 bg-secondary/40 flex-1">
        <div className="flex items-center gap-3 mb-4">
          {review.avatarUrl ? (
            <img 
              src={review.avatarUrl} 
              alt={review.name} 
              className="size-10 rounded-full object-cover shrink-0 border border-border"
            />
          ) : (
            <Avatar initials={initials} color="#2b5278" size={40} />
          )}
          <div>
            <div className="font-display text-base leading-tight">{review.name}</div>
            <div className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-1">
              {review.source === 'avito' && <span className="text-green-500 font-bold">Avito</span>}
              {review.source === 'telegram' && <span className="text-blue-400 font-bold">Telegram</span>}
              <span>•</span>
              <span>{review.date || 'Недавно'}</span>
            </div>
          </div>
        </div>

        <div className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {review.message}
        </div>
        
        <div className="mt-5 flex flex-wrap gap-2">
          {review.videoUrl && (
            <a 
              href={review.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-bold text-orange hover:text-orange/80 transition-colors py-1.5 px-3 bg-orange/10 rounded-lg"
            >
              <Video className="size-3.5" />
              Смотреть видео
            </a>
          )}
          
          {review.source === 'avito' && review.sourceUrl && (
            <a 
              href={review.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-bold text-[#00AAFF] hover:opacity-80 transition-opacity py-1.5 px-3 bg-[#00AAFF]/10 rounded-lg"
            >
              <ExternalLink className="size-3.5" />
              Читать на Авито
            </a>
          )}
        </div>
      </div>

      <figcaption className="p-4 border-t border-border flex items-center justify-between gap-3 bg-card">
        <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
          {review.product}
        </div>
        <div className="flex items-center gap-0.5 text-yellow">
          {Array.from({ length: review.rating || 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

function Avatar({
  initials,
  color,
  size,
}: {
  initials: string;
  color: string;
  size: number;
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </span>
  );
}
