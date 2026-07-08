import { motion } from "framer-motion";
import { SearchCheck } from "lucide-react";

export default function EligibilityLoading() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-violet-100"
        />
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        <SearchCheck size={32} className="text-violet-600" />
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 font-display text-xl font-semibold text-ink"
      >
        Finding Your Eligible Schemes...
      </motion.h3>
      <p className="mt-2 max-w-sm text-sm text-ink/50">
        Comparing your profile against 2,000+ government and NGO scheme criteria to find your best
        matches.
      </p>

      <div className="mt-8 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-violet-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
