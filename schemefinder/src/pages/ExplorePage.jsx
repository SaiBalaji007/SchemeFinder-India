import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Sparkles } from "lucide-react";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import SchemeCard from "../components/SchemeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSchemes } from "../hooks/useSchemes";
import { useEligibility } from "../context/EligibilityContext";
import { calculateMatchScore } from "../services/schemeService";

const sortOptions = [
  { id: "relevant", label: "Most Relevant" },
  { id: "recent", label: "Recently Added" },
  { id: "deadline", label: "Deadline" },
  { id: "benefits", label: "Highest Benefits" },
];

const defaultFilters = {
  state: "Any",
  category: "Any",
  maxIncome: "Any",
  gender: "Any",
  education: "Any",
  employment: "Any",
  type: "Any",
};

export default function ExplorePage() {
  const location = useLocation();
  const isResultsView = location.pathname === "/results";
  const [searchParams] = useSearchParams();
  const { schemes, loading } = useSchemes();
  const { matchedSchemes, profile, hasProfile } = useEligibility();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState("relevant");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [searchParams]);

  const baseSchemes = useMemo(() => {
    if (isResultsView && matchedSchemes.length) return matchedSchemes;
    if (schemes.length) {
      return schemes.map((s) => ({ ...s, matchScore: calculateMatchScore(s, profile) }));
    }
    return [];
  }, [isResultsView, matchedSchemes, schemes, profile]);

  const filtered = useMemo(() => {
    let list = baseSchemes.filter((scheme) => {
      if (search && !scheme.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filters.state !== "Any" && scheme.state !== "All India" && scheme.state !== filters.state)
        return false;
      if (filters.category !== "Any" && scheme.category !== filters.category) return false;
      if (filters.maxIncome !== "Any" && scheme.incomeLimit > Number(filters.maxIncome)) return false;
      if (filters.gender !== "Any" && scheme.gender !== "Any" && scheme.gender !== filters.gender)
        return false;
      if (filters.education !== "Any" && scheme.education !== "Any" && scheme.education !== filters.education)
        return false;
      if (
        filters.employment !== "Any" &&
        scheme.employment !== "Any" &&
        scheme.employment !== filters.employment
      )
        return false;
      if (filters.type !== "Any" && scheme.type !== filters.type) return false;
      return true;
    });

    switch (sort) {
      case "recent":
        list = [...list].sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "deadline":
        list = [...list].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case "benefits":
        list = [...list].sort((a, b) => b.incomeLimit - a.incomeLimit);
        break;
      default:
        list = [...list].sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));
    }
    return list;
  }, [baseSchemes, search, filters, sort]);

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mb-8">
        {isResultsView && hasProfile ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-surface flex flex-col gap-2 border-violet-200 bg-violet-50/60 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white">
                <Sparkles size={18} />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-ink">
                  Personalized for {profile?.fullName || "you"}
                </p>
                <p className="text-xs text-ink/55">
                  Ranked by eligibility match based on the details you shared.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div>
            <span className="eyebrow">Explore Schemes</span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Browse government &amp; NGO schemes
            </h1>
            <p className="mt-2 max-w-2xl text-ink/55">
              Search and filter through 1000+ curated schemes, or run a personalized eligibility
              check to see your best matches first.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field w-auto cursor-pointer text-sm"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="btn-secondary text-sm lg:hidden"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} setFilters={setFilters} resultCount={filtered.length} />
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="relative h-full w-[85%] max-w-xs overflow-y-auto bg-sand p-4"
            >
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-soft"
              >
                <X size={16} />
              </button>
              <FilterSidebar filters={filters} setFilters={setFilters} resultCount={filtered.length} />
            </motion.div>
          </div>
        )}

        <div>
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size={36} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="card-surface flex flex-col items-center gap-2 p-14 text-center">
              <p className="font-display text-lg font-semibold text-ink">No schemes found</p>
              <p className="max-w-sm text-sm text-ink/55">
                Try adjusting your filters or search term to see more results.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((scheme, idx) => (
                <SchemeCard key={scheme.id} scheme={scheme} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
