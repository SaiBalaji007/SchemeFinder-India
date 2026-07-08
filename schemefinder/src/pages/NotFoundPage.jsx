import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 text-violet-700">
        <Compass size={28} />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-ink/55">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <button onClick={() => navigate("/")} className="btn-primary mt-8">
        Back to Home
      </button>
    </div>
  );
}
