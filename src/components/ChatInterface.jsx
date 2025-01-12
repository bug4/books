import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader } from 'lucide-react';

const ChatInterface = ({ currentAgent }) => {
 const [messages, setMessages] = useState([]);
 const [input, setInput] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const messagesEndRef = useRef(null);

 const scrollToBottom = () => {
   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
 };

 useEffect(() => {
   scrollToBottom();
 }, [messages]);

 // Clear messages when switching agents
 useEffect(() => {
   setMessages([]);
 }, [currentAgent]);

 const handleSendMessage = async (e) => {
   e.preventDefault();
   if (!input.trim()) return;

   const newMessage = {
     role: 'user',
     content: input
   };

   setMessages(prev => [...prev, newMessage]);
   setInput('');
   setIsLoading(true);

   try {
     const response = await fetch('/.netlify/functions/chat', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         messages: [
           { 
             role: 'system', 
             content: currentAgent?.systemMessage || 'You are a helpful AI assistant.'
           },
           ...messages,
           newMessage
         ]
       }),
     });

     const data = await response.json();
     setMessages(prev => [...prev, { 
       role: 'assistant', 
       content: data.message.content 
     }]);
   } catch (error) {
     console.error('Error:', error);
     setMessages(prev => [...prev, { 
       role: 'assistant', 
       content: 'Sorry, I encountered an error. Please try again.'
     }]);
   } finally {
     setIsLoading(false);
   }
 };

 return (
   <div className="absolute left-8 top-1/2 -translate-y-1/2 w-80 h-[600px] bg-black/30 backdrop-blur-md border border-purple-500/30">
     {/* Header */}
     <div className="border-b border-purple-500/30 bg-purple-900/20 p-3">
       <div className="text-purple-400 text-sm font-semibold">
         {currentAgent ? `Chatting with ${currentAgent.name}` : 'Book of AI Oracle'}
       </div>
     </div>

     {/* Messages */}
     <div className="h-[500px] overflow-y-auto p-4 space-y-4">
       {messages.map((message, index) => (
         <div
           key={index}
           className={`flex ${
             message.role === 'user' ? 'justify-end' : 'justify-start'
           }`}
         >
           <div
             className={`max-w-[80%] p-2 rounded ${
               message.role === 'user'
                 ? 'bg-purple-500/20 text-purple-200'
                 : 'bg-purple-900/20 text-purple-300'
             }`}
           >
             {message.content}
           </div>
         </div>
       ))}
       {isLoading && (
         <div className="flex justify-start">
           <div className="bg-purple-900/20 p-2 rounded">
             <Loader className="w-4 h-4 text-purple-400 animate-spin" />
           </div>
         </div>
       )}
       <div ref={messagesEndRef} />
     </div>

     {/* Input */}
     <form onSubmit={handleSendMessage} className="border-t border-purple-500/30 p-3">
       <div className="flex gap-2">
         <input
           type="text"
           value={input}
           onChange={(e) => setInput(e.target.value)}
           placeholder="Ask the ancient wisdom..."
           className="flex-1 bg-black/30 border border-purple-500/30 p-2 text-purple-200 placeholder-purple-400/50 focus:outline-none focus:border-purple-500"
         />
         <button
           type="submit"
           disabled={isLoading}
           className="p-2 bg-purple-500/20 border border-purple-500 text-purple-400 hover:bg-purple-500/30 disabled:opacity-50"
         >
           <Send className="w-4 h-4" />
         </button>
       </div>
     </form>
   </div>
 );
};

export default ChatInterface;