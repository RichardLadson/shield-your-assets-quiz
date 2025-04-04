
// This file is needed by the embed component but appears to be missing
// Creating a simple version that will provide the same functionality
import React from "react";
import { cn } from "@/lib/utils";

interface StepsProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

interface StepProps {
  title: string;
}

export const Steps = ({ currentStep, totalSteps, children }: StepsProps) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        {childrenArray.map((child, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={index} className="flex-1">
              <div className={cn(
                "flex items-center",
                index !== 0 && "ml-6"
              )}>
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                  isActive ? "bg-purple-600 text-white" : 
                  isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                )}>
                  {stepNumber}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-900">
                  {(child as React.ReactElement<StepProps>).props.title}
                </div>
              </div>
              {index < childrenArray.length - 1 && (
                <div className={cn(
                  "w-full h-1 mt-3 mb-5",
                  isCompleted ? "bg-green-500" : "bg-gray-200"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Step = ({ title }: StepProps) => {
  return <div>{title}</div>;
};
