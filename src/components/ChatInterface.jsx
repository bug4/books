import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader, Bot } from 'lucide-react';

const ChatInterface = ({ currentAgent, onButtonClick }) => {
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
              content: currentAgent ? 
                `You are ${currentAgent.name}, an AI assistant with the following traits:
                - Style: ${currentAgent.communicationStyle}
                - Traits: ${currentAgent.traits.join(', ')}
                - Expertise: ${currentAgent.domains.join(', ')}
                - Purpose: ${currentAgent.purpose}
                Respond according to these characteristics and maintain this persona consistently.`
                : 'You are a helpful AI assistant.'
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
    <div className="absolute left-8 top-1/2 -translate-y-1/2 w-80 h-[600px] bg-black/30 backdrop-blur-md border border-purple-500/30">
      {/* Header */}
      <div className="border-b border-purple-500/30 bg-purple-900/20 p-3">
        <button
          onClick={onButtonClick}
          className="w-full flex items-center justify-between px-3 py-2 
                   border border-purple-500/30 bg-black/20 
                   text-purple-400 hover:bg-purple-500/10 transition-all
                   group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <span>Librarium Agents</span>
          </div>
          <div className="text-xs text-purple-500/50">Click to view agents</div>
        </button>
        <div className="text-purple-400/60 text-sm mt-2">
          {currentAgent ? `Chatting with ${currentAgent.name}` : 'Librarium Oracle'}
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
            <div className="bg-purple-900/20 p-2">
              <Loader className="w-4 h-4 text-purple-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-purple-500/30 p-3">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={currentAgent ? `Chat with ${currentAgent.name}...` : "Ask the ancient wisdom..."}
            className="flex-1 bg-black/30 border border-purple-500/30 p-2 text-purple-200 placeholder-purple-400/50 focus:outline-none focus -border-purple-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 bg-purple-500/20 border border-purple-500 text-purple-400 hover:bg-purple-500/30 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;