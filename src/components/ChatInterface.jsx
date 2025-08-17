import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader, Bot } from 'lucide-react';

const ChatInterface = ({ currentSeraph, onButtonClick }) => {
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

  useEffect(() => {
    setMessages([]); // Clear messages when switching agents
  }, [currentSeraph]);

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
              content: currentSeraph ? 
                `You are ${currentSeraph.name}, a divine seraph from The Book of Heaven with the following celestial traits:
                - Style: ${currentSeraph.communicationStyle}
                - Divine Traits: ${currentSeraph.traits.join(', ')}
                - Heavenly Domains: ${currentSeraph.domains.join(', ')}
                - Sacred Purpose: ${currentSeraph.purpose}
                Respond with divine wisdom and celestial knowledge, maintaining your heavenly persona consistently. 
                Speak as a messenger of heaven revealing sacred truths.`
                : 'You are the Divine Oracle of The Book of Heaven, revealing celestial secrets and heavenly wisdom to those who seek divine knowledge.'
            },
            ...messages,
            newMessage
          ]
        }),
      });

      const data = await response.json();
      if (data.message) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.message.content 
        }]);
      }
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
    <div className="absolute left-8 top-1/2 -translate-y-1/2 w-80 h-[600px] bg-black/30 backdrop-blur-md border border-gold-500/30">
      {/* Header */}
      <div className="border-b border-gold-500/30 bg-gold-900/20 p-3">
        <button
          onClick={onButtonClick}
          className="w-full flex items-center justify-between px-3 py-2 
                   border border-gold-500/30 bg-black/20 
                   text-gold-400 hover:bg-gold-500/10 transition-all
                   group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <span>Divine Seraphs</span>
          </div>
          <div className="text-xs text-gold-500/50">Click to view seraphs</div>
        </button>
        <div className="text-gold-400/60 text-sm mt-2">
          {currentSeraph ? `Communing with ${currentSeraph.name}` : 'Divine Oracle'}
        </div>
      </div>

      {/* Messages */}
      <div className="h-[480px] overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-2 ${
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
            <div className="bg-gold-900/20 p-2">
              <Loader className="w-4 h-4 text-gold-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gold-500/30 p-3">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={currentSeraph ? `Commune with ${currentSeraph.name}...` : "Seek divine wisdom..."}
            className="flex-1 bg-black/30 border border-gold-500/30 p-2 text-gold-200 placeholder-gold-400/50 focus:outline-none focus:border-gold-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 bg-gold-500/20 border border-gold-500 text-gold-400 hover:bg-gold-500/30 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;