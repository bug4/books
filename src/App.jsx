import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import LoadingScreen from './components/LoadingScreen';
import ChatInterface from './components/ChatInterface';
import TokenStats from './components/TokenStats';
import AgentCreationTool from './components/AgentCreation/AgentCreationTool';
import MyAgentsModal from './components/MyAgentsModal';
import { Plus, Bot } from 'lucide-react';

function App() {
 const [isLoading, setIsLoading] = useState(true);
 const [isSplineLoaded, setIsSplineLoaded] = useState(false);
 const [hasInteracted, setHasInteracted] = useState(false);
 const [showAgentCreation, setShowAgentCreation] = useState(false);
 const [showMyAgents, setShowMyAgents] = useState(false);
 const [selectedAgent, setSelectedAgent] = useState(null);
 const audioRef = useRef(null);

 console.log('App rendering, showMyAgents:', showMyAgents);

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
       <div className="pointer-events-auto">
         <ChatInterface currentAgent={selectedAgent} />
         <TokenStats />
       </div>

       {/* Navigation Button */}
       <div className="fixed top-8 right-8 z-[9999] pointer-events-auto">
         <button
           type="button"
           onClick={() => {
             console.log('Opening My Agents modal');
             setShowMyAgents(true);
           }}
           className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 
                    text-purple-400 hover:bg-purple-500/30 transition-colors 
                    flex items-center gap-2 cursor-pointer"
         >
           <Bot size={20} />
           <span>My Agents</span>
         </button>
       </div>

       {/* Create Agent Button */}
       <button
         onClick={() => {
           console.log('Opening Agent Creation');
           setShowAgentCreation(true);
         }}
         className="fixed right-8 bottom-8 z-[9999] pointer-events-auto px-4 py-2 bg-purple-500/20 
                  border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 
                  transition-colors flex items-center gap-2 cursor-pointer"
       >
         <Plus size={20} />
         <span>Create Agent</span>
       </button>

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
             onClose={() => {
               console.log('Closing Agent Creation');
               setShowAgentCreation(false);
             }}
             onCreated={() => {
               console.log('Agent created');
               setShowAgentCreation(false);
               setShowMyAgents(true);
             }}
           />
         )}
       </div>
     </div>

     {/* Title Layer */}
<div className="absolute top-0 left-0 right-0 z-20 pt-16">
  <div className="text-center">
    <h1 className="text-8xl font-bold mb-2 text-white relative z-10 tracking-wider font-[Orbitron]
                   drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
      Book of AI
    </h1>
    
    <p className="text-2xl font-[Quicksand] text-gray-200/90 tracking-widest">
      Unlock the secrets of artificial intelligence
    </p>
  </div>
</div>
   </div>
 );
}

export default App;