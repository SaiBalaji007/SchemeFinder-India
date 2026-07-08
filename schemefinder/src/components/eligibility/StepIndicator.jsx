import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="hidden items-center gap-1 sm:flex">
      {steps.map((step, idx) => {
        const isDone = idx < currentStep;
        const isCurrent = idx === currentStep;
        return (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  backgroundColor: isDone || isCurrent ? "#6B32D6" : "#EDE7FD",
                  color: isDone || isCurrent ? "#ffffff" : "#3A1876",
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full font-display text-xs font-semibold"
              >
                {isDone ? <Check size={14} /> : idx + 1}
              </motion.div>
              <span
                className={`hidden text-center font-display text-[10px] font-medium leading-tight lg:block ${
                  isCurrent ? "text-violet-700" : "text-ink/40"
                }`}
                style={{ maxWidth: 68 }}
              >
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className="mx-1 h-0.5 flex-1 rounded-full bg-violet-100">
                <motion.div
                  className="h-0.5 rounded-full bg-violet-600"
                  initial={{ width: "0%" }}
                  animate={{ width: isDone ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
