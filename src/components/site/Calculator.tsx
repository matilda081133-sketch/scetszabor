import { useMemo, useState } from "react";
import { tgLink } from "@/lib/site";

type Type = {
  key: string;
  label: string;
  /** Базовая цена за м.п. при высоте 1,8 м (для заборов) */
  pricePerM: number;
  /** Если true — изделие, цена за штуку, высота не масштабируется */
  perUnit?: boolean;
};

const TYPES: Type[] = [
  // Изделия
  { key: "vorota-otkatnye", label: "Ворота откатные", pricePerM: 85000, perUnit: true },
  { key: "vorota-raspashnye", label: "Ворота распашные", pricePerM: 55000, perUnit: true },
  { key: "kalitka", label: "Калитка", pricePerM: 24000, perUnit: true },
  // Заборы
  { key: "proflist", label: "Профлист", pricePerM: 2470 },
  { key: "evro-1ryad", label: "Евроштакетник в 1 ряд", pricePerM: 2770 },
  { key: "evro-shahmatka", label: "Шахматка (2 ряда)", pricePerM: 3730 },
  { key: "evro-gorizont", label: "Евроштакетник горизонталь", pricePerM: 3290 },
  { key: "gitter", label: "3D Gitter", pricePerM: 1490 },
  { key: "jaluzi", label: "Жалюзи", pricePerM: 4490 },
];

const HEIGHTS = [
  { v: 1.5, label: "1,5 м", k: 0.9 },
  { v: 1.8, label: "1,8 м", k: 1.0 },
  { v: 2.0, label: "2,0 м", k: 1.12 },
  { v: 2.5, label: "2,5 м", k: 1.32 },
] as const;

type HeightVal = typeof HEIGHTS[number]["v"];

export function Calculator({ defaultType }: { defaultType?: string } = {}) {
  const [typeKey, setTypeKey] = useState(defaultType ?? "evro-1ryad");
  const [length, setLength] = useState(40);
  const [height, setHeight] = useState<HeightVal>(1.8);
  const [otkatnye, setOtkatnye] = useState(0);
  const [raspashnye, setRaspashnye] = useState(0);
  const [wicket, setWicket] = useState(1);

  const type = TYPES.find((t) => t.key === typeKey) ?? TYPES[0];
  const isUnit = !!type.perUnit;

  const total = useMemo(() => {
    const heightK = HEIGHTS.find((h) => h.v === height)?.k ?? 1;
    const main = isUnit ? type.pricePerM : type.pricePerM * length * heightK;
    const g1 = otkatnye * 85000;
    const g2 = raspashnye * 55000;
    const w = wicket * 24000;
    return Math.round((main + g1 + g2 + w) / 100) * 100;
  }, [type, length, height, otkatnye, raspashnye, wicket, isUnit]);

  return (
    <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
      <div className="hazard-stripe h-2" />
      <div className="p-6 md:p-8 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="grid gap-5">
          <div>
            <div className="text-xs uppercase tracking-widest text-orange mb-2">Тип конструкции</div>
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

          {!isUnit && (
            <>
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
                <div className="text-xs uppercase tracking-widest text-orange mb-2">
                  Высота забора
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {HEIGHTS.map((h) => (
                    <button
                      key={h.v}
                      type="button"
                      onClick={() => setHeight(h.v)}
                      className={`px-2 py-2 rounded-md text-sm border transition-colors ${
                        height === h.v
                          ? "bg-graphite-deep text-white border-graphite-deep"
                          : "bg-secondary border-border hover:border-orange"
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-3 gap-3">
            <NumberPicker label="Откатные" value={otkatnye} onChange={setOtkatnye} max={3} />
            <NumberPicker label="Распашные" value={raspashnye} onChange={setRaspashnye} max={3} />
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
              href={tgLink(`зафиксировать цену — ${type.label}, высота ${height} м${isUnit ? "" : `, ${length} м`}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md btn-yellow px-4 py-3 text-sm text-center"
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
