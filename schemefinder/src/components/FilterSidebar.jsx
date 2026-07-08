import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { states, employmentOptions } from "../data/staticData";
import { categories } from "../data/categories";

const educationLevels = ["Any", "Secondary", "Undergraduate"];
const genderOptions = ["Any", "Male", "Female"];
const typeOptions = ["Any", "Government", "NGO"];

function FilterGroup({ label, children }) {
  return (
    <div className="border-b border-violet-100 py-5 first:pt-0 last:border-none">
      <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-ink/50">{label}</p>
      {children}
    </div>
  );
}

function SelectField({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-field cursor-pointer text-sm"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function FilterSidebar({ filters, setFilters, resultCount }) {
  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const reset = () =>
    setFilters({
      state: "Any",
      category: "Any",
      maxIncome: "Any",
      gender: "Any",
      education: "Any",
      employment: "Any",
      type: "Any",
    });

  const incomeOptions = ["Any", "150000", "250000", "350000", "500000", "1000000"];

  return (
    <aside className="card-surface h-fit p-6 lg:sticky lg:top-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-violet-600" />
          <h3 className="font-display text-sm font-semibold text-ink">Filters</h3>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1 font-display text-xs font-medium text-violet-600 hover:text-violet-800"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>
      <p className="mt-1 font-mono text-xs text-ink/40">{resultCount} schemes found</p>

      <div className="mt-2">
        <FilterGroup label="State">
          <SelectField value={filters.state} onChange={(v) => update("state", v)} options={["Any", ...states]} />
        </FilterGroup>

        <FilterGroup label="Category">
          <SelectField
            value={filters.category}
            onChange={(v) => update("category", v)}
            options={["Any", ...categories.map((c) => c.name)]}
          />
        </FilterGroup>

        <FilterGroup label="Max Annual Income">
          <SelectField
            value={filters.maxIncome}
            onChange={(v) => update("maxIncome", v)}
            options={incomeOptions}
          />
        </FilterGroup>

        <FilterGroup label="Gender">
          <SelectField value={filters.gender} onChange={(v) => update("gender", v)} options={genderOptions} />
        </FilterGroup>

        <FilterGroup label="Education Level">
          <SelectField
            value={filters.education}
            onChange={(v) => update("education", v)}
            options={educationLevels}
          />
        </FilterGroup>

        <FilterGroup label="Employment Status">
          <SelectField
            value={filters.employment}
            onChange={(v) => update("employment", v)}
            options={["Any", ...employmentOptions.map((e) => e.label)]}
          />
        </FilterGroup>

        <FilterGroup label="Scheme Type">
          <div className="flex gap-2">
            {typeOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update("type", opt)}
                className={`flex-1 rounded-full border px-3 py-2 font-display text-xs font-semibold transition-colors ${
                  filters.type === opt
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-violet-100 bg-white text-ink/60 hover:border-violet-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </FilterGroup>
      </div>
    </aside>
  );
}
