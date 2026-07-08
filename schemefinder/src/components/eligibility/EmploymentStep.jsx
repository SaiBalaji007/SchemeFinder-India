import { motion } from "framer-motion";
import {
  GraduationCap,
  Frown,
  Building2,
  Landmark,
  Wheat,
  Briefcase,
  Store,
  Armchair,
} from "lucide-react";
import { employmentOptions } from "../../data/staticData";

const icons = {
  student: GraduationCap,
  unemployed: Frown,
  private: Building2,
  government: Landmark,
  farmer: Wheat,
  "self-employed": Briefcase,
  business: Store,
  retired: Armchair,
};

export default function EmploymentStep({ data, update }) {
  return (
    <div>
      <label className="label-field mb-3">
        Employment Status <span className="text-amber-500">*</span>
      </label>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {employmentOptions.map((opt, idx) => {
          const Icon = icons[opt.id] || Briefcase;
          const isActive = data.employment === opt.label;
          return (
            <motion.button
              key={opt.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => update("employment", opt.label)}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                isActive
                  ? "border-violet-600 bg-violet-50 shadow-soft"
                  : "border-violet-100 bg-white hover:border-violet-300"
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  isActive ? "bg-violet-600 text-white" : "bg-violet-50 text-violet-600"
                }`}
              >
                <Icon size={18} />
              </span>
              <span className="font-display text-xs font-semibold text-ink">{opt.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
