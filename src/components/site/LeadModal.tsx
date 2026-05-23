import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

export function LeadModal({ 
  children, 
  subject,
  title
}: { 
  children: React.ReactNode;
  subject: string;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("Звонок");
  const [agreed, setAgreed] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setStatus("loading");
    setErrorMessage("");
    
    try {
      const BOT_TOKEN = "8986328079:AAGR3IMfBNmllYVpemnxoKZGgJ6A2tahyvQ";
      const CHAT_ID = "1175701496";
      
      const text = `🔥 <b>Новая заявка с сайта!</b>\n\n` +
                   `<b>Тема:</b> ${subject}\n` +
                   `<b>Имя:</b> ${name}\n` +
                   `<b>Телефон:</b> ${phone}\n` +
                   `<b>Способ связи:</b> ${method}`;

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
        setTimeout(() => {
          setOpen(false);
          setStatus("idle");
          setName("");
          setPhone("");
        }, 3000);
      } else {
        setStatus("error");
        try {
          const data = await res.json();
          setErrorMessage(data?.error || "Ошибка на сервере");
        } catch {
          setErrorMessage(`Ошибка сервера: ${res.status}`);
        }
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Сетевая ошибка");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-graphite-deep border-border/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl mb-2 text-center text-yellow">
            {title || subject}
          </DialogTitle>
        </DialogHeader>
        
        {status === "success" ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="size-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Check className="size-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold">Заявка отправлена!</h3>
            <p className="text-white/60 mt-2">Наш инженер свяжется с вами в ближайшее время.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <div>
              <label className="text-xs text-white/60 uppercase tracking-widest mb-1.5 block">Ваше имя</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                className="w-full rounded-md bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/45 outline-none focus:border-yellow"
                required
              />
            </div>
            
            <div>
              <label className="text-xs text-white/60 uppercase tracking-widest mb-1.5 block">Номер телефона</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 000-00-00"
                className="w-full rounded-md bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/45 outline-none focus:border-yellow"
                required
              />
            </div>

            <div>
              <label className="text-xs text-white/60 uppercase tracking-widest mb-1.5 block">Удобный способ связи</label>
              <div className="grid grid-cols-3 gap-2">
                {["Звонок", "WhatsApp", "Telegram"].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`py-2 px-1 text-sm rounded-md transition-colors border ${
                      method === m 
                        ? "border-yellow text-yellow bg-yellow/10" 
                        : "border-white/15 text-white/60 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex gap-3 items-start cursor-pointer mt-2 group">
              <div className={`mt-0.5 shrink-0 size-4 rounded flex items-center justify-center border transition-colors ${
                agreed ? "bg-yellow border-yellow" : "border-white/30 group-hover:border-white/50"
              }`}>
                {agreed && <Check className="size-3 text-graphite-deep" strokeWidth={3} />}
              </div>
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                className="sr-only" 
              />
              <span className="text-[11px] text-white/40 leading-tight">
                Нажимая на кнопку, вы даете согласие на обработку персональных данных в соответствии с ФЗ-152 и принимаете политику конфиденциальности.
              </span>
            </label>

            <button 
              type="submit"
              disabled={status === "loading" || !agreed}
              className="mt-2 w-full rounded-md btn-yellow text-graphite-deep font-bold py-3.5 transition-transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none"
            >
              {status === "loading" ? "Отправка..." : "Отправить заявку"}
            </button>
            
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">
                {errorMessage || "Ошибка отправки. Попробуйте еще раз."}
              </p>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
