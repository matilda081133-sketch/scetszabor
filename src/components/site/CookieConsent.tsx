import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent-v2");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent-v2", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[999] animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="relative overflow-hidden rounded-2xl bg-graphite-deep shadow-2xl border border-white/10 p-6">
        {/* Decorative stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 hazard-stripe" />
        
        <div className="flex items-start gap-4">
          <div className="size-10 rounded-full bg-orange/20 flex items-center justify-center shrink-0">
            <Cookie className="size-5 text-orange" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-white font-display text-lg leading-tight">Мы используем файлы cookie</h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Это помогает нам улучшать сайт и делать его удобнее для вас. Оставаясь на сайте, вы соглашаетесь с нашей политикой конфиденциальности.
            </p>
            
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleAccept}
                className="btn-yellow px-6 py-2 text-sm font-bold rounded-lg transition-transform active:scale-95"
              >
                Принимаю
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-white/40 hover:text-white/60 text-xs transition-colors"
              >
                Позже
              </button>
            </div>
          </div>

          <button 
            onClick={() => setIsVisible(false)}
            className="text-white/20 hover:text-white/50 transition-colors"
            aria-label="Закрыть"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
