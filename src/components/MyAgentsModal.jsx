import React from 'react';
import { X, Crown, MessageSquare } from 'lucide-react';

const MySeraphsModal = ({ isOpen, onClose, onSelectSeraph }) => {
  const [seraphs, setSeraphs] = React.useState([]);

  React.useEffect(() => {
    if (isOpen) {
      try {
        const savedSeraphs = JSON.parse(localStorage.getItem('mySeraphs') || '[]');
        console.log('Loaded seraphs:', savedSeraphs);
        setSeraphs(savedSeraphs);
      } catch (error) {
        console.error('Error loading seraphs:', error);
        setSeraphs([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={(e) => e.stopPropagation()}>
      <div className="w-[600px] bg-black/80 border border-gold-500/30">
        <div className="p-4 border-b border-gold-500/30 bg-gold-900/20 flex justify-between items-center">
          <h2 className="text-gold-400 text-xl">Divine Seraphs</h2>
          <button 
            onClick={onClose}
            className="text-gold-400 hover:text-gold-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {seraphs.length === 0 ? (
            <div className="p-8 text-center text-gold-400/60">
              No seraphs summoned yet. Summon your first divine seraph!
            </div>
          ) : (
            <div className="p-4 grid gap-4">
              {seraphs.map((seraph, index) => (
                <div 
                  key={index}
                  className="bg-gold-900/10 border border-gold-500/30 p-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="text-gold-300 font-semibold">{seraph.name}</h3>
                        <p className="text-gold-400/60 text-sm">{seraph.purpose}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectSeraph(seraph);
                        onClose();
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gold-500/20 border border-gold-500/30 text-gold-300 hover:bg-gold-500/30"
                    >
                      <MessageSquare size={16} />
                      <span>Commune</span>
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="text-gold-400/80">
                      <span className="text-gold-400">Divine Style:</span> {seraph.communicationStyle}
                    </div>
                    <div className="text-gold-400/80">
                      <span className="text-gold-400">Celestial Traits:</span> {seraph.traits.join(', ')}
                    </div>
                    <div className="text-gold-400/80">
                      <span className="text-gold-400">Heavenly Domains:</span> {seraph.domains.join(', ')}
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