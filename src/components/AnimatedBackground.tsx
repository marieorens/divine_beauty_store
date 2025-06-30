
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient de base plus doux et féminin */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 animate-gradient-shift"></div>
      
      {/* Pétales de fleurs flottants */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className={`absolute opacity-60 animate-petal-float-${i % 5}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
            }}
          >
            <div 
              className="w-8 h-8 bg-gradient-to-br from-pink-300/40 to-rose-300/40 rounded-full transform rotate-45"
              style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Bulles de savon flottantes */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={`bubble-${i}`}
            className={`absolute rounded-full bg-gradient-to-br from-white/30 to-pink-200/20 animate-bubble-float-${i % 4} backdrop-blur-sm border border-white/20 shadow-lg`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 50}px`,
              height: `${15 + Math.random() * 50}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${10 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Formes organiques douces */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-pink-300/15 to-rose-400/15 rounded-full animate-organic-pulse blur-sm"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-pink-300/20 animate-organic-sway blur-sm" 
             style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-br from-rose-300/10 to-pink-400/10 animate-organic-breathe blur-sm"
             style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
        <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-gradient-to-br from-indigo-300/15 to-purple-300/15 animate-organic-dance blur-sm"
             style={{ borderRadius: '50% 50% 80% 20% / 30% 60% 40% 70%' }}></div>
      </div>

      {/* Particules scintillantes roses */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-sparkle-dance"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          >
            <div className="w-2 h-2 bg-pink-400 transform rotate-45 animate-sparkle-glow"></div>
            <div className="absolute top-0 left-0 w-2 h-2 bg-rose-300 transform -rotate-45 animate-sparkle-glow-delayed"></div>
          </div>
        ))}
      </div>

      {/* Vagues douces en arrière-plan */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
        <svg viewBox="0 0 1200 120" className="w-full h-full">
          <path d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z" 
                fill="url(#wave-gradient)" 
                className="animate-wave-gentle" />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fce7f3" />
              <stop offset="50%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedBackground;
