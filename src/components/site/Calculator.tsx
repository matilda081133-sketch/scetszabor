import { useMemo, useState, useEffect } from "react";
import { tgLink } from "@/lib/site";
import { client } from "@/lib/sanity/client";
import { Check } from "lucide-react";

type Type = {
  key: string;
  label: string;
  pricePerM: number;
  perUnit?: boolean;
};

const DEFAULT_TYPES: Type[] = [
  { key: "proflist", label: "Профнастил", pricePerM: 2470 },
  { key: "evro-1ryad", label: "Евро Штакетник в 1 ряд", pricePerM: 2770 },
  { key: "evro-shahmatka", label: "Евро Штакетник в 2 ряда", pricePerM: 3730 },
  { key: "evro-gorizont", label: "Евро Штакетник \"горизонт\"", pricePerM: 3290 },
  { key: "gitter", label: "3D Gitter", pricePerM: 1490 },
  { key: "jaluzi", label: "Жалюзи", pricePerM: 4490 },
];

const DEFAULT_HEIGHTS = [
  { v: 1.5, label: "1,5 м", k: 0.9 },
  { v: 1.8, label: "1,8 м", k: 1.0 },
  { v: 2.0, label: "2,0 м", k: 1.12 },
  { v: 2.5, label: "2,5 м", k: 1.32 },
] as const;

type HeightVal = typeof DEFAULT_HEIGHTS[number]["v"];

export function Calculator({ defaultType }: { defaultType?: string } = {}) {
  const [types, setTypes] = useState<Type[]>(DEFAULT_TYPES);
  const [heights, setHeights] = useState<any[]>(DEFAULT_HEIGHTS as any);
  const [typeKey, setTypeKey] = useState(defaultType ?? "evro-1ryad");
  const [length, setLength] = useState(40);
  const [height, setHeight] = useState<HeightVal>(1.8);
  const [screwPiles, setScrewPiles] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await client.fetch('*[_type == "calcSettings"][0]');
        if (data) {
          if (data.prices) {
            const mappedTypes = DEFAULT_TYPES.map(dt => {
              const remote = data.prices.find((p: any) => p.key === dt.key);
              // Use manual labels from user request if remote doesn't have it
              const label = dt.label; 
              return remote ? { ...dt, label, pricePerM: remote.price } : dt;
            });
            setTypes(mappedTypes);
          }
          if (data.heights) {
            setHeights(data.heights);
          }
        }
      } catch (e) {
        console.error("Failed to load calc settings from Sanity", e);
      }
    }
    loadSettings();
  }, []);

  const type = types.find((t) => t.key === typeKey) ?? types[0];
  const isUnit = !!type.perUnit;

  const total = useMemo(() => {
    const heightK = heights.find((h) => h.v === height || h.value === height)?.k ?? 1;
    const basePrice = type.pricePerM + (screwPiles && !isUnit ? 1500 : 0);
    const main = isUnit ? type.pricePerM : basePrice * length * heightK;
    
    return Math.round(main / 100) * 100;
  }, [type, types, heights, length, height, isUnit, screwPiles]);

  return (
    <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
      <div className="hazard-stripe h-2" />
      <div className="p-6 md:p-8 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="grid gap-5">
          <div>
            <div className="text-xs uppercase tracking-widest text-orange mb-2">Тип конструкции</div>
            <div className="grid grid-cols-2 gap-2">
              {types.map((t) => (
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

          {!isUnit && (
            <>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs uppercase tracking-widest text-orange">Длина участка</div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={length} 
                      onChange={(e) => setLength(Math.max(0, Number(e.target.value)))}
                      className="w-16 px-2 py-1 bg-secondary border border-border rounded text-right font-display text-lg focus:outline-none focus:border-orange"
                    />
                    <span className="font-display text-lg">м</span>
                  </div>
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
                <div className="text-xs uppercase tracking-widest text-orange mb-2">
                  Высота забора
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {heights.map((h) => {
                    const hVal = h.v || h.value;
                    return (
                      <button
                        key={hVal}
                        type="button"
                        onClick={() => setHeight(hVal)}
                        className={`px-2 py-2 rounded-md text-sm border transition-colors ${
                          height === hVal
                            ? "bg-graphite-deep text-white border-graphite-deep"
                            : "bg-secondary border-border hover:border-orange"
                        }`}
                      >
                        {h.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div 
                className="flex items-center gap-3 cursor-pointer select-none group mt-1"
                onClick={() => setScrewPiles(!screwPiles)}
              >
                <div className={`size-5 rounded border flex items-center justify-center transition-colors ${
                  screwPiles ? "bg-orange border-orange" : "bg-secondary border-border group-hover:border-orange"
                }`}>
                  {screwPiles && <Check className="size-3.5 text-white stroke-[3px]" />}
                </div>
                <div className="text-sm font-medium">
                  монтаж на винтовые сваи 
                  <span className="text-orange ml-2">+1,5 т.р к метру</span>
                </div>
              </div>
            </>
          )}

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
              href={tgLink(`зафиксировать цену — ${type.label}, высота ${height} м${isUnit ? "" : `, ${length} м`}${screwPiles ? ', на винтовых сваях' : ''}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md btn-yellow btn-shiny px-4 py-3 text-sm text-center"
            >
              Зафиксировать цену
            </a>
            <a
              href={tgLink(`вызов замерщика — ${type.label}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white/10 hover:bg-white/15 text-white px-4 py-3 text-sm font-semibold text-center"
            >
              Вызвать замерщика
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
      <div className="text-[11px] uppercase tracking-widest text-orange mb-2">{label}</div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="size-9 rounded-md bg-secondary border border-border text-lg font-bold hover:border-orange"
          aria-label="Уменьшить"
        >
          −
        </button>
        <div className="flex-1 text-center font-display text-xl">{value}</div>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="size-9 rounded-md bg-secondary border border-border text-lg font-bold hover:border-orange"
          aria-label="Увеличить"
        >
          +
        </button>
      </div>
    </div>
  );
}
