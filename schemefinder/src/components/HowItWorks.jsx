import { motion } from "framer-motion";
import { getIcon } from "../utils/iconMap";
import { howItWorksSteps } from "../data/staticData";

export default function HowItWorks() {
  return (
    <section className="container-page py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">How It Works</span>
        <h2 className="section-heading mt-4">From your profile to your schemes in four steps</h2>
        <p className="mt-3 text-ink/55">
          A simple, guided journey &mdash; no jargon, no confusing forms, just a clear path to what
          you qualify for.
        </p>
      </div>

      <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-violet-100 lg:block" />
        {howItWorksSteps.map((step, idx) => {
          const Icon = getIcon(step.icon);
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="relative flex flex-col items-start"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-card">
                <Icon size={20} />
              </div>
              <span className="mt-4 font-mono text-xs font-semibold text-violet-400">
                Step {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-display text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
