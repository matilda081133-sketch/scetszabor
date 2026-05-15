import { CONTACTS } from "@/lib/site";
import { Send, User } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4 pointer-events-none">
      {/* Telegram Button */}
      <a
        href={CONTACTS.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в Telegram"
        className="pointer-events-auto group relative flex items-center justify-center size-12 rounded-full bg-[#229ED9] text-white shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,158,217,0.5)] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150"
      >
        <Send className="size-5 fill-current" />
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
        aria-label="Связаться с Максом"
        className="pointer-events-auto group relative flex items-center justify-center size-14 rounded-full bg-orange text-graphite-deep shadow-glow-orange hover:scale-110 transition-all duration-300 hover:bg-orange-bright ring-4 ring-orange/20 animate-in fade-in slide-in-from-bottom-6 duration-700"
      >
        <User className="size-6 fill-current" />
        <div className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-2 py-1 rounded bg-graphite-deep/80 backdrop-blur-sm text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 uppercase tracking-wider">
          Связаться с Максом
        </span>
      </a>
    </div>
  );
}

