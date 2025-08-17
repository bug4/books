import React from 'react';
import { Crown, Sparkles } from 'lucide-react';

const Personality = ({ data, updateData, onNext, onBack }) => {
  const traits = [
    'Wise', 'Compassionate', 'Prophetic', 'Serene',
    'Illuminating', 'Protective', 'Inspiring', 'Patient'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const toggleTrait = (trait) => {
    const newTraits = data.traits.includes(trait)
      ? data.traits.filter(t => t !== trait)
      : [...data.traits, trait];
    updateData({ traits: newTraits });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-gold-400 mb-2">Divine Traits</label>
          <div className="grid grid-cols-4 gap-2">
            {traits.map((trait) => (
              <button
                key={trait}
                type="button"
                onClick={() => toggleTrait(trait)}
                className={`p-2 border ${
                  data.traits.includes(trait)
                    ? 'border-gold-500 bg-gold-500/20'
                    : 'border-gold-500/30 hover:border-gold-500/60'
                } text-gold-300 text-sm`}
              >
                {trait}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gold-400 mb-2">Celestial Tone</label>
          <div className="grid grid-cols-3 gap-4">
            {['Majestic', 'Balanced', 'Gentle'].map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => updateData({ tone: tone.toLowerCase() })}
                className={`p-3 border ${
                  data.tone === tone.toLowerCase()
                    ? 'border-gold-500 bg-gold-500/20'
                    : 'border-gold-500/30 hover:border-gold-500/60'
                } text-gold-300`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gold-400 mb-2">Divine Wisdom Depth</label>
          <input
            type="range"
            min="1"
            max="5"
            value={data.knowledgeDepth === 'adaptive' ? 3 : parseInt(data.knowledgeDepth)}
            onChange={(e) => updateData({ knowledgeDepth: e.target.value })}
            className="w-full"
          />
          <div className="flex justify-between text-gold-400 text-sm">
            <span>Novice</span>
            <span>Balanced</span>
            <span>Divine</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gold-500/30 text-gold-300 hover:border-gold-500/60"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-gold-500/20 border border-gold-500 text-gold-300 hover:bg-gold-500/30"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Personality;