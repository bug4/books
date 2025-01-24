import React from 'react';
import { Users, MessageSquare } from 'lucide-react';

const MyAgents = ({ onSelectAgent }) => {
  const [agents, setAgents] = React.useState([]);

  React.useEffect(() => {
    const savedAgents = JSON.parse(localStorage.getItem('myAgents') || '[]');
    setAgents(savedAgents);
  }, []);

  if (agents.length === 0) {
    return null;
  }

  return (
    <div className="absolute left-8 bottom-8 w-80 bg-black/30 backdrop-blur-md border border-purple-500/30">
      <div className="p-3 border-b border-purple-500/30 bg-purple-900/20 flex items-center gap-2">
        <Users className="w-4 h-4 text-purple-400" />
        <span className="text-purple-400 text-sm">Librarium Agents</span>
      </div>
      <div className="max-h-48 overflow-y-auto">
        {agents.map((agent, index) => (
          <button
            key={index}
            onClick={() => onSelectAgent(agent)}
            className="w-full p-3 flex items-center gap-3 hover:bg-purple-500/10 border-b border-purple-500/10"
          >
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-left">
              <div className="text-purple-300 text-sm">{agent.name}</div>
              <div className="text-purple-400/60 text-xs">{agent.purpose}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyAgents;