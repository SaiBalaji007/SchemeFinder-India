import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getIcon } from "../utils/iconMap";

const toneStyles = {
  violet: "bg-violet-50 text-violet-700 group-hover:bg-violet-600 group-hover:text-white",
  saffron: "bg-amber-50 text-amber-700 group-hover:bg-saffron group-hover:text-white",
  leaf: "bg-emerald-50 text-emerald-700 group-hover:bg-leaf group-hover:text-white",
};

export default function CategoryCard({ category, index = 0 }) {
  const Icon = getIcon(category.icon);
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(`/explore?category=${encodeURIComponent(category.name)}`)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="card-surface group flex flex-col items-start gap-4 p-6 text-left hover:shadow-card-hover"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${toneStyles[category.color]}`}
      >
        <Icon size={22} strokeWidth={2} />
      </span>
      <div>
        <h3 className="font-display text-base font-semibold text-ink">{category.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink/55">{category.description}</p>
      </div>
      <span className="font-mono text-xs font-medium text-violet-600">{category.count} schemes</span>
    </motion.button>
  );
}
