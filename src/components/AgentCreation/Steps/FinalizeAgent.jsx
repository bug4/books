import React from 'react';
import { CheckCircle } from 'lucide-react';

const FinalizeAgent = ({ data, onBack, onFinish }) => {
  const handleCreateAgent = () => {
    // Create system message
    const systemMessage = `You are ${data.name}, an AI agent with the following characteristics:
    Purpose: ${data.purpose}
    Communication Style: ${data.communicationStyle}
    Personality Traits: ${data.traits.join(', ')}
    Expertise Domains: ${data.domains.join(', ')}`;

    // Create full agent data
    const agentWithSystem = {
      ...data,
      systemMessage
    };

    // Call the onFinish callback with the created agent
    onFinish(agentWithSystem);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-purple-400 text-xl mb-4">Review Your Agent</h3>

        <div className="bg-black/30 border border-purple-500/30 p-4 space-y-4">
          <div>
            <h4 className="text-purple-400 mb-2">Basic Information</h4>
            <p className="text-purple-300">Name: {data.name}</p>
            <p className="text-purple-300">Purpose: {data.purpose}</p>
            <p className="text-purple-300">Style: {data.communicationStyle}</p>
          </div>

          <div>
            <h4 className="text-purple-400 mb-2">Personality</h4>
            <p className="text-purple-300">Traits: {data.traits.join(', ')}</p>
            <p className="text-purple-300">Tone: {data.tone}</p>
          </div>

          <div>
            <h4 className="text-purple-400 mb-2">Expertise</h4>
            <p className="text-purple-300">Domains: {data.domains.join(', ')}</p>
            <p className="text-purple-300">
              Specializations: {data.specializations.join(', ')}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-purple-500/30 text-purple-300 hover:border-purple-500/60"
        >
          Back
        </button>
        <button
          onClick={handleCreateAgent}
          className="px-6 py-2 bg-purple-500/20 border border-purple-500 text-purple-300 hover:bg-purple-500/30 flex items-center gap-2"
        >
          <span>Create Agent</span>
          <CheckCircle size={18} />
        </button>
      </div>
    </div>
  );
};

export default FinalizeAgent;