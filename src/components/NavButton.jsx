import React from 'react';
import { Bot } from 'lucide-react';

const NavButton = ({ onClick }) => {
  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        console.log('Button container clicked');
        onClick();
      }}
      className="fixed top-8 right-8 z-[9999]"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          console.log('Button clicked');
        }}
        className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 
                 text-purple-400 hover:bg-purple-500/30 transition-colors 
                 flex items-center gap-2 cursor-pointer"
      >
        <Bot size={20} />
        <span>Librarium Agents</span>
      </button>
    </div>
  );
};

export default NavButton;