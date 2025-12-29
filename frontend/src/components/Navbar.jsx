import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { companyInfo } from '../mockData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/#packages' },
    { name: 'About', path: '/#about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/#contact' }
  ];

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/${sectionId}`;
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src={companyInfo.logo} 
                alt="Gofers Logo" 
                className="h-14 w-14 rounded-full object-cover border-2 border-orange-600 shadow-lg group-hover:border-orange-500 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
              />
              <div className="absolute inset-0 rounded-full bg-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="transition-all duration-300">
              <h1 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Gofers</h1>
              <p className="text-xs text-orange-600 font-medium">Varanasi Tours</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.path.includes('#') ? (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.path.split('#')[1] ? `#${link.path.split('#')[1]}` : '#')}
                  className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-orange-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-orange-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              link.path.includes('#') ? (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.path.split('#')[1] ? `#${link.path.split('#')[1]}` : '#')}
                  className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium py-2"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-orange-600 font-medium py-2"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
              Book Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;