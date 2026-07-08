import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import StatsSection from "../components/StatsSection";
import HowItWorks from "../components/HowItWorks";
import CategoryCard from "../components/CategoryCard";
import FAQAccordion from "../components/FAQAccordion";
import { categories } from "../data/categories";
import { faqs } from "../data/staticData";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Hero />
      <FeatureCards />
      <StatsSection />

      <section className="container-page py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Categories</span>
            <h2 className="section-heading mt-4">Explore schemes by what matters to you</h2>
          </div>
          <button
            onClick={() => navigate("/categories")}
            className="btn-ghost !text-violet-700"
          >
            View all categories <ArrowRight size={15} />
          </button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.slice(0, 5).map((category, idx) => (
            <CategoryCard key={category.id} category={category} index={idx} />
          ))}
        </div>
      </section>

      <HowItWorks />

      <section className="relative overflow-hidden py-4">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-xl2 bg-violet-600 px-8 py-14 text-center sm:px-16"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-violet-500/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-violet-400/30 blur-3xl" />
            <span className="eyebrow relative !border-white/30 !bg-white/10 !text-white">
              <Sparkles size={13} /> 2,000+ Schemes Waiting
            </span>
            <h2 className="relative mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to discover what you qualify for?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-violet-100">
              It takes less than a minute to check your eligibility across government and NGO
              schemes tailored to your profile.
            </p>
            <button
              onClick={() => navigate("/eligibility")}
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-display font-semibold text-violet-700 shadow-card transition-transform hover:-translate-y-0.5"
            >
              Check Your Eligibility
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-heading mt-4">Frequently asked questions</h2>
        </div>
        <div className="mt-10">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
}
