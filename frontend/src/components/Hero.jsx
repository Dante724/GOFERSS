import React from 'react';
import { Button } from './ui/button';
import { Calendar, Phone, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToPackages = () => {
    const element = document.querySelector('#packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-orange-950 to-gray-900">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(251,146,60,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Sacred Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sacred-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#f97316" strokeWidth="1"/>
              <circle cx="50" cy="50" r="20" fill="none" stroke="#fb923c" strokeWidth="1"/>
              <circle cx="50" cy="50" r="10" fill="none" stroke="#fdba74" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sacred-pattern)" />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Divine Om Symbol */}
        <div className="flex justify-center items-center mb-8">
          <div className="relative">
            {/* Multiple glowing layers */}
            <div className="absolute inset-0 scale-150 blur-3xl bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 opacity-30 animate-pulse"></div>
            <div className="absolute inset-0 scale-125 blur-2xl bg-orange-500 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Om Symbol Container */}
            <div className="relative">
              {/* Outer rotating rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[260px] md:h-[260px] border-2 border-orange-400/30 rounded-full opacity-30 animate-spin" style={{ animationDuration: '30s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[300px] md:h-[300px] border border-amber-300/20 rounded-full opacity-20 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }}></div>
              
              {/* Main Om SVG */}
              <div className="relative bg-gradient-to-br from-orange-900/30 to-amber-900/30 backdrop-blur-md rounded-full p-6 md:p-8 border-2 border-orange-400/40 shadow-2xl flex items-center justify-center">
                <svg 
                  viewBox="0 0 300 300" 
                  className="w-32 h-32 md:w-40 md:h-40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="omMainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }}>
                        <animate attributeName="stop-color" values="#fbbf24; #f59e0b; #fbbf24" dur="4s" repeatCount="indefinite" />
                      </stop>
                      <stop offset="50%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }}>
                        <animate attributeName="stop-color" values="#ea580c; #c2410c; #ea580c" dur="4s" repeatCount="indefinite" />
                      </stop>
                    </linearGradient>
                    
                    <filter id="omGlow" height="300%" width="300%" x="-100%" y="-100%">
                      <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                      <feFlood floodColor="#f97316" floodOpacity="0.8"/>
                      <feComposite in2="coloredBlur" operator="in"/>
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <g transform="translate(150, 150)">
                    <text 
                      x="0" 
                      y="20" 
                      fontSize="140" 
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="url(#omMainGradient)"
                      filter="url(#omGlow)"
                      style={{ fontFamily: 'Noto Sans Devanagari, serif' }}
                    >
                      ॐ
                    </text>
                  </g>
                  
                  {/* Animated particles */}
                  <circle cx="50" cy="150" r="3" fill="#fbbf24" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="250" cy="150" r="3" fill="#f59e0b" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="1s" />
                  </circle>
                </svg>
                
                {/* Sacred dots */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Spiritual Tagline */}
        <div className="mb-6">
          <p className="text-orange-400 text-sm md:text-base font-medium tracking-wider uppercase mb-2 flex items-center justify-center gap-2">
            <Sparkles size={16} className="animate-pulse" />
            Experience Divine Varanasi
            <Sparkles size={16} className="animate-pulse" />
          </p>
        </div>

        {/* Main Heading with Gradient */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block text-white mb-3">
            Discover the Sacred
          </span>
          <span className="block bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent animate-gradient">
            Journey to Enlightenment
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Immerse yourself in the spiritual essence of Varanasi. <br className="hidden md:block" />
          Curated experiences on the banks of holy Ganga.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            onClick={scrollToPackages}
            size="lg"
            className="group bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-7 text-lg rounded-full shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 border-2 border-orange-400/50"
          >
            <Calendar className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
            Explore Sacred Journeys
          </Button>
          <Button
            onClick={scrollToContact}
            size="lg"
            variant="outline"
            className="group border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-7 text-lg rounded-full shadow-xl backdrop-blur-sm bg-white/5 hover:shadow-orange-400/30 transition-all duration-300"
          >
            <Phone className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
            Connect With Us
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto">
          <div className="text-center group cursor-pointer">
            <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-orange-400 to-amber-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
              5000+
            </div>
            <div className="text-xs md:text-sm text-gray-400">Blessed Souls</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-orange-400 to-amber-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
              50+
            </div>
            <div className="text-xs md:text-sm text-gray-400">Sacred Sites</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-orange-400 to-amber-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
              10+
            </div>
            <div className="text-xs md:text-sm text-gray-400">Years of Devotion</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
