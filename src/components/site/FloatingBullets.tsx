import {
  ShieldCheck,
  Hammer,
  Camera,
  Ruler,
  Truck,
  CalendarClock,
  Wrench,
  Clock,
  Gem,
  Wind,
  Layers,
  Lock,
  EyeOff,
  Sun,
  Shield,
  ThumbsUp,
  Settings
} from "lucide-react";

export function FloatingBullets({ slug }: { slug: string }) {
  const getBulletsData = () => {
    switch (slug) {
      case "vorota-otkatnye":
        return [
          { title: "ИТАЛИЯ", sub: "Надежная автоматика", icon: <Settings className="w-6 h-6 relative z-10" />, delay: "" },
          { title: "БЕЗ ПРОВИСАНИЙ", sub: "Усиленная балка", icon: <ShieldCheck className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-1" },
          { title: "ГОСТ-ОКРАС", sub: "Защита от коррозии", icon: <Layers className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-2" }
        ];
      case "proflist":
        return [
          { title: "ГОСТ 0.45мм", sub: "Честная толщина", icon: <Ruler className="w-6 h-6 relative z-10" />, delay: "" },
          { title: "ПРИВАТНОСТЬ", sub: "Защита от ветра и глаз", icon: <EyeOff className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-1" },
          { title: "БЕЗ РЖАВЧИНЫ", sub: "Слой оцинковки", icon: <Shield className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-2" }
        ];
      case "evroshtaketnik":
        return [
          { title: "ШАХМАТКА", sub: "Двусторонний окрас", icon: <Layers className="w-6 h-6 relative z-10" />, delay: "" },
          { title: "БРИЗ", sub: "Идеальная продуваемость", icon: <Wind className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-1" },
          { title: "ПРЕМИУМ", sub: "Монтаж по нивелиру", icon: <Gem className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-2" }
        ];
      case "jaluzi":
        return [
          { title: "СТАТУС", sub: "Премиальная приватность", icon: <Gem className="w-6 h-6 relative z-10" />, delay: "" },
          { title: "БЕЗ ПАРНИКА", sub: "Свободная циркуляция", icon: <Wind className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-1" },
          { title: "СКРЫТЫЙ", sub: "Идеальный крепеж", icon: <Lock className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-2" }
        ];
      case "gitter":
        return [
          { title: "АНТИВАНДАЛ", sub: "Сварные панели 3D", icon: <ShieldCheck className="w-6 h-6 relative z-10" />, delay: "" },
          { title: "15 ЛЕТ", sub: "Без подкрасов", icon: <ThumbsUp className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-1" },
          { title: "СВЕТ", sub: "Идеальное пропускание", icon: <Sun className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-2" }
        ];
      case "kalitki":
        return [
          { title: "ВСТРОЕН", sub: "Замок в комплекте", icon: <Lock className="w-6 h-6 relative z-10" />, delay: "" },
          { title: "УСИЛЕНЫ", sub: "Надежные петли", icon: <ShieldCheck className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-1" },
          { title: "ГЕОМЕТРИЯ", sub: "Идеальная сборка", icon: <Ruler className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-2" }
        ];
      case "vorota-raspashnye":
        return [
          { title: "КЛАССИКА", sub: "Проверено временем", icon: <Clock className="w-6 h-6 relative z-10" />, delay: "" },
          { title: "БЕЗ ЛЮФТА", sub: "Усиленные петли", icon: <Wrench className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-1" },
          { title: "АВТОМАТИКА", sub: "По желанию", icon: <Settings className="w-6 h-6 relative z-10" />, delay: "animate-float-delay-2" }
        ];
      case "dizainerskie":
        return [
          {
            title: "3D-Проект",
            sub: "Индивидуальный дизайн",
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=150&q=80",
            delay: ""
          },
          {
            title: "Монолит",
            sub: "Вечный фундамент",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=150&q=80",
            delay: "animate-float-delay-1"
          },
          {
            title: "Премиум",
            sub: "Габионы и кирпич",
            image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=150&q=80",
            delay: "animate-float-delay-2"
          }
        ];
      default:
        return null;
    }
  };

  const bullets = getBulletsData();

  if (!bullets) return null;

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 pointer-events-none z-10">
      {bullets.map((bullet, idx) => (
        <div
          key={idx}
          className={`relative bg-gradient-to-br from-graphite-deep/90 to-graphite-deep/50 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 pr-8 text-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] animate-float w-max flex items-center gap-4 overflow-hidden pointer-events-auto group cursor-default ${
            idx === 1 ? "-ml-12" : idx === 2 ? "ml-8" : ""
          } ${bullet.delay}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:animate-[shiny-sweep_2s_ease-in-out]" />
          
          {bullet.image ? (
            <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(255,165,0,0.15)]">
              <img src={bullet.image} alt={bullet.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-orange/10 mix-blend-color" />
            </div>
          ) : (
            <div className="relative bg-gradient-to-br from-orange/20 to-transparent border border-orange/30 p-3 rounded-xl text-orange shrink-0 shadow-[0_0_15px_rgba(255,165,0,0.15)]">
              <div className="absolute inset-0 bg-orange/20 blur-xl rounded-full" />
              {bullet.icon}
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-white font-display text-[1.35rem] uppercase tracking-[0.05em] leading-none mb-1.5 flex items-center gap-2.5">
              {bullet.title}
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
            </span>
            <span className="text-[13px] text-white/60 font-medium tracking-wide">{bullet.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
