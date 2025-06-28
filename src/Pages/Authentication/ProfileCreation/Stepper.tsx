import React from "react";

interface StepperProps {
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-8 mt-2 mb-8 w-full max-w-3xl">
      {[1, 2, 3, 4, 5].map((n) => (
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
              {n === 1 && "Basic Pet Info"}
              {n === 2 && "Health Basics"}
              {n === 3 && "Safety & ID"}
              {n === 4 && "Human Info"}
              {n === 5 && "OTP Verification"}
            </span>
          </div>
          {n < 5 && (
            <div className="border-t border-dashed border-[#EBD5BD] flex-1 mt-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper; 