import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import LoadingScreen from './components/LoadingScreen';
import ChatInterface from './components/ChatInterface';
import TokenStats from './components/TokenStats';
import AgentCreationTool from './components/AgentCreation/AgentCreationTool';
import MyAgentsModal from './components/MyAgentsModal';
import ScanningInterface from './components/ScanningInterface';
import WalletPopup from './components/WalletPopup';
import Documentation from './components/Documentation';
import Alert from './components/Alert';
import { Plus, Twitter, Volume2, VolumeX, AlertCircle, Settings, Wallet, Book } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showAgentCreation, setShowAgentCreation] = useState(false);
  const [showMyAgents, setShowMyAgents] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [alert, setAlert] = useState(null);
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

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.solana || !window.solana.isPhantom) {
        alert('Phantom wallet not found! Please install it.');
        window.open('https://phantom.app/', '_blank');
        return;
      }

      const response = await window.solana.connect();
      console.log('Connected with PublicKey:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (window.solana && window.solana.isConnected) {
        await window.solana.disconnect();
        setWalletAddress(null);
        setShowWalletPopup(false);
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const showAlert = (message) => {
    setAlert(message);
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
      {alert && (
        <Alert 
          message={alert} 
          onClose={() => setAlert(null)} 
        />
      )}

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/back.png)', zIndex: 0 }}
      />

      {isLoading && (
        <LoadingScreen
          onStartClick={handleStart}
          isSplineLoaded={isSplineLoaded}
        />
      )}

      {/* Spline Layer */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Spline
          scene="https://prod.spline.design/FpJVDSZD2bTr3nJ0/scene.splinecode"
          onLoad={onLoad}
        />
      </div>

      {/* UI Layer */}
      <div className="fixed inset-0" style={{ zIndex: 50 }}>
        {/* Top-right buttons */}
        <div className="absolute top-8 right-8 flex gap-4">
          <button
            onClick={() => setShowDocs(true)}
            className="px-4 py-2 bg-black/30 backdrop-blur-md border border-purple-500/30 
                      text-purple-400 hover:bg-purple-500/10 transition-colors 
                      flex items-center gap-2"
          >
            <Book size={20} />
            <span>Docs</span>
          </button>
          <a 
            href="https://x.com/librarium"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-black/30 backdrop-blur-md border border-purple-500/30 
                      text-purple-400 hover:bg-purple-500/10 transition-colors 
                      flex items-center gap-2"
          >
            <Twitter size={20} />
            <span>Twitter</span>
          </a>
          <button
            onClick={toggleMusic}
            className="px-4 py-2 bg-black/30 backdrop-blur-md border border-purple-500/30 
                      text-purple-400 hover:bg-purple-500/10 transition-colors 
                      flex items-center gap-2"
          >
            {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            <span>{isMusicPlaying ? 'Music On' : 'Music Off'}</span>
          </button>
        </div>

        <div className="pointer-events-auto">
          {/* Chat Interface with My Agents button in header */}
          <ChatInterface 
            currentAgent={selectedAgent} 
            onButtonClick={() => setShowMyAgents(true)}
          />

          {/* Create Agent Button */}
          <button
            onClick={() => {
              console.log('Opening Agent Creation');
              setShowAgentCreation(true);
            }}
            className="absolute left-8 top-[calc(50%+310px)] w-80 p-3 border border-purple-500/30 
                      bg-black/30 backdrop-blur-md text-purple-400 hover:bg-purple-500/10 flex items-center gap-2"
          >
            <Plus size={20} />
            <span>Create Agent</span>
          </button>

          {/* Control Buttons */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            {/* Settings Button */}
            <button
              onClick={() => setShowSettings(true)}
              className="px-6 py-3 bg-black/30 backdrop-blur-md border border-purple-500/30 
                        text-purple-400 hover:bg-purple-500/10 transition-colors 
                        flex items-center gap-2"
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>

            {/* Scanner Button */}
            <button
              onClick={() => setShowScanner(prev => !prev)}
              className="px-6 py-3 bg-black/30 backdrop-blur-md border border-purple-500/30 
                        text-purple-400 hover:bg-purple-500/10 transition-colors 
                        flex items-center gap-2"
            >
              <AlertCircle size={20} />
              <span>LIB Scanning</span>
            </button>

            {/* Connect Wallet Button */}
            <button
              onClick={() => walletAddress ? setShowWalletPopup(true) : connectWallet()}
              className="px-6 py-3 bg-black/30 backdrop-blur-md border border-purple-500/30 
                        text-purple-400 hover:bg-purple-500/10 transition-colors 
                        flex items-center gap-2"
            >
              <Wallet size={20} />
              <span>
                {walletAddress 
                  ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
                  : 'Connect Wallet'}
              </span>
            </button>
          </div>
        </div>

        <TokenStats />

        {/* Modals */}
        <div className="pointer-events-auto">
          {showMyAgents && (
            <MyAgentsModal 
              isOpen={showMyAgents}
              onClose={() => {
                console.log('Closing My Agents modal');
                setShowMyAgents(false);
              }}
              onSelectAgent={(agent) => {
                console.log('Selected agent:', agent);
                setSelectedAgent(agent);
                setShowMyAgents(false);
              }}
            />
          )}

          {showAgentCreation && (
            <AgentCreationTool 
              onClose={() => setShowAgentCreation(false)}
              onCreated={() => {
                console.log('Agent created');
                setShowAgentCreation(false);
                setShowMyAgents(true);
              }}
            />
          )}

          {showScanner && (
            <ScanningInterface 
              onClose={() => setShowScanner(false)}
              walletConnected={!!walletAddress}
              showAlert={showAlert}
            />
          )}

          {showDocs && (
            <Documentation 
              onClose={() => setShowDocs(false)} 
            />
          )}

          {/* Wallet Popup */}
          {showWalletPopup && walletAddress && (
            <WalletPopup
              walletAddress={walletAddress}
              onDisconnect={disconnectWallet}
              onClose={() => setShowWalletPopup(false)}
            />
          )}
        </div>
      </div>

      {/* Title Layer */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-16">
        <div className="text-center">
          <h1 className="text-8xl font-bold mb-2 text-white relative z-10 tracking-wider font-[Orbitron]
                     drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            Librarium
          </h1>
          
          <p className="text-2xl font-[Quicksand] text-gray-200/90 tracking-widest">
            Ancient wisdom meets AI
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;