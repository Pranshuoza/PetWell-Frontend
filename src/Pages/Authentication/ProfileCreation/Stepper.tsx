import React from "react";

interface StepperProps {
  currentStep: number;
  steps?: string[];
}

const defaultSteps = [
  "Basic Pet Info",
  "Health Basics", 
  "Safety & ID",
  "Human Info",
  "OTP Verification",
];

const Stepper: React.FC<StepperProps> = ({ currentStep, steps = defaultSteps }) => {
  return (
    <div className="flex items-center justify-center gap-8 mt-2 mb-8 w-full max-w-3xl">
      {steps.map((label, idx) => {
        const n = idx + 1;
        return (
          <React.Fragment key={n}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full border-2 border-[#EBD5BD] flex items-center justify-center font-bold ${
                  currentStep === n || currentStep > n
                    ? "text-[#1C232E] bg-[#EBD5BD]"
                    : "text-[#EBD5BD] bg-transparent"
                }`}
              >
                {n}
              </div>
              <span
                className={`mt-2 text-xs text-[#EBD5BD]${
                  currentStep === n ? " font-semibold" : ""
                }`}
              >
                {label}
              </span>
            </div>
            {n < steps.length && (
              <div className="border-t border-dashed border-[#EBD5BD] flex-1 mt-4"></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper; 