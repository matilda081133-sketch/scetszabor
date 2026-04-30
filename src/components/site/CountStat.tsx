import { useCountUp, useInView } from "@/hooks/useCountUp";

export function CountStat({
  value,
  suffix = "",
  prefix = "",
  label,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const n = useCountUp(value, 1800, inView);
  const display = decimals > 0 ? n.toFixed(decimals) : Math.floor(n).toLocaleString("ru-RU");
  return (
    <div ref={ref} className="text-left">
      <div className="font-display text-3xl md:text-4xl text-yellow tabular-nums">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="text-xs text-white/65 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}
