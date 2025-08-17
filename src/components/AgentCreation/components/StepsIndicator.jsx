import React from 'react';

const StepsIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full bg-purple-900/20 p-4">
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`flex items-center ${
              index !== totalSteps - 1 ? 'flex-1' : ''
            }`}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${currentStep > index + 1 
                  ? 'bg-gold-500 border-gold-500' 
                  : currentStep === index + 1
                  ? 'border-gold-500 text-gold-500' 
                  : 'border-gold-500/30 text-gold-500/30'
                }`}
            >
              {index + 1}
            </div>
            {index !== totalSteps - 1 && (
              <div 
                className={`flex-1 h-0.5 mx-2 ${
                  currentStep > index + 1 
                    ? 'bg-gold-500' 
                    : 'bg-gold-500/30'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsIndicator;