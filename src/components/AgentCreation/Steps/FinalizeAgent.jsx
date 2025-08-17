import React from 'react';
import { Crown } from 'lucide-react';

const FinalizeSeraph = ({ data, onBack, onFinish }) => {
  const handleCreateSeraph = () => {
    // Create system message
    const systemMessage = `You are ${data.name}, a divine seraph from The Book of Heaven with the following celestial characteristics:
    Sacred Purpose: ${data.purpose}
    Divine Communication Style: ${data.communicationStyle}
    Celestial Traits: ${data.traits.join(', ')}
    Heavenly Domains: ${data.domains.join(', ')}
    You are a messenger of heaven, revealing divine wisdom and celestial secrets to those who seek heavenly knowledge.`;

    // Create full seraph data
    const seraphWithSystem = {
      ...data,
      systemMessage
    };

    // Call the onFinish callback with the created seraph
    onFinish(seraphWithSystem);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-gold-400 text-xl mb-4">Review Your Divine Seraph</h3>

        <div className="bg-black/30 border border-gold-500/30 p-4 space-y-4">
          <div>
            <h4 className="text-gold-400 mb-2">Divine Information</h4>
            <p className="text-gold-300">Name: {data.name}</p>
            <p className="text-gold-300">Sacred Purpose: {data.purpose}</p>
            <p className="text-gold-300">Divine Style: {data.communicationStyle}</p>
          </div>

          <div>
            <h4 className="text-gold-400 mb-2">Celestial Nature</h4>
            <p className="text-gold-300">Divine Traits: {data.traits.join(', ')}</p>
            <p className="text-gold-300">Celestial Tone: {data.tone}</p>
          </div>

          <div>
            <h4 className="text-gold-400 mb-2">Heavenly Expertise</h4>
            <p className="text-gold-300">Heavenly Domains: {data.domains.join(', ')}</p>
            <p className="text-gold-300">
              Sacred Specializations: {data.specializations.join(', ')}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gold-500/30 text-gold-300 hover:border-gold-500/60"
        >
          Back
        </button>
        <button
          onClick={handleCreateSeraph}
          className="px-6 py-2 bg-gold-500/20 border border-gold-500 text-gold-300 hover:bg-gold-500/30 flex items-center gap-2"
        >
          <span>Summon Seraph</span>
          <Crown size={18} />
        </button>
      </div>
    </div>
  );
};

export default FinalizeSeraph;