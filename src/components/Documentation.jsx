// components/Documentation.jsx
import React from 'react';
import { Book, Bot, AlertCircle, Wallet, GitGraph, Brain } from 'lucide-react';

const Documentation = ({ onClose }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-black/95 backdrop-blur-md z-[100]">
      <div className="max-w-4xl mx-auto p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-purple-400"
          aria-label="Close Documentation"
        >
          {/* You can use an X icon, or any icon/text you prefer */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="border-b border-purple-500/30 mb-8 pb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Book of AI Documentation
          </h1>
          <p className="text-purple-300">
            A comprehensive guide to the Book of AI platform and its features.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl text-purple-400 font-semibold mb-4">
              Introduction
            </h2>
            <p className="text-purple-300/90 leading-relaxed">
              Book of AI is a decentralized platform that combines artificial
              intelligence with blockchain technology. Our platform offers AI
              agents, real-time token scanning, and integrated trading
              capabilities.
            </p>
          </section>

          {/* Core Features */}
          <section>
            <h2 className="text-2xl text-purple-400 font-semibold mb-4">
              Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Agents */}
              <div className="p-4 border border-purple-500/30 bg-purple-500/5">
                <div className="flex items-center gap-3 mb-3">
                  <Bot className="text-purple-400" size={24} />
                  <h3 className="text-xl text-purple-300">AI Agents</h3>
                </div>
                <p className="text-purple-300/80">
                  Create and customize AI agents with specific traits, expertise,
                  and communication styles. Each agent can be tailored for
                  different purposes, from technical analysis to market research.
                </p>
              </div>

              {/* BOAI Scanner */}
              <div className="p-4 border border-purple-500/30 bg-purple-500/5">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="text-purple-400" size={24} />
                  <h3 className="text-xl text-purple-300">BOAI Scanner</h3>
                </div>
                <p className="text-purple-300/80">
                  Real-time monitoring of new token launches on the Solana
                  blockchain. View detailed token information, social links, and
                  trading capabilities.
                </p>
              </div>

              {/* Wallet Integration */}
              <div className="p-4 border border-purple-500/30 bg-purple-500/5">
                <div className="flex items-center gap-3 mb-3">
                  <Wallet className="text-purple-400" size={24} />
                  <h3 className="text-xl text-purple-300">Wallet Integration</h3>
                </div>
                <p className="text-purple-300/80">
                  Seamless integration with Phantom wallet for secure
                  transactions and token interactions. Connect and disconnect with
                  ease.
                </p>
              </div>

              {/* AI Analysis */}
              <div className="p-4 border border-purple-500/30 bg-purple-500/5">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="text-purple-400" size={24} />
                  <h3 className="text-xl text-purple-300">AI Analysis</h3>
                </div>
                <p className="text-purple-300/80">
                  Advanced AI-powered analysis of market trends and token
                  potential. Receive insights and predictions based on real-time
                  data.
                </p>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section>
            <h2 className="text-2xl text-purple-400 font-semibold mb-4">
              Getting Started
            </h2>
            <div className="space-y-4">
              <div className="p-4 border border-purple-500/30 bg-purple-500/5">
                <h3 className="text-xl text-purple-300 mb-2">
                  1. Connect Your Wallet
                </h3>
                <p className="text-purple-300/80">
                  Click the "Connect Wallet" button in the bottom navigation bar
                  to connect your Phantom wallet.
                </p>
              </div>
              <div className="p-4 border border-purple-500/30 bg-purple-500/5">
                <h3 className="text-xl text-purple-300 mb-2">
                  2. Create an AI Agent
                </h3>
                <p className="text-purple-300/80">
                  Use the "Create Agent" button to customize your own AI
                  assistant with specific traits and expertise.
                </p>
              </div>
              <div className="p-4 border border-purple-500/30 bg-purple-500/5">
                <h3 className="text-xl text-purple-300 mb-2">
                  3. Start Scanning
                </h3>
                <p className="text-purple-300/80">
                  Access the BOAI Scanner to monitor new token launches and
                  perform real-time analysis.
                </p>
              </div>
            </div>
          </section>

          {/* Upcoming Features */}
          <section>
            <h2 className="text-2xl text-purple-400 font-semibold mb-4">
              Upcoming Features
            </h2>
            <div className="p-4 border border-purple-500/30 bg-purple-500/5">
              <ul className="list-disc list-inside space-y-2 text-purple-300/80">
                <li>Advanced trading integration</li>
                <li>Enhanced AI analysis capabilities</li>
                <li>Multi-chain support</li>
                <li>Social features and community tools</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
