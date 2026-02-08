import React, { useState, createContext, useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import { Toaster } from './components/ui/sonner';
import BookingModal from './components/BookingModal';

// Create context for booking modal
export const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

// Default package for general inquiries from navbar
const generalInquiryPackage = {
  id: 'general-inquiry',
  name: 'General Inquiry / Custom Package',
  duration: 'Flexible',
  price: 0,
  priceStart: 0,
  description: 'Tell us your requirements and we will customize the perfect Varanasi experience for you.'
};

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(generalInquiryPackage);

  const openBookingModal = (pkg = generalInquiryPackage) => {
    setSelectedPackage(pkg);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
  };

  return (
    <BookingContext.Provider value={{ openBookingModal, closeBookingModal }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        
        {/* Global Booking Modal */}
        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={closeBookingModal} 
          package={selectedPackage} 
        />
      </div>
    </BookingContext.Provider>
  );
}

export default App;