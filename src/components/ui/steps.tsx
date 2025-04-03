
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepsProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

interface StepProps {
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
  stepNumber?: number;
}

export const Steps = ({ currentStep, totalSteps, children }: StepsProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {React.Children.map(children, (child, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          // Clone the child element and add props
          return React.cloneElement(child as React.ReactElement<StepProps>, {
            isActive,
            isCompleted,
            stepNumber,
          });
        })}
      </div>
    </div>
  );
};

export const Step = ({ 
  title, 
  isActive = false, 
  isCompleted = false, 
  stepNumber = 1 
}: StepProps) => {
  return (
    <div className="flex-1">
      <div className="flex items-center">
        {stepNumber > 1 && (
          <div 
            className={cn(
              "h-1 flex-1", 
              isCompleted || isActive ? "bg-purple-600" : "bg-gray-200"
            )} 
          />
        )}
        
        <div className="relative">
          <div 
            className={cn(
              "rounded-full flex items-center justify-center w-8 h-8 border-2",
              isActive && "border-purple-600 text-purple-600",
              isCompleted && "bg-purple-600 border-purple-600",
              !isActive && !isCompleted && "border-gray-300 text-gray-400"
            )}
          >
            {isCompleted ? (
              <Check className="h-4 w-4 text-white" />
            ) : (
              <span>{stepNumber}</span>
            )}
          </div>
        </div>
        
        {stepNumber < 3 && (
          <div 
            className={cn(
              "h-1 flex-1", 
              isCompleted ? "bg-purple-600" : "bg-gray-200"
            )} 
          />
        )}
      </div>
      
      <div className="text-center mt-2">
        <p 
          className={cn(
            "text-sm font-medium",
            (isActive || isCompleted) && "text-purple-600",
            !isActive && !isCompleted && "text-gray-500"
          )}
        >
          {title}
        </p>
      </div>
    </div>
  );
};
