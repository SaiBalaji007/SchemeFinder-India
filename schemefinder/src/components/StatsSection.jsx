import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { getIcon } from "../utils/iconMap";
import { statsData } from "../data/staticData";
import { useCountUp } from "../hooks/useCountUp";

function StatItem({ stat, start }) {
  const Icon = getIcon(stat.icon);
  const value = useCountUp(stat.value, { start });

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-saffron">
        <Icon size={20} />
      </span>
      <p className="font-mono text-3xl font-bold text-white sm:text-4xl">
        {value}
        {stat.suffix}
      </p>
      <p className="font-display text-xs font-medium uppercase tracking-wider text-white/50">{stat.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="mt-16 bg-ink py-14">
      <div className="container-page grid grid-cols-2 gap-8 sm:grid-cols-4">
        {statsData.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <StatItem stat={stat} start={isInView} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
