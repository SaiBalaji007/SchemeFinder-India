import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Phone,
  FileText,
  CheckCircle2,
  ListOrdered,
  CalendarClock,
  MapPin,
  Landmark,
} from "lucide-react";
import Badge from "../components/Badge";
import EligibilityProgressBar from "../components/EligibilityProgressBar";
import LoadingSpinner from "../components/LoadingSpinner";
import FAQAccordion from "../components/FAQAccordion";
import { getSchemeById, calculateMatchScore } from "../services/schemeService";
import { useEligibility } from "../context/EligibilityContext";
import { formatDate, formatCurrency } from "../utils/helpers";

const dummyApplySteps = [
  "Create your profile on the official scheme portal using your Aadhaar number.",
  "Fill in the application form with your personal, income and category details.",
  "Upload the required documents in the specified format (PDF/JPEG).",
  "Submit the form and note down your application reference number.",
  "Track your application status online or visit the nearest help center.",
];

const dummyFaqs = (name) => [
  {
    id: "d1",
    question: `Who can apply for ${name}?`,
    answer:
      "Anyone meeting the eligibility criteria listed above can apply. Make sure your documents match the stated requirements before submitting your application.",
  },
  {
    id: "d2",
    question: "How long does approval take?",
    answer:
      "Processing time varies by department, but most applications are reviewed within 30-45 working days of submission.",
  },
  {
    id: "d3",
    question: "Can I reapply if rejected?",
    answer:
      "Yes, in most cases you can reapply after addressing the reason for rejection, such as missing documents or incorrect details.",
  },
];

export default function SchemeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const { profile } = useEligibility();

  useEffect(() => {
    let active = true;
    setLoading(true);
    getSchemeById(id).then((data) => {
      if (active) {
        setScheme(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size={36} />
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="font-display text-xl font-semibold text-ink">Scheme not found</p>
        <button onClick={() => navigate("/explore")} className="btn-primary mt-6">
          Back to Explore
        </button>
      </div>
    );
  }

  const matchScore = calculateMatchScore(scheme, profile);

  return (
    <div>
      <div className="border-b border-violet-100 bg-white">
        <div className="container-page py-10">
          <button
            onClick={() => navigate(-1)}
            className="btn-ghost mb-6 !px-0 !text-violet-700 hover:!bg-transparent"
          >
            <ArrowLeft size={16} /> Back to results
          </button>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={scheme.type === "NGO" ? "leaf" : "violet"}>{scheme.type}</Badge>
                <Badge tone="ink">{scheme.category}</Badge>
              </div>
              <h1 className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {scheme.name}
              </h1>
              <p className="mt-3 max-w-2xl text-ink/60">{scheme.description}</p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/55">
                <span className="flex items-center gap-1.5">
                  <Landmark size={14} className="text-violet-500" /> {scheme.ministry}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-violet-500" /> {scheme.state}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarClock size={14} className="text-violet-500" /> Last date: {formatDate(scheme.deadline)}
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-surface flex flex-shrink-0 items-center gap-4 p-5"
            >
              <EligibilityProgressBar percentage={matchScore} size={72} strokeWidth={6} />
              <div>
                <p className="font-display text-sm font-semibold text-ink">Your Match Score</p>
                <p className="text-xs text-ink/50">Based on your latest eligibility check</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <div className="card-surface p-7">
            <h2 className="font-display text-lg font-semibold text-ink">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">
              {scheme.description} This scheme is administered by the {scheme.ministry} and is
              currently open to eligible applicants across {scheme.state === "All India" ? "India" : scheme.state}.
            </p>
          </div>

          <div className="card-surface p-7">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
              <CheckCircle2 size={18} className="text-violet-600" /> Benefits
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">{scheme.benefits}</p>
          </div>

          <div className="card-surface p-7">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
              <ListOrdered size={18} className="text-violet-600" /> Eligibility Criteria
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {scheme.eligibility.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-ink/65">
                  <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-leaf" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface p-7">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
              <FileText size={18} className="text-violet-600" /> Required Documents
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {scheme.documents.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-ink/65">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface p-7">
            <h2 className="font-display text-lg font-semibold text-ink">How to Apply</h2>
            <ol className="mt-4 space-y-4">
              {dummyApplySteps.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-violet-50 font-mono text-xs font-semibold text-violet-700">
                    {idx + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-ink/60">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="mb-5 font-display text-lg font-semibold text-ink">Frequently Asked Questions</h2>
            <FAQAccordion faqs={dummyFaqs(scheme.name)} />
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <div className="card-surface p-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink/50">
              Quick Facts
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/50">Income Limit</dt>
                <dd className="font-medium text-ink">{formatCurrency(scheme.incomeLimit)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">Gender</dt>
                <dd className="font-medium text-ink">{scheme.gender}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">Employment</dt>
                <dd className="font-medium text-ink">{scheme.employment}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">Education</dt>
                <dd className="font-medium text-ink">{scheme.education}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">Last Date</dt>
                <dd className="font-medium text-ink">{formatDate(scheme.deadline)}</dd>
              </div>
            </dl>
          </div>

          <div className="card-surface p-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink/50">
              Get in Touch
            </h3>
            <a
              href={scheme.officialWebsite}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-4 w-full text-sm"
            >
              Official Website
              <ExternalLink size={15} />
            </a>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-3 text-sm text-ink/65">
              <Phone size={15} className="text-violet-600" />
              Helpline: 1800-11-XXXX (Toll Free)
            </div>
          </div>

          <Link to="/explore" className="btn-secondary block w-full text-center text-sm">
            Browse More Schemes
          </Link>
        </aside>
      </div>
    </div>
  );
}
