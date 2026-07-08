import { createContext, useContext, useState, useCallback } from "react";
import { checkEligibility } from "../services/schemeService";

const EligibilityContext = createContext(null);

export function EligibilityProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [matchedSchemes, setMatchedSchemes] = useState([]);
  const [isChecking, setIsChecking] = useState(false);

  const runEligibilityCheck = useCallback(async (formData) => {
    setIsChecking(true);
    setProfile(formData);
    const results = await checkEligibility(formData);
    setMatchedSchemes(results);
    setIsChecking(false);
    return results;
  }, []);

  return (
    <EligibilityContext.Provider
      value={{ profile, matchedSchemes, isChecking, runEligibilityCheck, hasProfile: !!profile }}
    >
      {children}
    </EligibilityContext.Provider>
  );
}

export function useEligibility() {
  const ctx = useContext(EligibilityContext);
  if (!ctx) throw new Error("useEligibility must be used within EligibilityProvider");
  return ctx;
}
