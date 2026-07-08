import { classNames } from "../utils/helpers";

const tones = {
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  saffron: "bg-amber-50 text-amber-700 border-amber-200",
  leaf: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ink: "bg-ink/5 text-ink/70 border-ink/10",
  white: "bg-white/15 text-white border-white/25",
};

export default function Badge({ children, tone = "violet", className = "" }) {
  return (
    <span
      className={classNames(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
