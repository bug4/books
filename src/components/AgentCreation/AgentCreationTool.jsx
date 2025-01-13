import React, { useState } from 'react';
import { X } from 'lucide-react';
import StepsIndicator from './components/StepsIndicator';
import BasicInfo from './Steps/BasicInfo';
import Personality from './Steps/Personality';
import Expertise from './Steps/Expertise';
import FinalizeAgent from './Steps/FinalizeAgent';

const AgentCreationTool = ({ onClose, onCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [agentData, setAgentData] = useState({
    name: '',
    purpose: '',
    communicationStyle: 'balanced',
    traits: [],
    tone: 'professional',
    domains: [],
    specializations: []
  });

  const updateAgentData = (data) => {
    setAgentData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleFinish = (finalData) => {
    try {
      // Check existing agents
      const existingAgents = JSON.parse(localStorage.getItem('myAgents') || '[]');
      
      // Check if agent with same name already exists
      if (existingAgents.some(agent => agent.name === finalData.name)) {
        alert('An agent with this name already exists!');
        return;
      }
  
      const newAgents = [...existingAgents, finalData];
      localStorage.setItem('myAgents', JSON.stringify(newAgents));
  
      // Call onCreated callback
      if (onCreated) {
        onCreated();
      }
    } catch (error) {
      console.error('Error saving agent:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={(e) => e.stopPropagation()}>
      <div className="w-[600px] bg-black/80 border border-purple-500/30">
        <div className="p-4 border-b border-purple-500/30 bg-purple-900/20 flex justify-between items-center">
          <h2 className="text-purple-400 text-xl">Create Your AI Agent</h2>
          <button 
            onClick={onClose}
            className="text-purple-400 hover:text-purple-300"
          >
            <X size={20} />
          </button>
        </div>

        <StepsIndicator currentStep={currentStep} totalSteps={4} />

        <div className="p-6">
          {currentStep === 1 && (
            <BasicInfo 
              data={agentData} 
              updateData={updateAgentData} 
              onNext={handleNext} 
            />
          )}
          {currentStep === 2 && (
            <Personality 
              data={agentData} 
              updateData={updateAgentData} 
              onNext={handleNext} 
              onBack={handleBack} 
            />
          )}
          {currentStep === 3 && (
            <Expertise 
              data={agentData} 
              updateData={updateAgentData} 
              onNext={handleNext} 
              onBack={handleBack} 
            />
          )}
          {currentStep === 4 && (
            <FinalizeAgent 
              data={agentData}
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