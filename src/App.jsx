import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import LoadingScreen from './components/LoadingScreen';
import ChatInterface from './components/ChatInterface';
import TokenStats from './components/TokenStats';
import AgentCreationTool from './components/AgentCreation/AgentCreationTool';
import MyAgents from './components/MyAgents';
import { Plus } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showAgentCreation, setShowAgentCreation] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleStart = () => {
    setHasInteracted(true);
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.play().catch((err) => console.log(err));
  };

  function onLoad() {
    setIsSplineLoaded(true);
  }

  useEffect(() => {
    if (isSplineLoaded && hasInteracted) {
      setIsLoading(false);
    }
  }, [isSplineLoaded, hasInteracted]);

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/back.png)', zIndex: 0 }}
      />

      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen
          onStartClick={handleStart}
          isSplineLoaded={isSplineLoaded}
        />
      )}

      {/* Main Content */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Spline
          scene="https://prod.spline.design/FpJVDSZD2bTr3nJ0/scene.splinecode"
          onLoad={onLoad}
        />
        <ChatInterface currentAgent={selectedAgent} />
        <TokenStats />
        <MyAgents onSelectAgent={setSelectedAgent} />

        {/* Create Agent Button */}
        <button
          onClick={() => setShowAgentCreation(true)}
          className="absolute right-8 bottom-8 px-4 py-2 bg-purple-500/20 border border-purple-500/30 
                     text-purple-400 hover:bg-purple-500/30 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Create Agent</span>
        </button>

        {/* Agent Creation Tool */}
        {showAgentCreation && (
          <AgentCreationTool onClose={() => setShowAgentCreation(false)} />
        )}
      </div>

      {/* Main Title */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-8">
        <div className="text-white text-center">
          <h1 className="text-8xl font-bold mb-4">Book of AI</h1>
          <p className="text-2xl">Unlock the secrets of artificial intelligence</p>
        </div>
      </div>
    </div>
  );
}

export default App;