import React, { useState, useEffect } from 'react';
import { BookOpen, Loader, Sparkles, Code, Cpu, Binary } from 'lucide-react';

function LoadingScreen({ onStartClick, isSplineLoaded }) {
  const messages = [
    "Decoding ancient algorithms...",
    "Initializing neural networks...",
    "Connecting to the digital realm...",
    "Synthesizing knowledge matrices...",
    "Calibrating quantum processors...",
    "Harmonizing AI frequencies..."
  ];
  
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    let intervalId;

    if (!isSplineLoaded) {
      // Rotate messages every 2 seconds if spline is still loading
      intervalId = setInterval(() => {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
      }, 2000);
    } else {
      // Once spline is loaded, stop rotating messages
      // and show a final "System loaded" message
      setMessage("System loaded! Click the button to continue...");
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSplineLoaded, messages]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(93,38,193,0.1),transparent_100%)]" />
      
      {/* Animated Particles */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Binary className="w-6 h-6 text-purple-500 absolute animate-float" style={{ left: '30%', top: '20%' }} />
          <Cpu className="w-6 h-6 text-purple-400 absolute animate-float-delayed" style={{ right: '25%', top: '40%' }} />
          <Code className="w-6 h-6 text-purple-300 absolute animate-float" style={{ left: '40%', bottom: '30%' }} />
          <Sparkles className="w-6 h-6 text-purple-600 absolute animate-float-delayed" style={{ right: '35%', bottom: '40%' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 space-y-8">
        {/* Logo and Title */}
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-slow bg-purple-500/20 blur-xl rounded-full" />
          <BookOpen className="w-20 h-20 text-purple-400 relative z-10" />
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold text-purple-400 tracking-wider">Book of AI</h2>
          <div className="flex items-center gap-3 justify-center">
            <Loader className="w-5 h-5 text-purple-500 animate-spin" />
            <p className="text-purple-300 text-lg">Awakening ancient wisdom...</p>
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-64 h-1 bg-purple-900/30 rounded-full overflow-hidden">
          <div className="h-full bg-purple-500/50 animate-progress rounded-full" />
        </div>

        {/* Random (or Final) Loading Message */}
        <div className="text-purple-400/60 text-sm text-center h-6">
          <div className="animate-fade-in">{message}</div>
        </div>

        {/* Show the button ONLY when the Spline scene is loaded */}
        {isSplineLoaded && (
          <button
            onClick={onStartClick}
            className="mt-8 px-8 py-3 bg-purple-500/10 border border-purple-500/50 text-purple-400 
                     hover:bg-purple-500/20 transition-all duration-300 ease-in-out
                     flex items-center gap-2 group animate-fade-in"
          >
            <span>Enter the Realm</span>
            <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;
