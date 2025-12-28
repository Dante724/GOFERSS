import React from 'react';
import { companyInfo } from '../mockData';
import { Card, CardContent } from './ui/card';
import { MapPin, Users, Heart, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-orange-600" />,
      title: "Local Expertise",
      description: "Deep knowledge of Varanasi's hidden gems and sacred sites"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Expert Guides",
      description: "Experienced guides who bring history and spirituality alive"
    },
    {
      icon: <Heart className="w-8 h-8 text-orange-600" />,
      title: "Personalized Care",
      description: "Every journey is crafted with attention to your preferences"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Trusted Service",
      description: "Years of excellence in creating memorable experiences"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1763186868095-d63ef07ae843"
                alt="Varanasi Ganga Aarti"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 to-transparent"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange-100 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-100 rounded-full -z-10"></div>
          </div>

          {/* Right: Content */}
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
              About Gofers
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Gateway to
              <span className="block text-orange-600">Spiritual Varanasi</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {companyInfo.description}
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              With years of experience and a passion for showcasing the divine beauty of Banaras, 
              we ensure that every moment of your journey is filled with peace, wonder, and spiritual enlightenment.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;