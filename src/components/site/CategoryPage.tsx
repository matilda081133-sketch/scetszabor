import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { Calculator } from "@/components/site/Calculator";
import { SectionHeader } from "@/routes/index";
import { Link } from "@tanstack/react-router";
import { FloatingBullets } from "@/components/site/FloatingBullets";
import { CATEGORIES, productsByCategory, type CategorySlug, PRODUCTS } from "@/lib/catalog";
import { CONTACTS, tgLink } from "@/lib/site";
import {
  ShieldCheck,
  Hammer,
  Camera,
  Ruler,
  Truck,
  CalendarClock,
  Wrench,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  Gem,
} from "lucide-react";
import { useState } from "react";
import { useCMS } from "@/lib/cms";
import { urlFor } from "@/lib/sanity/client";
import { LeadModal } from "@/components/site/LeadModal";

type RalColor = { name: string; ral: string; hex: string };

const RAL_PALETTE: RalColor[] = [
  { name: "Шоколад", ral: "RAL 8017", hex: "#3a2519" },
  { name: "Графит", ral: "RAL 7024", hex: "#2c2c2e" },
  { name: "Зелёный мох", ral: "RAL 6005", hex: "#114232" },
  { name: "Вишня", ral: "RAL 3005", hex: "#651722" },
  { name: "Чёрный", ral: "RAL 9005", hex: "#0d0d0f" },
  { name: "Белый", ral: "RAL 9003", hex: "#f0f0eb" },
  { name: "Светлое дерево", ral: "Принт", hex: "#dcb283" },
  { name: "Тёмное дерево", ral: "Принт", hex: "#5c3a21" },
];

const CATS_WITH_RAL: CategorySlug[] = [
  "proflist",
  "evroshtaketnik",
  "gitter",
  "jaluzi",
  "vorota-otkatnye",
  "vorota-raspashnye",
  "kalitki",
];

