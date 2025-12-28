import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

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
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-orange-600">🕉️</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Gofers</h1>
              <p className="text-xs text-orange-600">Varanasi Tours</p>
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