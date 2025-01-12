import React from 'react';
import { BookOpen, MessageSquare } from 'lucide-react';

const BasicInfo = ({ data, updateData, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-purple-400 mb-2">Agent Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className="w-full bg-black/30 border border-purple-500/30 p-2 text-white focus:outline-none focus:border-purple-500"
            placeholder="Enter agent name..."
            required
          />
        </div>

        <div>
          <label className="block text-purple-400 mb-2">Primary Purpose</label>
          <textarea
            value={data.purpose}
            onChange={(e) => updateData({ purpose: e.target.value })}
            className="w-full bg-black/30 border border-purple-500/30 p-2 text-white focus:outline-none focus:border-purple-500 h-24"
            placeholder="Describe the main purpose of your agent..."
            required
          />
        </div>

        <div>
          <label className="block text-purple-400 mb-2">Communication Style</label>
          <div className="grid grid-cols-3 gap-4">
            {['Formal', 'Balanced', 'Casual'].map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => updateData({ communicationStyle: style.toLowerCase() })}
                className={`p-3 border ${
                  data.communicationStyle === style.toLowerCase()
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-purple-500/30 hover:border-purple-500/60'
                } text-purple-300`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-purple-500/20 border border-purple-500 text-purple-300 hover:bg-purple-500/30"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default BasicInfo;