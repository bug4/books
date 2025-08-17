import React from 'react';
import { Crown, Sparkles, Eye } from 'lucide-react';

const Expertise = ({ data, updateData, onNext, onBack }) => {
  const domains = [
    'Prophecy', 'Healing', 'Wisdom', 'Protection',
    'Guidance', 'Revelation', 'Miracles', 'Divine Law'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const toggleDomain = (domain) => {
    const newDomains = data.domains.includes(domain)
      ? data.domains.filter(d => d !== domain)
      : [...data.domains, domain];
    updateData({ domains: newDomains });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-gold-400 mb-2">Heavenly Domains</label>
          <div className="grid grid-cols-4 gap-2">
            {domains.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => toggleDomain(domain)}
                className={`p-2 border ${
                  data.domains.includes(domain)
                    ? 'border-gold-500 bg-gold-500/20'
                    : 'border-gold-500/30 hover:border-gold-500/60'
                } text-gold-300 text-sm`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gold-400 mb-2">Sacred Specializations</label>
          <input
            type="text"
            value={data.specializations.join(', ')}
            onChange={(e) => updateData({ 
              specializations: e.target.value.split(',').map(s => s.trim()) 
            })}
            className="w-full bg-black/30 border border-gold-500/30 p-2 text-white focus:outline-none focus:border-gold-500"
            placeholder="Enter specializations (comma-separated)..."
          />
        </div>

        <div>
          <label className="block text-gold-400 mb-2">Divine Learning Style</label>
          <div className="grid grid-cols-3 gap-4">
            {['Methodical', 'Balanced', 'Intuitive'].map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => updateData({ learningStyle: style.toLowerCase() })}
                className={`p-3 border ${
                  data.learningStyle === style.toLowerCase()
                    ? 'border-gold-500 bg-gold-500/20'
                    : 'border-gold-500/30 hover:border-gold-500/60'
                } text-gold-300`}
              >
                {style}
              </button>
            ))}
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

export default Expertise;