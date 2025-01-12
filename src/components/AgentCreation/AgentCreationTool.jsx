import React, { useState } from 'react';
import { X } from 'lucide-react';
import StepsIndicator from './components/StepsIndicator';
import BasicInfo from './Steps/BasicInfo';
import Personality from './Steps/Personality';
import Expertise from './Steps/Expertise';
import FinalizeAgent from './Steps/FinalizeAgent';

const AgentCreationTool = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [agentData, setAgentData] = useState({
    // Basic Info
    name: '',
    purpose: '',
    avatar: 'default',
    communicationStyle: 'balanced',

    // Personality
    traits: [],
    tone: 'professional',
    conversationStyle: 'balanced',
    knowledgeDepth: 'adaptive',

    // Expertise
    domains: [],
    specializations: [],
    taskTypes: [],
    learningStyle: 'balanced',

    // Advanced
    memoryRetention: 'medium',
    contextHandling: 'adaptive',
    responseLength: 'balanced',
    commands: []
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

  const handleFinish = async () => {
    try {
      // API call to create agent
      const response = await fetch('/api/create-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData)
      });
      
      if (!response.ok) throw new Error('Failed to create agent');
      
      const data = await response.json();
      console.log('Agent created:', data);
      onClose();
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[600px] bg-black/80 border border-purple-500/30 backdrop-blur-md">
        {/* Header */}
        <div className="p-4 border-b border-purple-500/30 bg-purple-900/20 flex justify-between items-center">
          <h2 className="text-purple-400 text-xl">Create Your AI Agent</h2>
          <button 
            onClick={onClose}
            className="text-purple-400 hover:text-purple-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Indicator */}
        <StepsIndicator currentStep={currentStep} totalSteps={4} />

        {/* Content */}
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
              onFinish={handleFinish} 
              onBack={handleBack} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentCreationTool;