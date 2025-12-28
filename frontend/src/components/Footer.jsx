import React from 'react';
import { companyInfo } from '../mockData';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-3xl">🕉️</div>
              <div>
                <h3 className="text-2xl font-bold text-white">Gofers</h3>
                <p className="text-sm text-orange-400">Varanasi Tours</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {companyInfo.tagline}. Experience the divine essence of Varanasi with our carefully curated spiritual journeys.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#packages" className="hover:text-orange-400 transition-colors duration-200">
                  Packages
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-orange-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <Link to="/blog" className="hover:text-orange-400 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <a href="/#contact" className="hover:text-orange-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="text-orange-400 flex-shrink-0 mt-1" />
                <span className="text-sm">{companyInfo.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-orange-400 flex-shrink-0" />
                <span className="text-sm">{companyInfo.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-orange-400 flex-shrink-0" />
                <span className="text-sm">{companyInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Gofers Varanasi Tours. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-orange-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;