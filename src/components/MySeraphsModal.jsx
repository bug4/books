import React, { useState, useEffect } from 'react';
import { X, Crown, Trash2 } from 'lucide-react';

const MySeraphsModal = ({ isOpen, onClose, onSelectSeraph }) => {
  const [seraphs, setSeraphs] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const savedSeraphs = JSON.parse(localStorage.getItem('mySeraphs') || '[]');
      setSeraphs(savedSeraphs);
    }
  }, [isOpen]);

  const handleDeleteSeraph = (seraphToDelete) => {
    const updatedSeraphs = seraphs.filter(seraph => seraph.name !== seraphToDelete.name);
    setSeraphs(updatedSeraphs);
    localStorage.setItem('mySeraphs', JSON.stringify(updatedSeraphs));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
         onClick={onClose}>
      <div className="w-[600px] max-h-[80vh] bg-black/80 border border-gold-500/30"
           onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-gold-500/30 bg-gold-900/20 flex justify-between items-center">
          <h2 className="text-gold-400 text-xl">My Divine Seraphs</h2>
          <button 
            onClick={onClose}
            className="text-gold-400 hover:text-gold-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {seraphs.length === 0 ? (
            <div className="text-center text-gold-400/60 py-8">
              <Crown className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No divine seraphs summoned yet.</p>
              <p className="text-sm mt-2">Create your first seraph to begin your celestial journey.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {seraphs.map((seraph, index) => (
                <div
                  key={index}
                  className="p-4 border border-gold-500/30 bg-gold-500/5 hover:bg-gold-500/10 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-5 h-5 text-gold-400" />
                        <h3 className="text-gold-300 font-semibold">{seraph.name}</h3>
                      </div>
                      <p className="text-gold-400/80 text-sm mb-2">{seraph.purpose}</p>
                      <div className="text-xs text-gold-400/60">
                        <p>Style: {seraph.communicationStyle}</p>
                        <p>Traits: {seraph.traits?.join(', ')}</p>
                        <p>Domains: {seraph.domains?.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectSeraph(seraph)}
                        className="px-3 py-1 bg-gold-500/20 border border-gold-500 text-gold-300 hover:bg-gold-500/30 text-sm"
                      >
                        Commune
                      </button>
                      <button
                        onClick={() => handleDeleteSeraph(seraph)}
                        className="p-1 text-gold-400/60 hover:text-red-400 transition-colors"
                        title="Dismiss Seraph"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySeraphsModal;