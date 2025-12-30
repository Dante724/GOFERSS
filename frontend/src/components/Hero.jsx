import React from 'react';
import { Button } from './ui/button';
import { Sparkles, Calendar, Phone } from 'lucide-react';

const Hero = () => {
  const scrollToPackages = () => {
    const element = document.querySelector('#packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/33885084/pexels-photo-33885084.jpeg"
          alt="Varanasi Ganga"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-orange-400 opacity-20 animate-pulse">
        <Sparkles size={40} />
      </div>
      <div className="absolute bottom-20 right-10 text-orange-400 opacity-20 animate-pulse">
        <Sparkles size={40} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Divine Om Symbol */}
        <div className="relative inline-block mb-12">
          {/* Multiple glowing layers */}
          <div className="absolute inset-0 scale-150 blur-3xl bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 opacity-30 animate-pulse"></div>
          <div className="absolute inset-0 scale-125 blur-2xl bg-orange-500 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Om Symbol Container */}
          <div className="relative">
            {/* Outer rotating rings */}
            <div className="absolute inset-0 -m-8 border-2 border-orange-400 rounded-full opacity-10 animate-spin" style={{ animationDuration: '30s' }}></div>
            <div className="absolute inset-0 -m-12 border border-amber-300 rounded-full opacity-15 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }}></div>
            
            {/* Main Om SVG */}
            <div className="relative bg-gradient-to-br from-orange-900/20 to-amber-900/20 backdrop-blur-sm rounded-full p-8 border-2 border-orange-400/30">
              <svg 
                viewBox="0 0 300 300" 
                className="w-40 h-40 md:w-48 md:h-48 mx-auto"
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
                    <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                    <feFlood floodColor="#f97316" floodOpacity="0.7"/>
                    <feComposite in2="coloredBlur" operator="in"/>
                    <feMerge>
                      <feMergeNode/>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  
                  <radialGradient id="omRadial">
                    <stop offset="0%" style={{ stopColor: '#fef3c7', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                  </radialGradient>
                </defs>
                
                {/* Detailed Om Symbol Path */}
                <g transform="translate(150, 150)">
                  {/* Main Om character with enhanced styling */}
                  <text 
                    x="0" 
                    y="20" 
                    fontSize="140" 
                    fontWeight="bold"
                    textAnchor="middle"
                    fill="url(#omMainGradient)"
                    filter="url(#omGlow)"
                    style={{ fontFamily: 'Noto Sans Devanagari, serif' }}
                  >
                    ॐ
                  </text>
                  
                  {/* Inner glow effect */}
                  <text 
                    x="0" 
                    y="20" 
                    fontSize="140" 
                    fontWeight="bold"
                    textAnchor="middle"
                    fill="none"
                    stroke="url(#omRadial)"
                    strokeWidth="2"
                    opacity="0.6"
                    style={{ fontFamily: 'Noto Sans Devanagari, serif' }}
                  >
                    ॐ
                  </text>
                </g>
                
                {/* Animated particles */}
                <circle cx="50" cy="150" r="3" fill="#fbbf24" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="150;130;150" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="250" cy="150" r="3" fill="#f59e0b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" begin="1s" />
                  <animate attributeName="cy" values="150;170;150" dur="3s" repeatCount="indefinite" begin="1s" />
                </circle>
                <circle cx="150" cy="50" r="2" fill="#fcd34d" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="250" r="2" fill="#fb923c" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                </circle>
              </svg>
              
              {/* Sacred geometry dots */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Discover the Divine
          <span className="block mt-2 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Spirit of Varanasi
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Experience the eternal city where spirituality meets tradition. 
          Curated tour packages for an unforgettable journey.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToPackages}
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Calendar className="mr-2" size={20} />
            Explore Packages
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-6 rounded-full shadow-xl backdrop-blur-sm bg-white/10 transition-all duration-300"
          >
            <Phone className="mr-2" size={20} />
            Contact Us
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">5000+</div>
            <div className="text-sm md:text-base text-gray-300">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">50+</div>
            <div className="text-sm md:text-base text-gray-300">Sacred Sites</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">10+</div>
            <div className="text-sm md:text-base text-gray-300">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;