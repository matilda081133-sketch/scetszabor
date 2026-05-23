import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Calculator } from "@/components/site/Calculator";
import { LeadBlock } from "@/components/site/LeadBlock";
import { CATEGORIES_ORDERED, PRODUCTS } from "@/lib/catalog";
import { tgLink, CONTACTS } from "@/lib/site";
import { ProductCard } from "@/components/site/ProductCard";
import { ShieldCheck, Hammer, Award, Users, Ruler, Camera } from "lucide-react";
import { CountStat } from "@/components/site/CountStat";
import { FAQ } from "@/components/site/FAQ";
import { Reviews } from "@/components/site/Reviews";
import heroImg from "@/assets/hero-fence.jpg";
import { useCMS } from "@/lib/cms";
import { LeadModal } from "@/components/site/LeadModal";
import { Lightbox } from "@/components/site/Lightbox";
import { useState, useEffect } from "react";
import { client, urlFor } from "@/lib/sanity/client";
import evro1 from "@/assets/evro-1.jpg";
import evro2 from "@/assets/evro-2.jpg";
import evro3 from "@/assets/evro-3.jpg";
import gates1 from "@/assets/gates-1.jpg";
import gates2 from "@/assets/gates-2.jpg";
import proflist1 from "@/assets/proflist-1.jpg";
import proflist2 from "@/assets/proflist-2.jpg";
import jaluzi1 from "@/assets/jaluzi-1.jpg";
import jaluzi2 from "@/assets/jaluzi-2.jpg";
import gitter1 from "@/assets/gitter-1.jpg";
import gitter2 from "@/assets/gitter-2.jpg";
import design1 from "@/assets/design-1.jpg";
import design2 from "@/assets/design-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "СПЕЦЗАБОР | Производство и монтаж заборов в Санкт-Петербурге" },
      {
        name: "description",
        content:
          "Производство и монтаж заборов СПЕЦЗАБОР в СПб и Ленобласти: откатные ворота, профнастил, евроштакетник, 3D сетка. Точный расчет в онлайн калькуляторе, ГОСТовая сварка, инженерный замер. Реальная гарантия.",
      },
      { name: "keywords", content: "заборы под ключ, спецзабор, забор спб, установка заборов, откатные ворота, профнастил, евроштакетник, калькулятор забора" },
    ],
    links: [
      { rel: "preload", href: heroImg, as: "image" },
    ],
  }),
  component: HomePage,
});

// Фото всех типов заборов из каталога
const FALLBACK_PHOTOS = [
  { src: evro1,    alt: "Евроштакетник" },
  { src: gates1,   alt: "Откатные ворота" },
  { src: proflist1,alt: "Профнастил" },
  { src: jaluzi1,  alt: "Жалюзи" },
  { src: gitter1,  alt: "3D Gitter" },
  { src: evro2,    alt: "Евроштакетник в 2 ряда" },
  { src: gates2,   alt: "Распашные ворота" },
  { src: proflist2,alt: "Профнастил C21" },
  { src: jaluzi2,  alt: "Жалюзи горизонтальные" },
  { src: gitter2,  alt: "3D Gitter зелёный" },
  { src: evro3,    alt: "Евроштакетник окрашенный" },
];

