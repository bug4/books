import React, { useState, useEffect } from 'react';
import { X, Eye, Copy, CheckCircle, Globe, Twitter } from 'lucide-react';

const TokenCard = ({ token, walletConnected, showAlert }) => {
 const [copied, setCopied] = useState(false);
 const [metadata, setMetadata] = useState(null);

 useEffect(() => {
   const fetchMetadata = async () => {
     if (token.uri) {
       try {
         let url = token.uri;
         if (url.startsWith('ipfs://')) {
           url = url.replace('ipfs://', 'https://ipfs.io/ipfs/');
         }
         
         const response = await fetch(url);
         const data = await response.json();
         setMetadata(data);
       } catch (error) {
         console.error('Error fetching metadata:', error);
       }
     }
   };

   fetchMetadata();
 }, [token]);

 const copyToClipboard = async (text) => {
   try {
     await navigator.clipboard.writeText(text);
     setCopied(true);
     setTimeout(() => setCopied(false), 2000);
   } catch (err) {
     console.error('Failed to copy:', err);
   }
 };

 const handleBuy = () => {
   if (!walletConnected) {
     showAlert('Please connect your wallet to perform trades');
   } else {
     showAlert('Trading is currently in beta testing and will be available in the next update');
   }
 };

 return (
   <div className="p-4 border-b border-gold-500/10 hover:bg-gold-500/5">
     <div className="flex items-center gap-4">
       {/* Token Image/Symbol */}
       {metadata?.image ? (
         <img
           src={metadata.image.startsWith('ipfs://') 
             ? metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
             : metadata.image}
           alt={token.name}
           className="w-10 h-10 rounded-full object-cover border border-gold-500/30"
           onError={() => {
             setMetadata(prev => prev ? { ...prev, image: undefined } : null);
           }}
         />
       ) : (
         <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400">
           {token.symbol?.charAt(0)}
         </div>
       )}

       {/* Token Info */}
       <div className="flex-1">
         <div className="flex justify-between items-start">
           <div>
             <div className="text-gold-300 font-medium">{token.name}</div>
             <div className="text-gold-400/60 text-sm">{token.symbol}</div>
           </div>
           <div className="text-gold-400/60 text-xs">
             {new Date(token.timestamp).toLocaleTimeString()}
           </div>
         </div>

         {/* Contract Address */}
         <div className="flex items-center gap-2 mt-2">
           <div className="text-gold-400/40 text-xs truncate flex-1">
             {token.mint}
           </div>
           <button
             onClick={() => copyToClipboard(token.mint)}
             className="px-4 py-1.5 bg-gold-500/10 border border-gold-500/30 
                      text-gold-400 hover:bg-gold-500/20 transition-colors"
             title="Copy contract address"
           >
             {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
           </button>
         </div>

         {/* Social Links */}
         {metadata && (
           <div className="flex items-center justify-between mt-2">
             <div className="flex gap-3">
               {metadata.twitter && (
                 <a
                   href={metadata.twitter}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-gold-400 hover:text-gold-300"
                 >
                   <Twitter size={16} />
                 </a>
               )}
               {metadata.website && (
                 <a
                   href={metadata.website}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-gold-400 hover:text-gold-300"
                 >
                   <Globe size={16} />
                 </a>
               )}
             </div>
             
             {/* Buy Button */}
             <button
               onClick={handleBuy}
               className="px-4 py-1.5 bg-gold-500/10 border border-gold-500/30 
                        text-gold-400 hover:bg-gold-500/20 transition-colors 
                        flex items-center gap-2 text-sm"
             >
               Buy
             </button>
           </div>
         )}
       </div>
     </div>
   </div>
 );
};

const ScanningInterface = ({ onClose, walletConnected, showAlert }) => {
 const [tokens, setTokens] = useState([]);
 const [isConnected, setIsConnected] = useState(false);
 const [isPaused, setIsPaused] = useState(false);
 const [queuedTokens, setQueuedTokens] = useState([]);

 useEffect(() => {
   if (!isPaused && queuedTokens.length > 0) {
     setTokens(prev => [...queuedTokens, ...prev].slice(0, 50));
     setQueuedTokens([]);
   }
 }, [isPaused, queuedTokens]);

 useEffect(() => {
   const ws = new WebSocket('wss://pumpportal.fun/api/data');

   ws.onopen = () => {
     setIsConnected(true);
     ws.send(JSON.stringify({ method: 'subscribeNewToken' }));
   };

   ws.onmessage = async (event) => {
     try {
       const data = JSON.parse(event.data);
       if (data.signature) {
         const newToken = {
           name: data.name || 'Unknown',
           symbol: data.symbol || 'N/A',
           mint: data.mint,
           uri: data.uri,
           timestamp: Date.now()
         };

         if (isPaused) {
           setQueuedTokens(prev => [newToken, ...prev]);
         } else {
           setTokens(prev => [newToken, ...prev].slice(0, 50));
         }
       }
     } catch (error) {
       console.error('Error processing message:', error);
     }
   };

   ws.onclose = () => setIsConnected(false);

   return () => ws.close();
 }, [isPaused]);

 return (
   <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[800px] bg-black/30 backdrop-blur-md border border-gold-500/30">
     {/* Header */}
     <div className="border-b border-gold-500/30 bg-gold-900/20 p-3 flex justify-between items-center">
       <div className="text-gold-400 text-sm font-semibold flex items-center gap-2">
         <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
         Divine Vision
         {isPaused && <span className="text-gold-400/60 text-xs">(Paused)</span>}
       </div>
       <button onClick={onClose} className="text-gold-400 hover:text-gold-300">
         <X size={18} />
       </button>
     </div>

     {/* Divine Revelation Box */}
     <div className="p-3 border-b border-gold-500/30">
       <div className="flex items-center gap-2 text-gold-400 text-sm mb-2">
         <Eye size={16} />
         <span>Divine Revelation</span>
       </div>
       <div className="bg-gold-500/10 p-3 text-gold-300 text-sm">
         Heavenly insights coming soon...
       </div>
     </div>

     {/* Token List */}
     <div 
       className="max-h-[400px] overflow-y-auto"
       onMouseEnter={() => setIsPaused(true)}
       onMouseLeave={() => setIsPaused(false)}
     >
       {tokens.map((token, index) => (
         <TokenCard 
           key={token.mint + index} 
           token={token} 
           walletConnected={walletConnected}
           showAlert={showAlert}
         />
       ))}
       {tokens.length === 0 && (
         <div className="text-center text-gold-400/60 p-4">
           Awaiting divine revelations...
         </div>
       )}
     </div>
   </div>
 );
};

export default ScanningInterface;