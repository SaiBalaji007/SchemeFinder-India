import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, PlayCircle, GraduationCap, Landmark, HeartHandshake, Sprout } from "lucide-react";

const floatingChips = [
  { icon: GraduationCap, label: "Scholarships", sub: "Education support", position: "top-4 left-2 sm:left-8", delay: 0 },
  { icon: Landmark, label: "Govt. Subsidies", sub: "Grants for growth", position: "top-40 -left-2 sm:left-0", delay: 0.6 },
  { icon: HeartHandshake, label: "Women Welfare", sub: "Empowering society", position: "top-8 right-0 sm:right-4", delay: 1.2 },
  { icon: Sprout, label: "NGO Support", sub: "Help that cares", position: "bottom-6 right-2 sm:right-10", delay: 1.8 },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-grain bg-[length:20px_20px] opacity-40" />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-violet-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] h-[320px] w-[320px] rounded-full bg-amber-100/50 blur-3xl" />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">
            <span className="tricolor-rule !w-4" /> Your Eligibility, Your Benefits
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Find Government &amp; NGO Schemes{" "}
            <span className="relative inline-block text-violet-600">
              That Fit You
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="10"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
              >
                <path d="M0 6 Q 50 -2 100 6 T 200 6" stroke="#F5A524" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/60 sm:text-lg">
            Discover 2,000+ government and NGO schemes tailored to your income, location, and
            background &mdash; matched to your profile in just a few clicks.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={() => navigate("/eligibility")} className="btn-primary">
              Check Your Eligibility
              <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate("/explore")} className="btn-secondary">
              <PlayCircle size={18} />
              Explore Schemes
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto flex h-[380px] w-full max-w-md items-center justify-center sm:h-[440px]"
        >
          <div className="absolute h-72 w-72 rounded-full bg-gradient-to-br from-violet-200 via-violet-100 to-amber-50 sm:h-80 sm:w-80" />

          <div className="relative z-10 flex h-52 w-52 flex-col items-center justify-center rounded-full border-8 border-white bg-white shadow-glow sm:h-60 sm:w-60">
            <svg viewBox="0 0 120 120" className="absolute h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#EDE7FD" strokeWidth="10" />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#7C4DE3"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * 0.13 }}
                transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
              />
            </svg>
            <span className="font-display text-4xl font-bold text-violet-700">87%</span>
            <span className="font-display text-xs font-medium uppercase tracking-wide text-ink/45">
              Eligibility Match
            </span>
          </div>

          {floatingChips.map(({ icon: Icon, label, sub, position, delay }) => (
            <motion.div
              key={label}
              className={`glass-panel absolute ${position} flex w-40 items-start gap-2 rounded-xl2 p-3 shadow-soft animate-floaty`}
              style={{ animationDelay: `${delay}s` }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + delay * 0.15 }}
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white">
                <Icon size={15} />
              </span>
              <div>
                <p className="font-display text-xs font-semibold text-ink">{label}</p>
                <p className="text-[11px] leading-tight text-ink/50">{sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
