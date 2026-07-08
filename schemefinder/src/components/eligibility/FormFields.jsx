import { Check } from "lucide-react";

export function TextField({ label, value, onChange, placeholder, type = "text", required = false }) {
  return (
    <div>
      <label className="label-field">
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
}

export function SelectField({ label, value, onChange, options, required = false }) {
  return (
    <div>
      <label className="label-field">
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input-field cursor-pointer">
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PillGroup({ label, value, onChange, options, required = false }) {
  return (
    <div>
      <label className="label-field">
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const optValue = typeof opt === "string" ? opt : opt.label;
          const isActive = value === optValue;
          return (
            <button
              type="button"
              key={optValue}
              onClick={() => onChange(optValue)}
              className={`rounded-full border px-4 py-2 font-display text-sm font-medium transition-all ${
                isActive
                  ? "border-violet-600 bg-violet-600 text-white shadow-card"
                  : "border-violet-100 bg-white text-ink/60 hover:border-violet-300 hover:text-violet-700"
              }`}
            >
              {optValue}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CheckboxCard({ label, checked, onChange, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
        checked
          ? "border-violet-600 bg-violet-50 shadow-soft"
          : "border-violet-100 bg-white hover:border-violet-300"
      }`}
    >
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          checked ? "border-violet-600 bg-violet-600 text-white" : "border-violet-200 bg-white"
        }`}
      >
        {checked && <Check size={12} strokeWidth={3} />}
      </span>
      {Icon && <Icon size={16} className="text-violet-600" />}
      <span className="font-display text-sm font-medium text-ink">{label}</span>
    </button>
  );
}
