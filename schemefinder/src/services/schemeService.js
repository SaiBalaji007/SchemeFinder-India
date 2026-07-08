// schemeService.js
// -----------------------------------------------------------------------------
// Talks to the Django backend (SQLite-backed, loaded from the Excel scheme
// sheets). This is the ONLY file that touches the API — every page/component
// still just calls getAllSchemes() / getSchemeById() / checkEligibility() and
// gets back the same shape as before, so nothing else needed to change.
// -----------------------------------------------------------------------------

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

/**
 * The Django Scheme model / Excel sheets don't map 1:1 onto the field names
 * the UI was built against (from the old dummy schemes.json). This adapter
 * converts one Django scheme record into the shape SchemeCard,
 * SchemeDetailsPage, ExplorePage, etc. already expect.
 */
function adaptScheme(s) {
  return {
    id: s.scheme_id,
    name: s.scheme_name,
    type: "Government",
    category: s.category,
    state: s.state,
    incomeLimit: parseIncomeLimit(s.annual_income_limit),
    gender: s.gender === "All" ? "Any" : s.gender,
    education: normalizeAny(s.education_required, "no formal education required"),
    employment: normalizeAny(s.occupation),
    benefits: s.benefits,
    description: s.description,
    documents: splitList(s.required_documents),
    officialWebsite: normalizeUrl(s.official_website),
    deadline: null, // not present in the scheme sheets — UI shows "Rolling basis"
    ministry: s.government_level === "Central" ? "Government of India" : `${s.state} State Government`,
    eligibility: buildEligibilityList(s),
    status: s.status,
    applicationMode: s.application_mode,
  };
}

function parseIncomeLimit(raw) {
  if (!raw) return null;
  const match = String(raw).replace(/,/g, "").match(/\d+/);
  return match ? Number(match[0]) : null;
}

function normalizeAny(value, ...noneHints) {
  if (!value) return "Any";
  const lower = value.toLowerCase();
  if (lower === "all" || lower === "any") return "Any";
  if (noneHints.some((hint) => lower.includes(hint))) return "Any";
  return value;
}

function splitList(text) {
  if (!text) return [];
  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeUrl(url) {
  if (!url) return "#";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function buildEligibilityList(s) {
  const items = [];

  if (s.minimum_age || s.maximum_age) {
    if (s.minimum_age && s.maximum_age) items.push(`Age between ${s.minimum_age} and ${s.maximum_age} years`);
    else if (s.minimum_age) items.push(`Minimum age ${s.minimum_age} years`);
    else items.push(`Maximum age ${s.maximum_age} years`);
  }
  if (s.gender && s.gender !== "All") items.push(`Gender: ${s.gender}`);
  if (s.target_beneficiaries) items.push(s.target_beneficiaries);
  if (s.occupation && s.occupation.toLowerCase() !== "all") items.push(`Occupation: ${s.occupation}`);
  if (s.caste_category && s.caste_category.toLowerCase() !== "all") items.push(`Caste category: ${s.caste_category}`);
  if (s.disability_required && s.disability_required.toLowerCase() !== "no")
    items.push(`Disability requirement: ${s.disability_required}`);
  if (s.annual_income_limit) items.push(`Income limit: ${s.annual_income_limit}`);
  if (s.education_required) items.push(`Education: ${s.education_required}`);

  return items.length ? items : ["See scheme description for eligibility details."];
}

async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch all schemes from the Django API.
 */
export async function getAllSchemes() {
  const data = await apiGet("/schemes/");
  return data.map(adaptScheme);
}

/**
 * Fetch a single scheme by id (scheme_id, e.g. "AGR001").
 */
export async function getSchemeById(id) {
  try {
    const data = await apiGet(`/schemes/${id}/`);
    return adaptScheme(data);
  } catch (err) {
    return null;
  }
}

/**
 * Submit an eligibility profile and return matched schemes with a match score.
 * Scoring still runs on the client against the real scheme data from Django.
 */
export async function checkEligibility(profile) {
  const schemes = await getAllSchemes();

  const matched = schemes.map((scheme) => ({
    ...scheme,
    matchScore: calculateMatchScore(scheme, profile),
  }));

  return matched.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Simple heuristic match score, purely for demo purposes.
 */
export function calculateMatchScore(scheme, profile) {
  if (!profile) return Math.floor(60 + Math.random() * 35);

  let score = 50;
  const weight = 8;

  if (profile.state && (scheme.state === "All India" || scheme.state === profile.state)) score += weight;
  if (profile.gender && (scheme.gender === "Any" || scheme.gender === profile.gender)) score += weight;
  if (profile.employment && (scheme.employment === "Any" || scheme.employment === profile.employment)) score += weight;
  if (profile.income !== undefined && (!scheme.incomeLimit || Number(profile.income) <= scheme.incomeLimit))
    score += weight;
  if (profile.category && scheme.category) score += 4;

  const specialTags = profile.specialConditions || [];
  if (specialTags.includes("woman") && scheme.gender === "Female") score += 6;
  if (specialTags.includes("farmer-condition") && scheme.employment === "Farmer") score += 6;
  if (specialTags.includes("senior-citizen") && scheme.category === "Pension") score += 6;
  if (specialTags.includes("disabled") && scheme.description.toLowerCase().includes("disab")) score += 8;
  if (specialTags.includes("widow") && scheme.description.toLowerCase().includes("widow")) score += 10;
  if (specialTags.includes("startup-founder") && scheme.category === "Startup") score += 8;
  if (specialTags.includes("ex-serviceman") && scheme.ministry.toLowerCase().includes("defence")) score += 10;

  score += Math.floor(Math.random() * 6);

  return Math.min(99, Math.max(38, score));
}
