import React, { useState } from 'react';
import { X } from 'lucide-react';
import StepsIndicator from './components/StepsIndicator';
import BasicInfo from './Steps/BasicInfo';
import Personality from './Steps/Personality';
import Expertise from './Steps/Expertise';
import FinalizeAgent from './Steps/FinalizeAgent';

const AgentCreationTool = ({ onClose, onCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [seraphData, setSeraphData] = useState({
    name: '',
    purpose: '',
    communicationStyle: 'balanced',
    traits: [],
    tone: 'professional',
    domains: [],
    specializations: []
  });

  const updateSeraphData = (data) => {
    setSeraphData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleFinish = (finalData) => {
    try {
      // Check existing seraphs
      const existingSeraphs = JSON.parse(localStorage.getItem('mySeraphs') || '[]');
      
      // Check if seraph with same name already exists
      if (existingSeraphs.some(seraph => seraph.name === finalData.name)) {
        alert('A seraph with this name already exists!');
        return;
      }
  
      const newSeraphs = [...existingSeraphs, finalData];
      localStorage.setItem('mySeraphs', JSON.stringify(newSeraphs));
  
      // Call onCreated callback
      if (onCreated) {
        onCreated();
      }
    } catch (error) {
      console.error('Error saving seraph:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={(e) => e.stopPropagation()}>
      <div className="w-[600px] bg-black/80 border border-gold-500/30">
        <div className="p-4 border-b border-gold-500/30 bg-gold-900/20 flex justify-between items-center">
          <h2 className="text-gold-400 text-xl">Summon Your Divine Seraph</h2>
          <button 
            onClick={onClose}
            className="text-gold-400 hover:text-gold-300"
          >
            <X size={20} />
          </button>
        </div>

        <StepsIndicator currentStep={currentStep} totalSteps={4} />

        <div className="p-6">
          {currentStep === 1 && (
            <BasicInfo 
              data={seraphData} 
              updateData={updateSeraphData} 
              onNext={handleNext} 
            />
          )}
          {currentStep === 2 && (
            <Personality 
              data={seraphData} 
              updateData={updateSeraphData} 
              onNext={handleNext} 
              onBack={handleBack} 
            />
          )}
          {currentStep === 3 && (
            <Expertise 
              data={seraphData} 
              updateData={updateSeraphData} 
              onNext={handleNext} 
              onBack={handleBack} 
            />
          )}
          {currentStep === 4 && (
            <FinalizeAgent 
              data={seraphData}
              onBack={handleBack}
              onFinish={handleFinish}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentCreationTool;