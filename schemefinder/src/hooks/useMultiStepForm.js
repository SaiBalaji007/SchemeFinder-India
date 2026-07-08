import { useState } from "react";

export function useMultiStepForm(totalSteps) {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  function goNext() {
    setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  function goToStep(step) {
    setCurrentStep(Math.min(Math.max(step, 0), totalSteps - 1));
  }

  return { currentStep, isFirstStep, isLastStep, goNext, goBack, goToStep };
}
