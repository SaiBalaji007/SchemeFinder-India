import { useEffect, useState } from "react";
import { getAllSchemes } from "../services/schemeService";

export function useSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    getAllSchemes()
      .then((data) => {
        if (active) setSchemes(data);
      })
      .catch((err) => {
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { schemes, loading, error };
}
