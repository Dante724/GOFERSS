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
        {/* Majestic Om Symbol */}
        <div className="relative inline-block mb-8">
          {/* Glowing backdrop */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 opacity-40 animate-pulse"></div>
          
          {/* Om Symbol with SVG styling */}
          <div className="relative">
            <svg 
              viewBox="0 0 200 200" 
              className="w-32 h-32 md:w-40 md:h-40 mx-auto drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.8)) drop-shadow(0 0 60px rgba(251, 146, 60, 0.4))'
              }}
            >
              {/* Golden Om Symbol Path */}
              <defs>
                <linearGradient id="omGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Om Symbol - Simplified elegant path */}
              <text 
                x="50%" 
                y="50%" 
                dominantBaseline="middle" 
                textAnchor="middle" 
                fontSize="120" 
                fontWeight="bold"
                fill="url(#omGradient)"
                filter="url(#glow)"
                style={{ fontFamily: 'serif' }}
              >
                ॐ
              </text>
            </svg>
            
            {/* Rotating ring effect */}
            <div className="absolute inset-0 border-4 border-orange-400 rounded-full opacity-20 animate-spin" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-2 border-2 border-amber-300 rounded-full opacity-30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
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