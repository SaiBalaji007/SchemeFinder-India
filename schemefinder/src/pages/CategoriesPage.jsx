import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard";

export default function CategoriesPage() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Categories</span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Browse schemes by category
        </h1>
        <p className="mt-3 text-ink/55">
          From scholarships to startup capital &mdash; find the welfare programs organised around
          what matters most to you.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, idx) => (
          <CategoryCard key={category.id} category={category} index={idx} />
        ))}
      </div>
    </section>
  );
}
