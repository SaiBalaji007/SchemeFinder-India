import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import StepIndicator from "../components/eligibility/StepIndicator";
import PersonalDetailsStep from "../components/eligibility/PersonalDetailsStep";
import LocationStep from "../components/eligibility/LocationStep";
import FamilyStep from "../components/eligibility/FamilyStep";
import EducationStep from "../components/eligibility/EducationStep";
import EmploymentStep from "../components/eligibility/EmploymentStep";
import CommunityStep from "../components/eligibility/CommunityStep";
import SpecialConditionsStep from "../components/eligibility/SpecialConditionsStep";
import EligibilityLoading from "../components/eligibility/EligibilityLoading";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import { useEligibility } from "../context/EligibilityContext";

const stepLabels = [
  "Personal",
  "Location",
  "Family",
  "Education",
  "Employment",
  "Community",
  "Special",
];

const stepComponents = [
  PersonalDetailsStep,
  LocationStep,
  FamilyStep,
  EducationStep,
  EmploymentStep,
  CommunityStep,
  SpecialConditionsStep,
];

const initialData = {
  fullName: "",
  age: "",
  gender: "",
  mobile: "",
  email: "",
  state: "",
  district: "",
  areaType: "",
  income: "",
  familySize: "",
  bplCard: "",
  rationCard: "",
  currentEducation: "",
  isStudent: "",
  institutionName: "",
  employment: "",
  category: "",
  specialConditions: [],
};

export default function EligibilityPage() {
  const navigate = useNavigate();
  const { currentStep, isFirstStep, isLastStep, goNext, goBack } = useMultiStepForm(stepComponents.length);
  const [formData, setFormData] = useState(initialData);
  const [submitting, setSubmitting] = useState(false);
  const { runEligibilityCheck } = useEligibility();

  const update = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const StepComponent = stepComponents[currentStep];

  async function handleSubmit() {
    setSubmitting(true);
    await runEligibilityCheck(formData);
    navigate("/results");
  }

  if (submitting) {
    return (
      <section className="container-page py-16">
        <div className="card-surface mx-auto max-w-2xl">
          <EligibilityLoading />
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="eyebrow">
            <ShieldCheck size={13} /> Secure &amp; Confidential
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Check Your Eligibility
          </h1>
          <p className="mt-2 text-ink/55">
            Answer a few quick questions so we can match you with schemes you truly qualify for.
          </p>
        </div>

        <div className="card-surface mt-10 p-6 sm:p-10">
          <StepIndicator steps={stepLabels} currentStep={currentStep} />

          <div className="mt-8 min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-6 font-display text-lg font-semibold text-ink">
                  {stepLabels[currentStep]} Details
                </p>
                <StepComponent data={formData} update={update} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-violet-100 pt-6">
            <button
              onClick={goBack}
              disabled={isFirstStep}
              className={`btn-ghost ${isFirstStep ? "invisible" : ""}`}
            >
              <ArrowLeft size={16} /> Back
            </button>

            {isLastStep ? (
              <button onClick={handleSubmit} className="btn-primary">
                Find My Schemes
                <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={goNext} className="btn-primary">
                Next
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink/40">
          Step {currentStep + 1} of {stepComponents.length} &mdash; your information is never sold
          or shared.
        </p>
      </div>
    </section>
  );
}