function HomePage() {
  const { content } = useCMS();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState(FALLBACK_PHOTOS);

  useEffect(() => {
    client.fetch('*[_type == "heroGallery"][0]{photos[]{image, alt}}')
      .then((data: any) => {
        if (data?.photos?.length) {
          const sanityPhotos = data.photos.map((p: any) => ({
            src: urlFor(p.image).width(800).height(500).fit("crop").url(),
            alt: p.alt || "Наша работа",
          }));
          // Combine sanity photos with fallback photos to ensure we have enough unique images
          const combined = [...sanityPhotos, ...FALLBACK_PHOTOS];
          
          // Deduplicate by source to avoid showing same photo twice
          const uniquePhotos = Array.from(new Map(combined.map(item => [item.src, item])).values());
          setGalleryPhotos(uniquePhotos.slice(0, 11)); // We need up to 11 photos for the layout
        }
      })
      .catch(() => {}); // fallback остаётся
  }, []);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex(i => i !== null ? (i - 1 + galleryPhotos.length) % galleryPhotos.length : 0);
  const nextPhoto = () => setLightboxIndex(i => i !== null ? (i + 1) % galleryPhotos.length : 0);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative section-dark min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Забор СПЕЦЗАБОР"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-deep/90 via-graphite-deep/50 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-graphite-deep to-transparent z-10" />
        {/* Ambient Glow Effect */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse z-10" />
        
        <div className="container-x relative py-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 z-20 mt-16 md:mt-0">
          <div className="max-w-3xl">

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-left animate-fade-up max-w-4xl">
              Установим долговечный забор под ключ в СПб и ЛО с гарантией <span className="text-orange">3 года</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg mt-6 max-w-2xl text-left animate-fade-up" style={{ animationDelay: "0.15s" }}>
              Материал строго в соответствии со сметой, собственный автопарк и профессиональный монтаж штатными инженерами. <span className="text-yellow font-semibold">Работаем без предоплаты.</span>
            </p>
            <div className="mt-7 flex flex-wrap gap-4 items-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex gap-3">
                <a href="#calc" className="rounded-md btn-yellow btn-shiny px-6 py-3.5">
                  Калькулятор стоимости забора
                </a>
                <LeadModal subject="Получить консультацию">
                  <button
                    type="button"
                    className="rounded-md border border-white/30 hover:border-yellow hover:text-yellow px-6 py-3.5 font-semibold transition-colors"
                  >
                    Получить консультацию
                  </button>
                </LeadModal>
              </div>
              {/* Avatar Pile Social Proof */}
              <div className="ml-0 md:ml-4 flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full pr-6 pl-2.5 py-2 w-max mt-4 md:mt-0 shadow-lg">
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" loading="lazy" className="w-11 h-11 rounded-full border-[1.5px] border-graphite-deep object-cover" alt="Клиент" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" loading="lazy" className="w-11 h-11 rounded-full border-[1.5px] border-graphite-deep object-cover" alt="Клиент" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" loading="lazy" className="w-11 h-11 rounded-full border-[1.5px] border-graphite-deep object-cover" alt="Клиент" />
                  <div className="w-11 h-11 rounded-full border-[1.5px] border-graphite-deep bg-orange flex items-center justify-center text-[11px] font-bold text-white shadow-inner">+500</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-[15px] font-semibold leading-tight">Довольных клиентов</span>
                  <span className="text-white/70 text-xs leading-tight">в СПб и ЛО</span>
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 max-w-2xl">
              <CountStat value={12} suffix="+" label="лет опыта" />
              <CountStat value={1500} suffix="+" label="заборов сдано" />
              <CountStat value={3} suffix=" года" label="гарантия" />
              <CountStat value={0} suffix=" ₽" label="за замер" />
            </div>
          </div>
          
          {/* Portfolio Widget — мозаика из кружков */}
          <div className="flex w-full max-w-[320px] sm:max-w-[400px] lg:max-w-lg shrink-0 animate-fade-left items-center justify-center mt-12 lg:mt-0">
            <div className="relative w-full aspect-square lg:h-[440px] lg:aspect-auto">

              {/* Фоновое свечение */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange/15 rounded-full blur-[100px] pointer-events-none" />

              {/* Наши работы badge */}
              <div className="absolute -top-6 md:-top-10 left-0 md:left-2 z-30 bg-yellow text-graphite-deep rounded-2xl px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-2 md:gap-3 shadow-[0_10px_40px_-10px_rgba(255,215,0,0.6)] border border-white/20 scale-90 md:scale-100 origin-top-left">
                <div className="flex items-center justify-center bg-graphite-deep/10 rounded-full size-6 md:size-8 shrink-0">
                  <Award className="w-4 h-4 text-graphite-deep" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-xs uppercase tracking-widest">Наши работы</span>
                  <span className="text-[10px] font-semibold opacity-70 mt-1">Реальные объекты</span>
                </div>
              </div>

              {/* Кружки */}
              {([
                { i:0,  x:"8%",   y:"6%",  s:"30%", delay:"0s" },
                { i:1,  x:"50%",  y:"2%",  s:"25%", delay:"0.15s" },
                { i:2,  x:"73%",  y:"15%", s:"22%", delay:"0.3s" },
                { i:3,  x:"3%",   y:"40%", s:"24%", delay:"0.1s" },
                { i:4,  x:"35%",  y:"28%", s:"33%", delay:"0.2s" },
                { i:5,  x:"70%",  y:"44%", s:"23%", delay:"0.35s" },
                { i:6,  x:"12%",  y:"64%", s:"22%", delay:"0.25s" },
                { i:7,  x:"42%",  y:"58%", s:"26%", delay:"0.05s" },
                { i:8,  x:"72%",  y:"66%", s:"20%", delay:"0.4s" },
                { i:9,  x:"25%",  y:"76%", s:"18%", delay:"0.3s" },
                { i:10, x:"57%",  y:"78%", s:"19%", delay:"0.18s" },
              ] as {i:number,x:string,y:string,s:string,delay:string}[]).map(({ i, x, y, s, delay }) => {
                const photo = galleryPhotos[i % galleryPhotos.length];
                return (
                  <button
                    key={i}
                    onClick={() => openLightbox(i % galleryPhotos.length)}
                    className="absolute group z-10"
                    style={{ left: x, top: y, width: s, aspectRatio: "1 / 1" }}
                    aria-label={photo.alt}
                  >
                    <div
                      className="w-full h-full rounded-full overflow-hidden border-[3px] border-white/40 shadow-xl group-hover:border-orange group-hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_28px_rgba(255,140,0,0.6)]"
                      style={{
                        animation: `float ${4 + (i % 3)}s ease-in-out infinite`,
                        animationDelay: delay,
                      }}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                      <span className="bg-graphite-deep/95 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-orange/30 shadow-lg">
                        {photo.alt}
                      </span>
                    </div>
                  </button>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryPhotos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}

      {/* TICKER */}
      <div className="relative bg-graphite-deep border-y border-white/10 py-4 overflow-hidden flex whitespace-nowrap text-[13px] font-semibold tracking-[0.15em] uppercase">
        {/* Edge Fade Masks for premium look */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-graphite-deep to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-graphite-deep to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee flex items-center shrink-0">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0 text-white/70">
              <span className="mx-8 text-orange text-lg opacity-70 animate-pulse">✦</span>
              <span>Работаем по <span className="text-white">договору</span></span>
              <span className="mx-8 text-orange text-lg opacity-70 animate-pulse">✦</span>
              <span>Гарантия на монтаж до <span className="text-orange font-bold">3 лет</span></span>
              <span className="mx-8 text-orange text-lg opacity-70 animate-pulse">✦</span>
              <span><span className="text-white">Бесплатный</span> выезд инженера</span>
              <span className="mx-8 text-orange text-lg opacity-70 animate-pulse">✦</span>
              <span>Без <span className="text-white">скрытых</span> платежей</span>
              <span className="mx-8 text-orange text-lg opacity-70 animate-pulse">✦</span>
              <span>Собственное <span className="text-white">производство</span></span>
              <span className="mx-8 text-orange text-lg opacity-70 animate-pulse">✦</span>
              <span>Только <span className="text-yellow">ГОСТ</span> материалы</span>
            </div>
          ))}
        </div>
      </div>
      {/* DIRECTIONS */}
      <section className="container-x py-14 md:py-16">
        <SectionHeader 
          kicker="Направления" 
          title={<>Решения под любой бюджет и грунт: строим заборы, <span className="text-orange">которые не перекосит</span> после зимы</>} 
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES_ORDERED.map((c) => {
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

      {/* RANDOM PRODUCTS PREVIEW REMOVED */}

      {/* APPROACH */}
      <section className="section-graphite text-white py-14 md:py-16">
        <div className="container-x">
          <SectionHeader light kicker="Бескомпромиссное качество" title={<>Стандарты качества СПЕЦЗАБОР: <span className="text-yellow">надежность на десятилетия</span></>} />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { i: Ruler, t: "Строгий инженерный замер", d: "Без приблизительных расчетов. Инженер выполняет нивелировку участка, изучает перепад высот и рассчитывает ветровые нагрузки." },
              { i: Hammer, t: "Толщина металла по ГОСТ", d: "Мы не экономим на материалах. Используем надежный металл толщиной 0.45-0.5 мм, обеспечивающий долговечность конструкции." },
              { i: Camera, t: "Прозрачная смета без доплат", d: "Итоговая цена фиксируется в договоре. Никаких непредвиденных расходов на материалы, логистику или скрытые работы." },
              { i: ShieldCheck, t: "Реальная гарантия 3 года", d: "Мы несем полную ответственность за результат. В случае провисания ворот или деформации столбов — оперативно устраняем по гарантии." },
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
        <SectionHeader kicker="Калькулятор" title={<>Прозрачная смета онлайн: рассчитайте стоимость <span className="text-orange">без звонков менеджеров</span></>} />
        <div className="mt-8">
          <Calculator />
        </div>
      </section>

      {/* TOP PRODUCTS */}
      <section className="container-x py-14 md:py-16 border-t border-border">
        <SectionHeader kicker="Популярное" title={<>Проверенные решения: выбор <span className="text-orange">сотен домовладельцев</span> в Ленинградской области</>} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(PRODUCTS.filter((p) => p.badge === "Хит" || p.badge === "Премиум").length > 0
            ? PRODUCTS.filter((p) => p.badge === "Хит" || p.badge === "Премиум")
            : PRODUCTS
          ).slice(0, 6).map((p) => (
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
        <SectionHeader kicker="Акции" title={<>Реальная экономия: честные бонусы <span className="text-orange">без мелкого шрифта</span></>} />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <PromoCard icon={Award} title="−10% участникам СВО и пенсионерам" body="Честная скидка по удостоверению. Без ограничений по сумме заказа." cta="Получить скидку" subject="скидка СВО / пенсионерам" />
          <PromoCard icon={Users} title="Реферальная программа" body="Приведите друга — получите 3% от суммы его договора наличными." accent cta="Стать партнёром" subject="реферальная программа" />
          <PromoCard icon={ShieldCheck} title="Подарок при замере" body="3D-эскиз забора и черновая смета — бесплатно при вызове инженера." cta="Вызвать инженера" subject="подарок при замере" />
        </div>
      </section>

      {/* STEPS */}
      <section className="section-graphite text-white py-14 md:py-16 border-t border-border">
        <div className="container-x">
          <SectionHeader light kicker="Процесс" title={<>5 простых шагов к Вашему <span className="text-yellow">новому забору</span></>} />
          
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
            {/* Left side: Steps */}
            <div className="relative space-y-8 before:absolute before:inset-y-6 before:left-6 before:w-px before:bg-white/10">
              {[
                { title: "Уточняем задачу и назначаем замер", desc: "Наш инженер перезванивает за 5 минут, консультирует по материалам и согласовывает удобное время для бесплатного выезда на участок.", badge: "За 5 минут" },
                { title: "Точный замер и выбор схемы", desc: "Измеряем перепады высот, анализируем тип грунта и подбираем оптимальный вид фундамента (сваи, бутование или лента).", badge: "На вашем участке" },
                { title: "Фиксируем цену и сроки в договоре", desc: "Рассчитываем точную до рубля смету. Сумма и сроки строго фиксируются в официальном договоре. Скрытые платежи исключены.", badge: "Строго по договору" },
                { title: "Установка «под ключ»", desc: "Привозим материалы ГОСТ и выполняем профессиональный монтаж по СНиП с соблюдением всех технологий.", badge: "От 1 дня" },
                { title: "Приемка работы и оплата", desc: "Вы проверяете каждый метр готового забора, ворота и калитки. Оплата производится только после вашего полного одобрения.", badge: "Оплата по факту" }
              ].map((step, i) => (
                <div key={i} className="relative flex gap-6 group">
                  <div className="relative shrink-0 flex items-center justify-center size-12 rounded-full bg-graphite text-yellow font-display text-2xl border-2 border-yellow/20 group-hover:border-yellow group-hover:bg-yellow group-hover:text-graphite-deep transition-all duration-300 z-10 shadow-brutal-orange">
                    {i + 1}
                  </div>
                  <div className="pt-0.5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow transition-colors">{step.title}</h3>
                      <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium text-white/60 border border-white/10 group-hover:border-yellow/30 group-hover:text-white/80 transition-colors">
                        {step.badge}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed max-w-md">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side: Creative */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-graphite-deep/80 overflow-hidden shadow-card">
              <div className="relative h-48 lg:h-[220px] shrink-0">
                <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000" alt="Процесс монтажа" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-deep/80 to-transparent" />
              </div>

              <div className="p-6 lg:p-8 flex flex-col justify-center relative">
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-yellow/10 text-yellow text-xs font-semibold rounded-full mb-3 border border-yellow/20">
                    Первый шаг бесплатно
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-3 leading-tight">Начните с вызова <span className="text-yellow">инженера</span></h3>
                  <p className="text-white/70 text-sm mb-6 leading-relaxed">
                    Специалист приедет в удобное время, привезет образцы материалов, 
                    сделает нивелировку участка и составит точную смету, которая не изменится в процессе работы.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                        <Award className="text-orange size-3.5" />
                      </div>
                      <span className="text-sm text-white/90 font-medium">Без навязывания услуг</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                        <Ruler className="text-orange size-3.5" />
                      </div>
                      <span className="text-sm text-white/90 font-medium">Точный расчет</span>
                    </div>
                  </div>

                  <LeadModal subject="Вызвать замерщика — 5 шагов" title="Начать первый шаг: вызов инженера">
                    <button type="button" className="w-full sm:w-auto rounded-md btn-yellow px-8 py-3.5 font-bold text-base inline-flex justify-center items-center gap-2">
                      Вызвать замерщика
                      <span className="text-graphite-deep/60 text-lg leading-none">→</span>
                    </button>
                  </LeadModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-t border-border">
        <Reviews />
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/40">
        <FAQ />
      </section>

      {/* LEAD */}
      <section className="container-x py-14 md:py-16">
        <LeadBlock />
      </section>

      {/* SEO TEXT */}
      <section className="container-x py-14 md:py-16 border-t border-border">
        <div className="max-w-5xl text-left">
          <div className="text-xs uppercase tracking-[0.25em] text-orange flex items-center gap-3 mb-3">
            <span className="hazard-stripe h-1 w-10 rounded-sm" />
            О компании
          </div>
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-8 text-balance max-w-4xl">Производство и установка заборов под ключ в Санкт-Петербурге и ЛО</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-secondary/30 rounded-xl p-6 md:p-8 border-l-4 border-l-yellow shadow-sm">
              <h3 className="text-xl font-display text-foreground mb-4">Наши стандарты качества</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Компания <strong>«СПЕЦЗАБОР»</strong> — это профессиональная <strong>установка забора под ключ</strong> в Ленинградской области и СПб. Мы знаем, что клиентов чаще всего волнует <strong>стоимость установки забора</strong> и скрытые платежи. Поэтому у нас прозрачная <strong>цена за погонный метр</strong>, которая фиксируется в договоре после замера. У нас вы можете надежно <strong>купить забор с установкой</strong>, будучи уверенными в строгом соблюдении ГОСТ: мы используем только качественный металл и правильно бетонируем столбы.
              </p>
            </div>
            
            <div className="bg-secondary/30 rounded-xl p-6 md:p-8 border-l-4 border-l-orange shadow-sm">
              <h3 className="text-xl font-display text-foreground mb-4">Бескомпромиссный монтаж</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                В наш профиль входит <strong>установка забора из профнастила</strong> (профлиста), стильного <strong>евроштакетника</strong>, премиального <strong>забора жалюзи</strong>, а также <strong>установка 3д забора</strong> (сетки Gitter). Помимо ограждения периметра, мы выполняем монтаж калиток и <strong>установку откатных ворот</strong> с автоматикой. Итоговая на <strong>установку забора цена</strong> зависит от типа грунта, метода фиксации (сваи, бутование, лента) и высоты. Оставьте заявку, и инженер рассчитает честную смету до рубля!
              </p>
            </div>
          </div>
        </div>
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
  title: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="text-left">
      <div className="text-xs uppercase tracking-[0.25em] text-orange flex items-center gap-3">
        <span className="hazard-stripe h-1 w-10 rounded-sm" />
        {kicker}
      </div>
      <h2 className={`font-display text-3xl md:text-5xl mt-3 leading-[1.05] text-balance max-w-4xl ${light ? "text-white" : ""}`}>
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
  cta,
  subject,
}: {
  icon: typeof Award;
  title: string;
  body: string;
  accent?: boolean;
  cta: string;
  subject: string;
}) {
  return (
    <div
      className={`rounded-xl p-6 border flex flex-col transition-transform hover:-translate-y-1 ${
        accent
          ? "bg-graphite-deep text-white border-yellow shadow-brutal-orange"
          : "bg-card border-border shadow-card"
      }`}
    >
      <div className={`inline-flex size-12 items-center justify-center rounded-lg ${
        accent ? "bg-yellow text-graphite-deep" : "bg-secondary text-forest"
      }`}>
        <Icon className="size-6" />
      </div>
      <div className={`font-display text-xl mt-4 ${accent ? "text-yellow" : ""}`}>{title}</div>
      <div className={`text-sm mt-2 flex-1 ${accent ? "text-white/85" : "text-muted-foreground"}`}>
        {body}
      </div>
      <LeadModal subject={subject} title="Получить консультацию и закрепить акцию">
        <button
          type="button"
          className={`mt-5 w-full inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-bold transition-colors ${
            accent ? "btn-yellow btn-shiny text-graphite-deep" : "bg-graphite-deep text-white hover:bg-orange hover:text-graphite-deep"
          }`}
        >
          {cta} →
        </button>
      </LeadModal>
    </div>
  );
}
