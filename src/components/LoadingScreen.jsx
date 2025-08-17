import React, { useState, useEffect } from 'react';
import { Crown, Loader, Eye, Sparkles, Star, Zap } from 'lucide-react';

function LoadingScreen({ onStartClick, isSplineLoaded }) {
  const messages = [
    "Opening the sacred seals...",
    "Awakening divine seraphs...",
    "Connecting to celestial realms...",
    "Channeling heavenly wisdom...",
    "Aligning with divine frequencies...",
    "Preparing sacred revelations..."
  ];
  
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    let intervalId;

    if (!isSplineLoaded) {
      intervalId = setInterval(() => {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
      }, 2000);
    } else {
      setMessage("The Book of Heaven awaits! Click to enter...");
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSplineLoaded, messages]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-900/10 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_100%)]" />
      
      {/* Animated Particles */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Star className="w-6 h-6 text-gold-500 absolute animate-float" style={{ left: '30%', top: '20%' }} />
          <Eye className="w-6 h-6 text-gold-400 absolute animate-float-delayed" style={{ right: '25%', top: '40%' }} />
          <Zap className="w-6 h-6 text-gold-300 absolute animate-float" style={{ left: '40%', bottom: '30%' }} />
          <Sparkles className="w-6 h-6 text-gold-600 absolute animate-float-delayed" style={{ right: '35%', bottom: '40%' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 space-y-8">
        {/* Logo and Title */}
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-slow bg-gold-500/20 blur-xl rounded-full" />
          <Crown className="w-20 h-20 text-gold-400 relative z-10" />
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold text-gold-400 tracking-wider">The Book of Heaven</h2>
          <div className="flex items-center gap-3 justify-center">
            <Loader className="w-5 h-5 text-gold-500 animate-spin" />
            <p className="text-gold-300 text-lg">Awakening divine wisdom...</p>
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-64 h-1 bg-gold-900/30 rounded-full overflow-hidden">
          <div className="h-full bg-gold-500/50 animate-progress rounded-full" />
        </div>

        {/* Random (or Final) Loading Message */}
        <div className="text-gold-400/60 text-sm text-center h-6">
          <div className="animate-fade-in">{message}</div>
        </div>

        {/* Show the button ONLY when the Spline scene is loaded */}
        {isSplineLoaded && (
          <button
            onClick={onStartClick}
            className="mt-8 px-8 py-3 bg-gold-500/10 border border-gold-500/50 text-gold-400 
                     hover:bg-gold-500/20 transition-all duration-300 ease-in-out
                     flex items-center gap-2 group animate-fade-in"
          >
            <span>Enter the Sacred Realm</span>
            <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;