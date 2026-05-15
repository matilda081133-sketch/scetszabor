import { j as jsxRuntimeExports } from "./sanity-core-D7KvhOfd.js";
import { a as reactExports, o as Check } from "./lucide-02V0d3fb.js";
import { t as tgLink } from "./SiteLayout-Cdr7Xz5s.js";
import { m as client } from "./router-BV1aMPGC.js";
const DEFAULT_TYPES = [
  { key: "vorota-otkatnye", label: "Ворота откатные", pricePerM: 85e3, perUnit: true },
  { key: "vorota-raspashnye", label: "Ворота распашные", pricePerM: 55e3, perUnit: true },
  { key: "kalitka", label: "Калитка", pricePerM: 24e3, perUnit: true },
  { key: "proflist", label: "Профнастил", pricePerM: 2470 },
  { key: "evro-1ryad", label: "Евро Штакетник в 1 ряд", pricePerM: 2770 },
  { key: "evro-shahmatka", label: "Евро Штакетник в 2 ряда", pricePerM: 3730 },
  { key: "evro-gorizont", label: 'Евро Штакетник "горизонт"', pricePerM: 3290 },
  { key: "gitter", label: "3D Gitter", pricePerM: 1490 },
  { key: "jaluzi", label: "Жалюзи", pricePerM: 4490 }
];
const DEFAULT_HEIGHTS = [
  { v: 1.5, label: "1,5 м", k: 0.9 },
  { v: 1.8, label: "1,8 м", k: 1 },
  { v: 2, label: "2,0 м", k: 1.12 },
  { v: 2.5, label: "2,5 м", k: 1.32 }
];
function Calculator({ defaultType } = {}) {
  const [types, setTypes] = reactExports.useState(DEFAULT_TYPES);
  const [heights, setHeights] = reactExports.useState(DEFAULT_HEIGHTS);
  const [typeKey, setTypeKey] = reactExports.useState(defaultType ?? "evro-1ryad");
  const [length, setLength] = reactExports.useState(40);
  const [height, setHeight] = reactExports.useState(1.8);
  const [otkatnye, setOtkatnye] = reactExports.useState(0);
  const [raspashnye, setRaspashnye] = reactExports.useState(0);
  const [wicket, setWicket] = reactExports.useState(1);
  const [screwPiles, setScrewPiles] = reactExports.useState(false);
  reactExports.useEffect(() => {
    async function loadSettings() {
      try {
        const data = await client.fetch('*[_type == "calcSettings"][0]');
        if (data) {
          if (data.prices) {
            const mappedTypes = DEFAULT_TYPES.map((dt) => {
              const remote = data.prices.find((p) => p.key === dt.key);
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
  const total = reactExports.useMemo(() => {
    const heightK = heights.find((h) => h.v === height || h.value === height)?.k ?? 1;
    const basePrice = type.pricePerM + (screwPiles && !isUnit ? 1500 : 0);
    const main = isUnit ? type.pricePerM : basePrice * length * heightK;
    const pOtkat = types.find((t) => t.key === "vorota-otkatnye")?.pricePerM ?? 85e3;
    const pRaspash = types.find((t) => t.key === "vorota-raspashnye")?.pricePerM ?? 55e3;
    const pWicket = types.find((t) => t.key === "kalitka")?.pricePerM ?? 24e3;
    const g1 = otkatnye * pOtkat;
    const g2 = raspashnye * pRaspash;
    const w = wicket * pWicket;
    return Math.round((main + g1 + g2 + w) / 100) * 100;
  }, [type, types, heights, length, height, otkatnye, raspashnye, wicket, isUnit, screwPiles]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border shadow-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hazard-stripe h-2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 grid gap-6 md:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-orange mb-2", children: "Тип конструкции" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: types.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setTypeKey(t.key),
              className: `text-left px-3 py-2 rounded-md text-sm border transition-colors ${typeKey === t.key ? "bg-graphite-deep text-white border-graphite-deep" : "bg-secondary text-foreground border-border hover:border-orange"}`,
              children: t.label
            },
            t.key
          )) })
        ] }),
        !isUnit && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-orange", children: "Длина участка" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    value: length,
                    onChange: (e) => setLength(Math.max(0, Number(e.target.value))),
                    className: "w-16 px-2 py-1 bg-secondary border border-border rounded text-right font-display text-lg focus:outline-none focus:border-orange"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg", children: "м" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: 5,
                max: 300,
                step: 1,
                value: length,
                onChange: (e) => setLength(Number(e.target.value)),
                className: "w-full mt-2 accent-[oklch(0.72_0.19_48)]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-orange mb-2", children: "Высота забора" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: heights.map((h) => {
              const hVal = h.v || h.value;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setHeight(hVal),
                  className: `px-2 py-2 rounded-md text-sm border transition-colors ${height === hVal ? "bg-graphite-deep text-white border-graphite-deep" : "bg-secondary border-border hover:border-orange"}`,
                  children: h.label
                },
                hVal
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 cursor-pointer select-none group mt-1",
              onClick: () => setScrewPiles(!screwPiles),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `size-5 rounded border flex items-center justify-center transition-colors ${screwPiles ? "bg-orange border-orange" : "bg-secondary border-border group-hover:border-orange"}`, children: screwPiles && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5 text-white stroke-[3px]" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium", children: [
                  "монтаж на винтовые сваи",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange ml-2", children: "+1,5 т.р к метру" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NumberPicker, { label: "Откатные", value: otkatnye, onChange: setOtkatnye, max: 3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NumberPicker, { label: "Распашные", value: raspashnye, onChange: setRaspashnye, max: 3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NumberPicker, { label: "Калитки", value: wicket, onChange: setWicket, max: 3 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-graphite-deep text-white rounded-xl p-6 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-orange", children: "Ориентировочно" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 font-display text-4xl md:text-5xl leading-none", children: [
          total.toLocaleString("ru-RU"),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-white/60", children: "₽" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-white/70", children: "Цена под ключ: материалы, монтаж, бетонирование. Точный расчёт — после замера инженером." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-5 grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: tgLink(`зафиксировать цену — ${type.label}, высота ${height} м${isUnit ? "" : `, ${length} м`}${screwPiles ? ", на винтовых сваях" : ""}`),
              target: "_blank",
              rel: "noopener noreferrer",
              className: "rounded-md btn-yellow btn-shiny px-4 py-3 text-sm text-center",
              children: "Зафиксировать цену"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: tgLink(`вызов замерщика — ${type.label}`),
              target: "_blank",
              rel: "noopener noreferrer",
              className: "rounded-md bg-white/10 hover:bg-white/15 text-white px-4 py-3 text-sm font-semibold text-center",
              children: "Вызвать замерщика"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function NumberPicker({
  label,
  value,
  onChange,
  max
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-widest text-orange mb-2", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(Math.max(0, value - 1)),
          className: "size-9 rounded-md bg-secondary border border-border text-lg font-bold hover:border-orange",
          "aria-label": "Уменьшить",
          children: "−"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-center font-display text-xl", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(Math.min(max, value + 1)),
          className: "size-9 rounded-md bg-secondary border border-border text-lg font-bold hover:border-orange",
          "aria-label": "Увеличить",
          children: "+"
        }
      )
    ] })
  ] });
}
export {
  Calculator as C
};
