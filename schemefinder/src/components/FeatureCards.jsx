import { motion } from "framer-motion";
import { getIcon } from "../utils/iconMap";
import { trustFeatures } from "../data/staticData";

export default function FeatureCards() {
  return (
    <section className="container-page -mt-6 relative z-10 sm:-mt-2">
      <div className="grid gap-5 sm:grid-cols-3">
        {trustFeatures.map((feature, idx) => {
          const Icon = getIcon(feature.icon);
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="card-surface flex items-start gap-4 p-6"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                <Icon size={20} />
              </span>
              <div>
                <h3 className="font-display text-sm font-semibold text-ink">{feature.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/55">{feature.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
