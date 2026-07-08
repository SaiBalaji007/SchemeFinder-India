export const states = [
  "All India",
  "Andhra Pradesh",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

export const employmentOptions = [
  { id: "student", label: "Student" },
  { id: "unemployed", label: "Unemployed" },
  { id: "private", label: "Private Employee" },
  { id: "government", label: "Government Employee" },
  { id: "farmer", label: "Farmer" },
  { id: "self-employed", label: "Self Employed" },
  { id: "business", label: "Business" },
  { id: "retired", label: "Retired" },
];

export const communityOptions = ["General", "OBC", "SC", "ST", "EWS"];

export const specialConditions = [
  { id: "woman", label: "Woman" },
  { id: "senior-citizen", label: "Senior Citizen" },
  { id: "disabled", label: "Disabled" },
  { id: "widow", label: "Widow" },
  { id: "minority", label: "Minority" },
  { id: "startup-founder", label: "Startup Founder" },
  { id: "farmer-condition", label: "Farmer" },
  { id: "ex-serviceman", label: "Ex-Serviceman" },
];

export const rationCardTypes = ["APL", "BPL", "Antyodaya (AAY)", "None"];

export const statsData = [
  { id: "gov", label: "Government Schemes", value: 1200, suffix: "+", icon: "Landmark" },
  { id: "ngo", label: "NGO Schemes", value: 800, suffix: "+", icon: "HeartHandshake" },
  { id: "users", label: "Happy Users", value: 50, suffix: "K+", icon: "Users" },
  { id: "satisfaction", label: "Success Stories", value: 98, suffix: "%", icon: "Star" },
];

export const trustFeatures = [
  {
    id: "trusted",
    title: "Trusted & Verified",
    description: "100% authentic information sourced from official government and NGO portals.",
    icon: "ShieldCheck",
  },
  {
    id: "fast",
    title: "Fast & Easy",
    description: "Find schemes tailored to your profile in under a minute, no paperwork upfront.",
    icon: "Zap",
  },
  {
    id: "secure",
    title: "Secure & Private",
    description: "Your data stays with you. We never sell or share your personal information.",
    icon: "Lock",
  },
];

export const howItWorksSteps = [
  {
    id: 1,
    title: "Share your details",
    description: "Tell us about your income, location, education and employment in a quick guided form.",
    icon: "ClipboardList",
  },
  {
    id: 2,
    title: "We match your profile",
    description: "Our engine compares your profile against 2,000+ scheme eligibility criteria instantly.",
    icon: "SearchCheck",
  },
  {
    id: 3,
    title: "Explore your matches",
    description: "Browse ranked schemes with match scores, benefits and deadlines that fit you.",
    icon: "ListChecks",
  },
  {
    id: 4,
    title: "Apply with confidence",
    description: "Get direct links, required documents and helpline numbers to complete your application.",
    icon: "BadgeCheck",
  },
];

export const faqs = [
  {
    id: "faq-1",
    question: "Is SchemeFinder a government website?",
    answer:
      "No. SchemeFinder is an independent platform that curates and organises information about government and NGO schemes to help you discover what you're eligible for. Always verify final details on the official scheme website before applying.",
  },
  {
    id: "faq-2",
    question: "Do I need to pay to check my eligibility?",
    answer:
      "Checking your eligibility and browsing scheme recommendations on SchemeFinder is completely free. We never charge for eligibility checks or scheme information.",
  },
  {
    id: "faq-3",
    question: "Is my personal information safe?",
    answer:
      "Yes. The details you share are used only to calculate your eligibility match and are not sold or shared with third parties. You can use the platform without creating an account.",
  },
  {
    id: "faq-4",
    question: "How accurate is the eligibility match percentage?",
    answer:
      "Our match score compares your profile against each scheme's published eligibility criteria. It's a strong indicator, but final eligibility is always decided by the issuing government department or NGO.",
  },
  {
    id: "faq-5",
    question: "Can NGOs list their schemes on SchemeFinder?",
    answer:
      "Yes, verified NGOs can reach out to our support team to have their welfare programs listed and discovered by citizens who qualify for them.",
  },
  {
    id: "faq-6",
    question: "How often is scheme information updated?",
    answer:
      "We refresh our scheme database regularly to reflect new launches, updated benefit amounts, and revised deadlines from official sources.",
  },
];
