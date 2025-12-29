import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Packages from '../components/Packages';
import About from '../components/About';
import BlogPreview from '../components/BlogPreview';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Packages />
      <About />
      <BlogPreview />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;