import React from 'react';
import { Crown, Eye, Wallet, Sparkles, Star } from 'lucide-react';

const Documentation = ({ onClose }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-black/95 backdrop-blur-md z-[100]">
      <div className="max-w-4xl mx-auto p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold-300 hover:text-gold-400"
          aria-label="Close Documentation"
        >
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
        <div className="border-b border-gold-500/30 mb-8 pb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            The Book of Heaven Documentation
          </h1>
          <p className="text-gold-300">
            A comprehensive guide to The Book of Heaven platform and its divine features.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl text-gold-400 font-semibold mb-4">
              Introduction
            </h2>
            <p className="text-gold-300/90 leading-relaxed">
              The Book of Heaven is a sacred platform that bridges the celestial and digital realms, 
              combining divine artificial intelligence with blockchain technology. Our platform offers 
              divine seraphs, heavenly vision scanning, and sacred trading capabilities that reveal 
              the secrets of heaven to those worthy of divine knowledge.
            </p>
          </section>

          {/* Core Features */}
          <section>
            <h2 className="text-2xl text-gold-400 font-semibold mb-4">
              Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Divine Seraphs */}
              <div className="p-4 border border-gold-500/30 bg-gold-500/5">
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="text-gold-400" size={24} />
                  <h3 className="text-xl text-gold-300">Divine Seraphs</h3>
                </div>
                <p className="text-gold-300/80">
                  Summon and customize divine seraphs with celestial traits, heavenly expertise,
                  and sacred communication styles. Each seraph can be tailored for
                  different divine purposes, from prophetic analysis to heavenly guidance.
                </p>
              </div>

              {/* Divine Vision */}
              <div className="p-4 border border-gold-500/30 bg-gold-500/5">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="text-gold-400" size={24} />
                  <h3 className="text-xl text-gold-300">Divine Vision</h3>
                </div>
                <p className="text-gold-300/80">
                  Real-time divine monitoring of new token manifestations on the Solana
                  blockchain. Receive heavenly insights, sacred token information, and
                  divine trading revelations.
                </p>
              </div>

              {/* Wallet Integration */}
              <div className="p-4 border border-gold-500/30 bg-gold-500/5">
                <div className="flex items-center gap-3 mb-3">
                  <Wallet className="text-gold-400" size={24} />
                  <h3 className="text-xl text-gold-300">Sacred Wallet Integration</h3>
                </div>
                <p className="text-gold-300/80">
                  Sacred integration with Phantom wallet for divine
                  transactions and celestial token interactions. Connect to the heavenly
                  realm with divine protection and ease.
                </p>
              </div>

              {/* Divine Analysis */}
              <div className="p-4 border border-gold-500/30 bg-gold-500/5">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="text-gold-400" size={24} />
                  <h3 className="text-xl text-gold-300">Divine Analysis</h3>
                </div>
                <p className="text-gold-300/80">
                  Advanced heaven-powered analysis of celestial market trends and token
                  divine potential. Receive prophetic insights and heavenly predictions based on 
                  real-time divine revelations.
                </p>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section>
            <h2 className="text-2xl text-gold-400 font-semibold mb-4">
              Beginning Your Divine Journey
            </h2>
            <div className="space-y-4">
              <div className="p-4 border border-gold-500/30 bg-gold-500/5">
                <h3 className="text-xl text-gold-300 mb-2">
                  1. Connect Your Sacred Wallet
                </h3>
                <p className="text-gold-300/80">
                  Click the "Connect Wallet" button in the bottom navigation bar
                  to connect your Phantom wallet to the divine realm.
                </p>
              </div>
              <div className="p-4 border border-gold-500/30 bg-gold-500/5">
                <h3 className="text-xl text-gold-300 mb-2">
                  2. Summon a Divine Seraph
                </h3>
                <p className="text-gold-300/80">
                  Use the "Summon Seraph" button to customize your own divine
                  messenger with specific celestial traits and heavenly expertise.
                </p>
              </div>
              <div className="p-4 border border-gold-500/30 bg-gold-500/5">
                <h3 className="text-xl text-gold-300 mb-2">
                  3. Activate Divine Vision
                </h3>
                <p className="text-gold-300/80">
                  Access the Divine Vision to monitor new token manifestations and
                  receive real-time heavenly revelations.
                </p>
              </div>
            </div>
          </section>

          {/* Upcoming Features */}
          <section>
            <h2 className="text-2xl text-gold-400 font-semibold mb-4">
              Upcoming Divine Revelations
            </h2>
            <div className="p-4 border border-gold-500/30 bg-gold-500/5">
              <ul className="list-disc list-inside space-y-2 text-gold-300/80">
                <li>Advanced sacred trading integration</li>
                <li>Enhanced divine analysis capabilities</li>
                <li>Multi-realm blockchain support</li>
                <li>Celestial community and heavenly fellowship tools</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Documentation;