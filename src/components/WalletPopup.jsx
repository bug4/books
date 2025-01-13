import React from 'react';
import { X, LogOut } from 'lucide-react';

const WalletPopup = ({ walletAddress, onDisconnect, onClose }) => {
  return (
    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-80 bg-black/30 backdrop-blur-md border border-purple-500/30">
      <div className="border-b border-purple-500/30 bg-purple-900/20 p-3 flex justify-between items-center">
        <div className="text-purple-400 text-sm font-semibold">Connected Wallet</div>
        <button onClick={onClose} className="text-purple-400 hover:text-purple-300">
          <X size={18} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="text-purple-300 text-sm break-all">
          {walletAddress}
        </div>

        <button
          onClick={onDisconnect}
          className="w-full p-2 border border-purple-500/30 bg-purple-500/10 
                     text-purple-400 hover:bg-purple-500/20 transition-colors 
                     flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          <span>Disconnect Wallet</span>
        </button>
      </div>
    </div>
  );
};

export default WalletPopup;