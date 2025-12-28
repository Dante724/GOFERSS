import React, { useState } from 'react';
import { companyInfo } from '../mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock submission - will be connected to backend later
    console.log('Contact form submitted:', formData);
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Whether you're planning your spiritual journey or have questions about our packages, 
                our team is here to help you create an unforgettable Varanasi experience.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4 p-6 bg-orange-50 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-colors duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Our Location</h4>
                  <p className="text-gray-700">{companyInfo.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 p-6 bg-orange-50 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-colors duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-700">{companyInfo.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-6 bg-orange-50 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-colors duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-700">{companyInfo.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border-2 border-orange-100 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-gray-900">Name *</Label>
                <Input
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  className="bg-white border-orange-200 focus:border-orange-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-gray-900">Email *</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  className="bg-white border-orange-200 focus:border-orange-400"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="contact-phone" className="text-gray-900">Phone *</Label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="bg-white border-orange-200 focus:border-orange-400"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-gray-900">Message *</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your travel plans or any questions..."
                  rows={5}
                  required
                  className="bg-white border-orange-200 focus:border-orange-400"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-semibold"
              >
                <Send className="mr-2" size={20} />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;