import React from "react";
import { Check } from "lucide-react";

interface StepperProps {
  uploadStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ uploadStep }) => (
  <div className="flex items-center gap-2">
    {[1, 2, 3].map((step) => (
      <div key={step} className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
            uploadStep >= step
              ? "bg-[#23C660] text-white"
              : "bg-[#23C660]/10 text-white/50"
          }`}
        >
          {uploadStep > step ? <Check className="w-4 h-4" /> : step}
        </div>
        {step < 3 && (
          <div
            className={`w-8 h-0.5 ${
              uploadStep > step ? "bg-white" : "bg-white/10"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);