export function CategoryPage({
  slug,
  hero,
  variants,
  techPoints,
  calcDefault,
}: {
  slug: CategorySlug;
  hero: string;
  variants: { title: string; img: string; desc: string; href?: string }[];
  techPoints: { title: string; desc: string }[];
  calcDefault?: string;
}) {
  const cat = CATEGORIES[slug];
  const products = productsByCategory(slug);
  const showRal = CATS_WITH_RAL.includes(slug);
  const { getProductContent } = useCMS();
  const cmsData = getProductContent(slug);

  const MARKETING_HEADLINES: Record<string, { title: React.ReactNode, lead: React.ReactNode }> = {
    "vorota-otkatnye": {
      title: <>Установим <span className="text-orange">откатные ворота</span> под ключ <span className="text-orange">до 5 дней</span><br/> с итальянской автоматикой</>,
      lead: "Прочный каркас без провисаний и зимних заклиниваний. Строгий ГОСТ-металл и опытные монтажники."
    },
    "vorota-raspashnye": {
      title: <>Надежные <span className="text-orange">распашные ворота</span> под ключ <span className="text-orange">до 5 дней</span><br/> с усиленными петлями</>,
      lead: "Проверенная классика без люфта. Профессиональный монтаж, опционально с автоматикой."
    },
    "proflist": {
      title: <>Глухие заборы из <span className="text-orange">ГОСТ-профнастила</span> под ключ <span className="text-orange">до 5 дней</span><br/> <span className="text-orange">с гарантией 3 года</span></>,
      lead: <>Полная приватность и защита от ветра без ржавчины. <br className="hidden sm:block"/>Честная толщина металла 0.45 мм.</>
    },
    "evroshtaketnik": {
      title: <>Эстетичный забор из <span className="text-orange">евроштакетника</span> под ключ <span className="text-orange">до 5 дней</span><br/> с идеальной продуваемостью</>,
      lead: <>Двусторонний окрас, монтаж строго по нивелиру. <br className="hidden sm:block"/>Варианты в один ряд, шахматка или премиум горизонталь.</>
    },
    "gitter": {
      title: <>Антивандальные заборы из <span className="text-orange">3D-сетки Gitter</span> под ключ <span className="text-orange">до 5 дней</span><br/> для дачи и промзон</>,
      lead: <>15 лет без подкрасов. Идеальное светопропускание и <br className="hidden sm:block"/>бескомпромиссная надежность сварных панелей.</>
    },
    "jaluzi": {
      title: <>Премиальные <span className="text-orange">заборы-жалюзи</span> под ключ <span className="text-orange">до 5 дней</span><br/> со скрытым крепежом</>,
      lead: "Статусная приватность без «парникового эффекта». Элита загородных ограждений из толстого металла."
    },
    "dizainerskie": {
      title: <>Дизайнерские заборы из <span className="text-orange">кирпича и габионов</span><br/> под ключ <span className="text-orange">до 5 дней</span></>,
      lead: "Архитектурный проект, заливка ленты и вечная гарантия на фундамент. Эксклюзивные решения для вашего дома."
    },
    "kalitki": {
      title: <>Надежная <span className="text-orange">стальная калитка</span> под ключ <span className="text-orange">до 5 дней</span><br/> в едином стиле с забором</>,
      lead: <>Безупречная геометрия, качественная фурнитура. <br className="hidden sm:block"/>Замок и ручка-кноб уже в базовой комплектации.</>
    }
  };

  const marketingData = MARKETING_HEADLINES[slug];
  const displayTitle = marketingData ? marketingData.title : <>{cat.title} <span className="text-orange">с реальной гарантией</span></>;
  const displayLead = marketingData ? marketingData.lead : cat.lead;
  const displayHeroImg = cmsData?.mainImage ? urlFor(cmsData.mainImage).url() : hero;

  return (
    <SiteLayout>
      {/* Hero — левое выравнивание */}
      <section className="relative section-dark overflow-hidden">
        <img
          src={displayHeroImg}
          alt={cat.title}
          width={1280}
          height={960}
          className="absolute inset-0 size-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-deep/90 via-graphite-deep/40 to-transparent" />
        <div className="container-x relative py-20 md:py-28">
          <div className="max-w-5xl text-left">
            <div className="text-xs uppercase tracking-[0.25em] text-orange flex items-center gap-3">
              <span className="hazard-stripe h-1 w-10 rounded-sm" />
              Направление
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mt-3 leading-[1.05] text-balance">
              {displayTitle}
            </h1>
            <p className="text-white/75 text-lg mt-5 max-w-2xl">{displayLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#calc"
                className="rounded-md btn-yellow btn-shiny px-6 py-3.5 shadow-glow-yellow"
              >
                Калькулятор стоимости
              </a>
              <a
                href={tgLink(`консультация — ${cat.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#229ED9] text-white px-6 py-3.5 font-semibold transition-transform hover:-translate-y-0.5 shadow-md flex items-center gap-2"
              >
                Telegram
              </a>
              <a
                href={CONTACTS.maxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-orange text-graphite-deep px-6 py-3.5 font-bold transition-transform hover:-translate-y-0.5 shadow-glow-orange flex items-center gap-2 uppercase"
              >
                <MessageCircle className="size-5" />
                MAX
              </a>
            </div>
          </div>
          <FloatingBullets slug={slug} />
        </div>
      </section>

      {/* Info quick-buttons: Доставка / Сроки / Гарантия / Монтаж */}
      <InfoTabs />

      {/* Variants */}
      {variants.length > 0 && (
        <section className="container-x py-16">
          <SectionHeader kicker="Варианты исполнения" title="Подберите под свой участок" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {variants.map((v) => {
              const card = (
                <div className="group rounded-xl overflow-hidden bg-card border border-border hover:border-orange hover:-translate-y-0.5 transition-all h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={v.img}
                      alt={v.title}
                      loading="lazy"
                      width={1280}
                      height={960}
                      className="size-full object-cover transition-all duration-500 group-hover:opacity-0"
                    />
                    <div className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center px-6 text-center">
                      <div className="font-display text-graphite-deep text-2xl uppercase leading-tight">
                        {v.title}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 text-left">
                    <div className="font-display text-xl">{v.title}</div>
                    <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
                  </div>
                </div>
              );

              return v.href ? (
                <Link key={v.title} to={v.href} className="block">
                  {card}
                </Link>
              ) : (
                <div key={v.title}>{card}</div>
              );
            })}
          </div>
          {/* CTA */}
          <div className="mt-10 rounded-2xl section-dark p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-1/3 hazard-stripe opacity-[0.07] pointer-events-none" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-yellow">Не уверены, какой вариант ваш?</div>
              <div className="font-display text-2xl md:text-3xl text-white mt-1">
                Инженер приедет на замер и подскажет лучшее решение
              </div>
            </div>
            <div className="relative flex flex-wrap gap-3">
              <LeadModal 
                subject={`Вызов инженера — ${cat.title}`}
                title="Бесплатный выезд инженера и точный расчёт сметы"
              >
                <button
                  type="button"
                  className="rounded-md btn-yellow px-6 py-3.5 whitespace-nowrap font-bold text-graphite-deep"
                >
                  Вызвать инженера
                </button>
              </LeadModal>
              <a
                href="#calc"
                className="rounded-md border border-white/25 hover:border-yellow hover:text-yellow px-6 py-3.5 font-semibold transition-colors text-white whitespace-nowrap"
              >
                Калькулятор стоимости
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Tech */}
      <section className="section-graphite text-white py-16">
        <div className="container-x">
          <SectionHeader light kicker="Технология" title="Как мы монтируем" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {techPoints.map((t, i) => (
              <div
                key={t.title}
                className="bg-graphite-deep rounded-xl p-6 border border-white/10 text-left hover:border-yellow/50 transition-colors"
              >
                <div className="font-display text-3xl text-yellow">0{i + 1}</div>
                <div className="font-display text-lg mt-2">{t.title}</div>
                <div className="text-sm text-white/65 mt-2">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RAL palette */}
      {showRal && (
        <section className="container-x py-16">
          <SectionHeader kicker="Цвета" title="Доступные расцветки RAL" />
          <p className="text-muted-foreground mt-3 max-w-2xl text-left">
            Покраска по каталогу RAL с двух сторон. Ниже — самые востребованные. Полный каталог
            (более 200 оттенков) — по запросу.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {RAL_PALETTE.map((c) => (
              <div
                key={c.ral}
                className="group rounded-xl overflow-hidden border border-border bg-card hover:border-orange hover:-translate-y-0.5 transition-all"
              >
                <div
                  className="aspect-[4/3] w-full"
                  style={{ backgroundColor: c.hex }}
                  aria-label={`${c.name} ${c.ral}`}
                />
                <div className="p-3 text-left">
                  <div className="font-semibold text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.ral}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Calc */}
      <section id="calc" className="container-x py-16">
        <SectionHeader kicker="Калькулятор" title="Стоимость за 30 секунд" />
        <div className="mt-10">
          <Calculator defaultType={calcDefault} />
        </div>
      </section>

      {/* Products */}
      <section id="products" className="container-x pb-10">
        <SectionHeader kicker="Каталог" title="Топ позиций каталога" />
        <div
          className={`mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3`}
        >
          {[...PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="container-x py-16">
        <SectionHeader kicker="Преимущества" title="Почему выбирают СПЕЦЗАБОР" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Ruler, t: "Инженер на замер", d: "Перепад высот, грунт, точная смета до договора." },
            { i: Hammer, t: "Сварка по ГОСТ", d: "Полные швы, обработка, антикоррозийное покрытие." },
            { i: Camera, t: "Фотофиксация", d: "Бетонирование, бутование, скрытые узлы — всё на фото." },
            { i: ShieldCheck, t: "Реальная гарантия", d: "Не «номинал в договоре», а сервис, который мы исполняем." },
          ].map((b) => (
            <div
              key={b.t}
              className="rounded-xl p-6 border border-border bg-card text-left hover:border-orange hover:shadow-card transition-all"
            >
              <b.i className="size-7 text-orange" />
              <div className="font-display text-lg mt-3">{b.t}</div>
              <div className="text-sm text-muted-foreground mt-2">{b.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contacts + mini lead form */}
      <ContactsBlock title={cat.title} />
      <div className="h-10" />
    </SiteLayout>
  );
}

function InfoTabs() {
  const [active, setActive] = useState<"delivery" | "terms" | "warranty" | "install">("delivery");
  const tabs = [
    { key: "delivery" as const, icon: Truck, label: "Доставка" },
    { key: "terms" as const, icon: CalendarClock, label: "Сроки" },
    { key: "warranty" as const, icon: ShieldCheck, label: "Гарантия" },
    { key: "install" as const, icon: Wrench, label: "Монтаж" },
  ];
  const content: Record<typeof active, { title: string; body: string; bullets: string[] }> = {
    delivery: {
      title: "Доставка по СПб и Ленобласти",
      body: "Возим материал на свою бригаду — клиент не ловит грузовик отдельно. До 50 км от КАД — бесплатно при заказе под ключ.",
      bullets: ["До 50 км от КАД — бесплатно", "Дальше — 35 ₽/км", "Подъезд согласовываем заранее", "Разгрузка силами бригады"],
    },
    terms: {
      title: "Сроки от замера до сдачи",
      body: "Стандартный участок 30–50 м.п. — до 5 дней с момента подписания договора. Сложные геометрии и ландшафт — обсуждаем индивидуально.",
      bullets: ["Замер — 1 день", "Заготовка металла — 1-2 дня", "Монтаж — 1-2 дня", "Сдача с фотоотчётом"],
    },
    warranty: {
      title: "Гарантия по договору — 3 года",
      body: "Гарантия не «на бумаге»: при провисании ворот, наклоне столба или сколах краски — приезжаем и устраняем за свой счёт.",
      bullets: ["3 года на каркас и сварку", "5 лет на полимерное покрытие", "Сервис в течение 7 дней", "Документы — официально"],
    },
    install: {
      title: "Монтаж под ключ",
      body: "Бетонирование столбов на 1,2 м, бутование при необходимости. ГОСТовая сварка с полным проваром, обработка швов и антикор.",
      bullets: ["Глубина 1,2 м", "Бетон М300", "Сварка по ГОСТ 5264-80", "Грунт + покраска швов"],
    },
  };
  const c = content[active];
  return (
    <section className="container-x -mt-2 md:-mt-6 relative z-10">
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={`flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-wider transition-colors border-r last:border-r-0 border-border ${
                active === t.key
                  ? "bg-graphite-deep text-yellow"
                  : "bg-card text-foreground hover:bg-secondary"
              }`}
            >
              <t.icon className="size-4" />
              <span>{t.label}</span>
            </button>
          ))}
        </div>
        <div className="p-6 md:p-8 grid md:grid-cols-[1.4fr_1fr] gap-6 text-left">
          <div>
            <h3 className="font-display text-2xl">{c.title}</h3>
            <p className="text-muted-foreground mt-2">{c.body}</p>
          </div>
          <ul className="grid gap-2 content-start">
            {c.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 size-1.5 rounded-full bg-orange shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactsBlock({ title }: { title: string }) {
  return (
    <section className="container-x py-16">
      <SectionHeader kicker="Контакты" title="Свяжитесь с нами" />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Info side */}
        <div className="rounded-2xl bg-card border border-border p-6 md:p-8 text-left">
          <h3 className="font-display text-2xl">СПЕЦЗАБОР</h3>
          <p className="text-muted-foreground mt-2">
            Изготовление и монтаж заборов в Санкт-Петербурге и Ленинградской области.
          </p>
          <ul className="mt-6 grid gap-4">
            <ContactRow icon={Phone} label="Телефон" value={CONTACTS.phone} href={CONTACTS.phoneHref} />
            <ContactRow icon={Send} label="Telegram" value={CONTACTS.telegramHandle} href={CONTACTS.telegramUrl} external />
            <ContactRow icon={MessageCircle} label="MAX" value="Написать в MAX" href={CONTACTS.maxUrl} external />
            <ContactRow icon={Mail} label="Email" value={CONTACTS.email} href={`mailto:${CONTACTS.email}`} />
            <ContactRow icon={MapPin} label="Регион" value={CONTACTS.region} />
            <ContactRow icon={Clock} label="Часы работы" value={CONTACTS.workHours} />
          </ul>
        </div>

        {/* Mini form (open, без карты) */}
        <MiniLeadForm subject={title} />
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-forest shrink-0">
        <Icon className="size-5" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
  if (!href) return <li>{inner}</li>;
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block hover:opacity-80 transition-opacity"
      >
        {inner}
      </a>
    </li>
  );
}

function MiniLeadForm({ subject }: { subject: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const BOT_TOKEN = "8986328079:AAGR3IMfBNmllYVpemnxoKZGgJ6A2tahyvQ";
      const CHAT_ID = "1175701496";
      
      const text = `🔥 <b>Новая заявка с сайта!</b>\n\n` +
                   `<b>Тема:</b> ${subject}\n` +
                   `<b>Имя:</b> ${name}\n` +
                   `<b>Телефон:</b> ${phone}\n` +
                   `<b>Комментарий:</b> ${comment || "-"}`;

      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          chat_id: CHAT_ID, 
          text: text,
          parse_mode: "HTML"
        }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setPhone("");
        setComment("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl section-dark p-6 md:p-8 text-left border border-white/10 relative overflow-hidden"
    >
      <div className="absolute inset-y-0 right-0 w-1/2 hazard-stripe opacity-[0.07] pointer-events-none" />
      <div className="relative">
        <div className="text-xs uppercase tracking-widest text-yellow">Быстрая заявка</div>
        <h3 className="font-display text-2xl md:text-3xl mt-2 text-white">
          Оставьте заявку — рассчитаем за 30 минут
        </h3>
        <p className="text-white/65 mt-2 text-sm">
          Без навязчивых звонков. Перезваниваем только по делу.
        </p>
        <div className="mt-5 grid gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            className="w-full rounded-md bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/45 outline-none focus:border-yellow"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Телефон или Telegram"
            className="w-full rounded-md bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/45 outline-none focus:border-yellow"
            required
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Коротко: длина забора, адрес участка"
            rows={3}
            className="w-full rounded-md bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/45 outline-none focus:border-yellow resize-none"
          />
          <button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
            className={`rounded-md px-6 py-3.5 transition-colors ${
              status === "success" ? "bg-green-600 text-white" : "btn-yellow text-graphite-deep"
            }`}
          >
            {status === "loading" ? "Отправка..." : status === "success" ? "Заявка отправлена!" : "Отправить заявку"}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-sm mt-1">Ошибка отправки. Попробуйте еще раз.</p>
          )}
          <p className="text-[10px] text-white/40 leading-tight">
            Нажимая «Отправить», вы даете согласие на обработку персональных данных в соответствии с ФЗ-152 и принимаете условия политики конфиденциальности.
          </p>
        </div>
      </div>
    </form>
  );
}
