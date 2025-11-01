import { ChevronRightIcon } from "lucide-react";

const PROGRESS_STEPS = ["Select Dentist", "Choose Time", "Confirm"];

interface ProgressStepsProps {
  currentStep: number;
}

function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 py-4">
      {PROGRESS_STEPS.map((stepName, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep >= stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={stepNumber} className="flex items-center gap-3">
            {/* step circle */}
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 backdrop-blur-sm ${
                isCompleted
                  ? "bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 text-green-400"
                  : isActive 
                  ? "bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/20" 
                  : "bg-gradient-to-br from-gray-500/10 to-gray-600/5 border border-gray-500/20 text-gray-500"
              }`}
            >
              {stepNumber}
            </div>

            {/* step name */}
            <span 
              className={`text-sm font-medium transition-colors hidden sm:inline ${
                isActive ? "text-white" : "text-gray-500"
              }`}
            >
              {stepName}
            </span>

            {/* arrow (not shown for last step) */}
            {stepNumber < PROGRESS_STEPS.length && (
              <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mx-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressSteps;