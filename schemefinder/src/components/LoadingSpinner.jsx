export default function LoadingSpinner({ size = 24, className = "" }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-[3px] border-violet-200 border-t-violet-600 ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}
