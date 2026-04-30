import { useMemo, useState } from "react";
import { CONTACTS } from "@/lib/site";

type Type = {
  key: string;
  label: string;
  pricePerM: number;
};

const TYPES: Type[] = [
  { key: "gitter", label: "3D-сетка Gitter", pricePerM: 1490 },
  { key: "proflist", label: "Профлист", pricePerM: 1990 },
  { key: "evro", label: "Евроштакетник", pricePerM: 2290 },
  { key: "shahmatka", label: "Штакетник «шахматка»", pricePerM: 2890 },
  { key: "jaluzi", label: "Жалюзи", pricePerM: 4490 },
  { key: "design", label: "Дизайнерский", pricePerM: 7990 },
];

export function Calculator({ defaultType }: { defaultType?: string } = {}) {
  const [typeKey, setTypeKey] = useState(defaultType ?? "evro");
  const [length, setLength] = useState(40);
  const [height, setHeight] = useState<1.8 | 2.0 | 2.2>(1.8);
  const [gates, setGates] = useState(0);
  const [wicket, setWicket] = useState(1);

  const type = TYPES.find((t) => t.key === typeKey) ?? TYPES[0];

  const total = useMemo(() => {
    const heightK = height === 1.8 ? 1 : height === 2.0 ? 1.12 : 1.22;
    const fence = type.pricePerM * length * heightK;
    const g = gates * 89000;
    const w = wicket * 24000;
    return Math.round((fence + g + w) / 100) * 100;
  }, [type, length, height, gates, wicket]);

  return (
    <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
      <div className="hazard-stripe h-2" />
      <div className="p-6 md:p-8 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="grid gap-5">
          <div>
            <div className="text-xs uppercase tracking-widest text-orange mb-2">Тип забора</div>
            <div className="grid grid-cols-2 gap-2">
              {TYPES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTypeKey(t.key)}
                  className={`text-left px-3 py-2 rounded-md text-sm border transition-colors ${
                    typeKey === t.key
                      ? "bg-graphite-deep text-white border-graphite-deep"
                      : "bg-secondary text-foreground border-border hover:border-orange"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline">
              <div className="text-xs uppercase tracking-widest text-orange">Длина участка</div>
              <div className="font-display text-lg">{length} м</div>
            </div>
            <input
              type="range"
              min={5}
              max={300}
              step={1}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full mt-2 accent-[oklch(0.72_0.19_48)]"
            />
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-orange mb-2">Высота</div>
            <div className="flex gap-2">
              {[1.8, 2.0, 2.2].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHeight(h as 1.8 | 2.0 | 2.2)}
                  className={`flex-1 px-3 py-2 rounded-md text-sm border transition-colors ${
                    height === h
                      ? "bg-graphite-deep text-white border-graphite-deep"
                      : "bg-secondary border-border hover:border-orange"
                  }`}
                >
                  {h.toFixed(1)} м
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <NumberPicker label="Ворота" value={gates} onChange={setGates} max={3} />
            <NumberPicker label="Калитки" value={wicket} onChange={setWicket} max={3} />
          </div>
        </div>

        <div className="bg-graphite-deep text-white rounded-xl p-6 flex flex-col">
          <div className="text-xs uppercase tracking-widest text-orange">Ориентировочно</div>
          <div className="mt-1 font-display text-4xl md:text-5xl leading-none">
            {total.toLocaleString("ru-RU")} <span className="text-lg text-white/60">₽</span>
          </div>
          <p className="mt-3 text-sm text-white/70">
            Цена под ключ: материалы, монтаж, бетонирование. Точный расчёт — после замера инженером.
          </p>
          <div className="mt-auto pt-5 grid gap-2">
            <a
              href={CONTACTS.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-orange text-graphite-deep px-4 py-3 text-sm font-bold text-center"
            >
              Зафиксировать цену в Telegram
            </a>
            <a
              href={CONTACTS.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white/10 hover:bg-white/15 text-white px-4 py-3 text-sm font-semibold text-center"
            >
              Написать в Max
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberPicker({
  label,
  value,
  onChange,
  max,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  max: number;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-orange mb-2">{label}</div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="size-10 rounded-md bg-secondary border border-border text-lg font-bold hover:border-orange"
          aria-label="Уменьшить"
        >
          −
        </button>
        <div className="flex-1 text-center font-display text-2xl">{value}</div>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="size-10 rounded-md bg-secondary border border-border text-lg font-bold hover:border-orange"
          aria-label="Увеличить"
        >
          +
        </button>
      </div>
    </div>
  );
}
