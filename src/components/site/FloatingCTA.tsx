import { CONTACTS } from "@/lib/site";
import { Send, MessageCircle } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4 pointer-events-none">
      {/* Telegram Button */}
      <a
        href={CONTACTS.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в Telegram"
        className="pointer-events-auto group relative flex items-center justify-center size-11 rounded-full hover:scale-110 transition-all duration-300 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150 overflow-hidden"
      >
        <img
          src="https://telegram.org/img/t_logo.png"
          width={44}
          height={44}
          alt="Telegram"
          className="w-full h-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://telegram.org/favicon.ico"; }}
        />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-2 py-1 rounded bg-graphite-deep/80 backdrop-blur-sm text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 uppercase tracking-wider">
          Telegram
        </span>
      </a>

      {/* Max Button */}
      <a
        href={CONTACTS.maxUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="MAX"
        className="pointer-events-auto group relative flex items-center justify-center size-11 rounded-full shadow-glow-orange hover:scale-110 transition-all duration-300 ring-4 ring-orange/20 animate-in fade-in slide-in-from-bottom-6 duration-700 overflow-hidden"
      >
        <img
          src="https://max.ru/favicon.png"
          width={44}
          height={44}
          alt="MAX"
          className="w-full h-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://max.ru/favicon.ico"; }}
        />
        <div className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-2 py-1 rounded bg-graphite-deep/80 backdrop-blur-sm text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 uppercase tracking-wider">
          MAX
        </span>
      </a>
    </div>
  );
}

