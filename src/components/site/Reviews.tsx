import { Play, Send, Mic, Camera, Smile, Plus, ChevronLeft, MoreVertical, Star } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Стилизованные «скриншоты» отзывов из Telegram / iMessage.
 * Свёрстаны на HTML/CSS — текст идеален, читаем.
 * 5 разных стилистик, чтобы каждый отзыв выглядел уникально.
 */

type Review = {
  name: string;
  initials: string;
  avatarColor: string;
  time: string;
  variant: "ios-light" | "tg-dark" | "ios-voice" | "tg-desktop" | "tg-android";
  message: ReactNode;
  product: string;
};

const REVIEWS: Review[] = [
  {
    name: "Андрей М.",
    initials: "А",
    avatarColor: "#f59e0b",
    time: "14:32",
    variant: "ios-light",
    product: "Профлист, 45 м.п.",
    message: (
      <>
        Ребята, спасибо огромное! Забор стоит как влитой, бригада работала чётко,
        всё в срок. Соседи уже спрашивают контакты <span className="not-italic">👍🔥</span>
      </>
    ),
  },
  {
    name: "Елена В.",
    initials: "Е",
    avatarColor: "#ec4899",
    time: "вчера, 18:47",
    variant: "tg-dark",
    product: "Евроштакетник «Шахматка», 60 м",
    message: (
      <>
        Заказывали евроштакетник в шахматку 60 метров. Инженер приехал на замер
        бесплатно, всё посчитал прямо при нас. Поставили за 6 дней, фотоотчёт
        скрытых работ прислали в чат. Качество отличное, рекомендую!
      </>
    ),
  },
  {
    name: "Сергей Иванов",
    initials: "СИ",
    avatarColor: "#3b82f6",
    time: "11:15",
    variant: "ios-voice",
    product: "Откатные ворота 4 м",
    message: (
      <>
        Спасибо за откатные ворота! Автоматика работает идеально, монтаж — высший
        класс <span className="not-italic">🔥</span>
      </>
    ),
  },
  {
    name: "Дмитрий К.",
    initials: "ДК",
    avatarColor: "#10b981",
    time: "сегодня, 09:23",
    variant: "tg-desktop",
    product: "Забор-жалюзи, 80 м.п.",
    message: (
      <>
        Хочу выразить благодарность всей команде СпецЗабор. Делали забор-жалюзи
        80 метров на участке с уклоном. Инженер всё продумал, бригада отработала
        аккуратно, после себя убрали. Гарантия по договору на 3 года — это реально
        редкость сейчас. Однозначно 5 звёзд{" "}
        <span className="not-italic text-yellow-500">★★★★★</span>
      </>
    ),
  },
  {
    name: "Ольга П.",
    initials: "О",
    avatarColor: "#8b5cf6",
    time: "20:04",
    variant: "tg-android",
    product: "3D Gitter, 120 м",
    message: (
      <>
        Ну что сказать… забор-мечта! <span className="not-italic">😍</span>
        <br />
        Ставили 3D Gitter вокруг дачи, 120 метров за 8 дней. Цена честная, без
        сюрпризов в смете. Спасибо!!!
      </>
    ),
  },
];

