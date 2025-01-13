import React from 'react';
import { X, Bot, MessageSquare } from 'lucide-react';

const MyAgentsModal = ({ isOpen, onClose, onSelectAgent }) => {
  const [agents, setAgents] = React.useState([]);

  React.useEffect(() => {
    if (isOpen) {
      try {
        const savedAgents = JSON.parse(localStorage.getItem('myAgents') || '[]');
        console.log('Loaded agents:', savedAgents);
        setAgents(savedAgents);
      } catch (error) {
        console.error('Error loading agents:', error);
        setAgents([]);
      }
    }
  }, [isOpen]);

  // If not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={(e) => e.stopPropagation()}>
      <div className="w-[600px] bg-black/80 border border-purple-500/30">
        <div className="p-4 border-b border-purple-500/30 bg-purple-900/20 flex justify-between items-center">
          <h2 className="text-purple-400 text-xl">My AI Agents</h2>
          <button 
            onClick={onClose}
            className="text-purple-400 hover:text-purple-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {agents.length === 0 ? (
            <div className="p-8 text-center text-purple-400/60">
              No agents created yet. Create your first AI agent!
            </div>
          ) : (
            <div className="p-4 grid gap-4">
              {agents.map((agent, index) => (
                <div 
                  key={index}
                  className="bg-purple-900/10 border border-purple-500/30 p-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-purple-300 font-semibold">{agent.name}</h3>
                        <p className="text-purple-400/60 text-sm">{agent.purpose}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectAgent(agent);
                        onClose();
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30"
                    >
                      <MessageSquare size={16} />
                      <span>Chat</span>
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="text-purple-400/80">
                      <span className="text-purple-400">Style:</span> {agent.communicationStyle}
                    </div>
                    <div className="text-purple-400/80">
                      <span className="text-purple-400">Traits:</span> {agent.traits.join(', ')}
                    </div>
                    <div className="text-purple-400/80">
                      <span className="text-purple-400">Expertise:</span> {agent.domains.join(', ')}
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

export default MyAgentsModal;