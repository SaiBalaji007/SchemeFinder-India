import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search schemes by name..." }) {
  return (
    <div className="relative w-full">
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/35" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-11 pr-10"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ink/40 hover:bg-violet-50 hover:text-violet-700"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