export function Reviews() {
  return (
    <section className="container-x py-14 md:py-20">
      <div className="text-left">
        <div className="text-xs uppercase tracking-[0.25em] text-orange flex items-center gap-3">
          <span className="hazard-stripe h-1 w-10 rounded-sm" />
          Отзывы клиентов
        </div>
        <h2 className="font-display text-3xl md:text-5xl mt-3 leading-[1.05]">
          Что пишут <span className="text-forest">после сдачи объекта</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Реальные сообщения из Telegram. Имена сокращены для приватности —
          скриншоты оригиналов отправим в чате по запросу.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="group flex flex-col rounded-2xl bg-card border border-border shadow-card hover:shadow-glow-orange hover:-translate-y-0.5 transition-all overflow-hidden">
      {/* Скриншот мессенджера */}
      <div className="p-4 bg-secondary/40">
        <ChatBubble review={review} />
      </div>

      {/* Подпись */}
      <figcaption className="p-5 border-t border-border flex items-center justify-between gap-3">
        <div>
          <div className="font-display text-base">{review.name}</div>
          <div className="text-xs text-muted-foreground">{review.product}</div>
        </div>
        <div className="flex items-center gap-0.5 text-yellow">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

function ChatBubble({ review }: { review: Review }) {
  switch (review.variant) {
    case "ios-light":
      return <IOSLight review={review} />;
    case "tg-dark":
      return <TgDark review={review} />;
    case "ios-voice":
      return <IOSVoice review={review} />;
    case "tg-desktop":
      return <TgDesktop review={review} />;
    case "tg-android":
      return <TgAndroid review={review} />;
  }
}

/* --- iOS светлая (iMessage стиль) --- */
function IOSLight({ review }: { review: Review }) {
  return (
    <div className="rounded-xl bg-white text-[#000] overflow-hidden shadow-sm border border-black/5">
      <div className="px-4 py-2.5 border-b border-black/5 flex items-center gap-2 text-[13px]">
        <ChevronLeft className="size-4 text-[#007aff]" />
        <Avatar initials={review.initials} color={review.avatarColor} size={28} />
        <div className="font-semibold">{review.name}</div>
        <div className="ml-auto text-[#007aff] text-xs">Telegram</div>
      </div>
      <div className="px-4 py-5">
        <div className="text-center text-[11px] text-black/40 mb-2">{review.time}</div>
        <div className="flex">
          <div className="max-w-[85%] bg-[#e9e9eb] text-[15px] leading-snug px-3.5 py-2.5 rounded-2xl rounded-bl-md">
            {review.message}
          </div>
        </div>
      </div>
      <div className="px-4 py-2 border-t border-black/5 flex items-center gap-2">
        <Camera className="size-4 text-black/40" />
        <div className="flex-1 rounded-full border border-black/10 px-3 py-1.5 text-xs text-black/35">
          iMessage
        </div>
        <Mic className="size-4 text-black/40" />
      </div>
    </div>
  );
}

/* --- Telegram тёмная мобильная --- */
function TgDark({ review }: { review: Review }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm bg-[#17212b] text-white">
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2 bg-[#1f2c39]">
        <ChevronLeft className="size-4 text-[#5eb5f7]" />
        <Avatar initials={review.initials} color={review.avatarColor} size={32} />
        <div>
          <div className="font-semibold text-sm">{review.name}</div>
          <div className="text-[10px] text-white/45">был(а) недавно</div>
        </div>
        <MoreVertical className="ml-auto size-4 text-white/45" />
      </div>
      <div className="px-3 py-4">
        <div className="text-center text-[10px] text-white/35 mb-2">{review.time}</div>
        <div className="flex justify-end">
          <div className="max-w-[88%] bg-[#2b5278] text-[13px] leading-snug px-3 py-2 rounded-2xl rounded-br-md">
            {review.message}
            <div className="text-[10px] text-white/55 text-right mt-1">{review.time.split(",").pop()} ✓✓</div>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 border-t border-white/5 flex items-center gap-2 bg-[#1f2c39]">
        <Smile className="size-4 text-white/45" />
        <div className="flex-1 text-xs text-white/30">Сообщение</div>
        <Plus className="size-4 text-white/45" />
        <Mic className="size-4 text-[#5eb5f7]" />
      </div>
    </div>
  );
}

/* --- iOS светлая с голосовым --- */
function IOSVoice({ review }: { review: Review }) {
  return (
    <div className="rounded-xl bg-white text-[#000] overflow-hidden shadow-sm border border-black/5">
      <div className="px-4 py-2.5 border-b border-black/5 flex items-center gap-2">
        <ChevronLeft className="size-4 text-[#007aff]" />
        <div className="flex-1 flex items-center gap-2 justify-center">
          <Avatar initials={review.initials} color={review.avatarColor} size={28} />
          <div className="text-sm font-semibold">{review.name}</div>
        </div>
      </div>
      <div className="px-4 py-5 space-y-2">
        <div className="text-center text-[11px] text-black/40">{review.time}</div>

        {/* Голосовое */}
        <div className="flex">
          <div className="bg-[#e9e9eb] rounded-2xl rounded-bl-md px-3 py-2.5 flex items-center gap-2 max-w-[85%]">
            <button className="size-8 rounded-full bg-[#007aff] grid place-items-center text-white shrink-0">
              <Play className="size-3.5 fill-current" />
            </button>
            <div className="flex items-center gap-[2px] py-1">
              {[6, 12, 8, 16, 10, 14, 18, 9, 13, 7, 15, 11, 6, 14, 8, 12].map((h, i) => (
                <span
                  key={i}
                  className="w-[2px] rounded-full bg-[#007aff]"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            <span className="text-[11px] text-black/55 ml-1">0:42</span>
          </div>
        </div>

        {/* Текст */}
        <div className="flex">
          <div className="max-w-[85%] bg-[#e9e9eb] text-[15px] leading-snug px-3.5 py-2.5 rounded-2xl rounded-bl-md">
            {review.message}
          </div>
        </div>
      </div>
      <div className="px-4 py-2 border-t border-black/5 flex items-center gap-2">
        <Camera className="size-4 text-black/40" />
        <div className="flex-1 rounded-full border border-black/10 px-3 py-1.5 text-xs text-black/35">
          Сообщение
        </div>
        <Mic className="size-4 text-[#007aff]" />
      </div>
    </div>
  );
}

/* --- Telegram Desktop --- */
function TgDesktop({ review }: { review: Review }) {
  return (
    <div className="rounded-xl bg-[#f4f4f5] text-[#000] overflow-hidden shadow-sm border border-black/5">
      <div className="px-4 py-3 bg-white border-b border-black/5 flex items-center gap-3">
        <Avatar initials={review.initials} color={review.avatarColor} size={36} />
        <div>
          <div className="font-semibold text-sm">{review.name}</div>
          <div className="text-[11px] text-black/45">{review.time}</div>
        </div>
        <MoreVertical className="ml-auto size-4 text-black/40" />
      </div>
      <div className="px-4 py-5">
        <div className="flex">
          <div className="max-w-[90%] bg-white text-[13.5px] leading-relaxed px-4 py-3 rounded-2xl rounded-tl-md shadow-sm border border-black/5">
            {review.message}
            <div className="text-[10px] text-black/40 text-right mt-1.5">
              {review.time.split(",").pop()} ✓✓
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-2.5 bg-white border-t border-black/5 flex items-center gap-2">
        <Smile className="size-4 text-black/40" />
        <div className="flex-1 text-xs text-black/30">Написать сообщение…</div>
        <Send className="size-4 text-[#3b82f6]" />
      </div>
    </div>
  );
}

/* --- Telegram Android тёмная --- */
function TgAndroid({ review }: { review: Review }) {
  return (
    <div className="rounded-xl bg-[#0f1620] text-white overflow-hidden shadow-sm">
      <div className="px-4 py-3 bg-[#17212b] flex items-center gap-2">
        <ChevronLeft className="size-4 text-white/70" />
        <Avatar initials={review.initials} color={review.avatarColor} size={32} />
        <div>
          <div className="font-semibold text-sm">{review.name}</div>
          <div className="text-[10px] text-white/45">в сети</div>
        </div>
      </div>
      <div className="px-3 py-4 bg-gradient-to-b from-[#0f1620] to-[#1a2532]">
        <div className="text-center text-[10px] text-white/30 mb-2">{review.time}</div>
        <div className="flex justify-end">
          <div className="max-w-[88%] bg-[#3a6d99] text-[13px] leading-snug px-3 py-2 rounded-2xl rounded-br-md text-white">
            {review.message}
            <div className="text-[10px] text-white/65 text-right mt-1">{review.time} ✓✓</div>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 bg-[#17212b] flex items-center gap-2">
        <Smile className="size-4 text-white/45" />
        <div className="flex-1 text-xs text-white/30">Сообщение</div>
        <Mic className="size-4 text-white/45" />
      </div>
    </div>
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
