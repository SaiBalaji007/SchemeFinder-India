import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Landmark, MapPin, CalendarClock, ArrowUpRight } from "lucide-react";
import Badge from "./Badge";
import EligibilityProgressBar from "./EligibilityProgressBar";
import { formatDate, truncate, daysRemaining } from "../utils/helpers";

export default function SchemeCard({ scheme, index = 0 }) {
  const navigate = useNavigate();
  const remaining = daysRemaining(scheme.deadline);
  const match = scheme.matchScore ?? 70;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.04 }}
      whileHover={{ y: -6 }}
      className="card-surface group flex h-full flex-col p-6 hover:shadow-card-hover hover:border-violet-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={scheme.type === "NGO" ? "leaf" : "violet"}>{scheme.type}</Badge>
          <Badge tone="ink">{scheme.category}</Badge>
        </div>
        <EligibilityProgressBar percentage={match} size={52} strokeWidth={5} />
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-violet-700">
        {scheme.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/55">{truncate(scheme.description, 110)}</p>

      <div className="mt-4 rounded-xl bg-violet-50/60 px-4 py-3">
        <p className="font-display text-xs font-semibold uppercase tracking-wide text-violet-700">Key Benefit</p>
        <p className="mt-1 text-sm text-ink/70">{truncate(scheme.benefits, 90)}</p>
      </div>

      <div className="mt-4 flex flex-col gap-2 text-xs text-ink/55">
        <div className="flex items-center gap-1.5">
          <Landmark size={14} className="text-violet-500" />
          <span className="truncate">{scheme.ministry}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-violet-500" />
            <span>{scheme.state}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarClock size={14} className="text-violet-500" />
            <span>
              {formatDate(scheme.deadline)}
              {remaining !== null && remaining >= 0 && remaining <= 30 && (
                <span className="ml-1 text-amber-600">({remaining}d left)</span>
              )}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(`/schemes/${scheme.id}`)}
        className="btn-secondary mt-5 w-full text-sm group-hover:border-violet-400 group-hover:bg-violet-600 group-hover:text-white"
      >
        View Details
        <ArrowUpRight size={16} />
      </button>
    </motion.div>
  );
}
