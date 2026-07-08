export function formatDate(dateString) {
  if (!dateString) return "Rolling basis";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function daysRemaining(dateString) {
  if (!dateString) return null;
  const today = new Date();
  const deadline = new Date(dateString);
  const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  return diff;
}

export function formatCurrency(amount) {
  if (!amount) return "No income limit";
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function truncate(text, maxLength = 120) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
