import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, Clock, Wallet, FileSignature, Hammer, Snowflake } from "lucide-react";

const ITEMS = [
  {
    icon: Wallet,
    q: "А цена в смете — точно финальная? Не вырастет в процессе?",
    a: "Финальная смета фиксируется в договоре после инженерного замера. Если в процессе всплывают доп. работы (например, скальный грунт) — они согласовываются письменно. Без письменного согласования вы ничего не доплачиваете.",
  },
  {
    icon: ShieldCheck,
    q: "Что входит в гарантию 3 года?",
    a: "Геометрия (забор не повело, ворота не провисли), целостность сварных швов, лакокрасочное покрытие каркаса. Если что-то из этого нарушено — выезжаем и устраняем за свой счёт.",
  },
  {
    icon: Clock,
    q: "Сколько ждать от замера до готового забора?",
    a: "Замер — в течение 1–2 дней. Изготовление и монтаж типового забора 50 м.п. — 5–10 рабочих дней с момента подписания договора. Сложные проекты — обсуждаем сроки отдельно.",
  },
  {
    icon: Snowflake,
    q: "Можно ли ставить забор зимой?",
    a: "Да. Бетонирование ведётся с противоморозными добавками, бутование щебнем — вообще без сезонных ограничений. Зимой обычно дешевле и быстрее — меньше очередь.",
  },
  {
    icon: FileSignature,
    q: "Работаете по договору? С физлицами и юрлицами?",
    a: "Только по договору. С физлицами — договор подряда, с юрлицами — полный пакет с НДС, актами и счёт-фактурами. Безнал, наличные, карта — как удобно.",
  },
  {
    icon: Hammer,
    q: "Что если у меня участок с уклоном или сложный грунт?",
    a: "Инженер на замере фиксирует перепад высот и состав грунта. Под уклон делаем ступенчатую установку секций, под слабый грунт — заглубление столбов или винтовые сваи. Это всё попадает в смету заранее.",
  },
];

export function FAQ() {
  return (
    <section className="container-x py-14 md:py-20">
      <div className="grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <div className="text-xs uppercase tracking-[0.25em] text-orange flex items-center gap-3">
            <span className="hazard-stripe h-1 w-10 rounded-sm" />
            Вопросы и ответы
          </div>
          <h2 className="font-display text-3xl md:text-5xl mt-3 leading-[1.05]">
            Частые сомнения <span className="text-forest">— и честные ответы</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Если вашего вопроса здесь нет — напишите в Telegram, инженер ответит в течение 5 минут.
          </p>
          <div className="mt-6 hidden lg:block">
            <div className="rounded-xl bg-graphite-deep text-white p-5 border-l-4 border-yellow">
              <div className="text-xs uppercase tracking-widest text-yellow">Главное</div>
              <div className="font-display text-xl mt-2">
                Договор, смета, фотофиксация — всё письменно
              </div>
              <p className="text-sm text-white/70 mt-2">
                Никаких устных договорённостей. Условия меняются только подписанным допсоглашением.
              </p>
            </div>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {ITEMS.map((it, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border bg-card rounded-xl mb-3 overflow-hidden data-[state=open]:border-yellow data-[state=open]:shadow-card transition-all"
            >
              <AccordionTrigger className="px-5 py-5 hover:no-underline gap-4 [&>svg]:size-5 [&>svg]:text-forest">
                <div className="flex items-start gap-4 text-left">
                  <span className="size-10 shrink-0 grid place-items-center rounded-lg bg-yellow text-graphite-deep">
                    <it.icon className="size-5" />
                  </span>
                  <span className="font-display text-lg md:text-xl leading-snug pt-1">{it.q}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pl-[76px] text-foreground/80 text-[15px] leading-relaxed">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
