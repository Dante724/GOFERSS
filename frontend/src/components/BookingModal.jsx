import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, MessageCircle, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from './ui/checkbox';

const BookingModal = ({ isOpen, onClose, package: pkg }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: undefined,
    guests: '',
    message: '',
    includeGhatWalk: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (selectedDate) => {
    setFormData(prev => ({ ...prev, date: selectedDate }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    
    // Validation
    if (!formData.name || !formData.phone || !formData.date || !formData.guests) {
      toast.error('Missing Information', {
        description: 'Please fill in all required fields.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate final price
      let finalPrice = pkg?.price || pkg?.priceStart || 0;
      if (pkg?.hasOptionalGhatWalk && formData.includeGhatWalk) {
        finalPrice = pkg.priceWithGhatWalk;
      }

      // Get backend URL
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      
      // Prepare booking data
      const bookingData = {
        packageId: pkg?.id,
        customerName: formData.name,
        email: formData.email || null,
        phone: formData.phone,
        travelDate: format(formData.date, 'yyyy-MM-dd'),
        guests: parseInt(formData.guests),
        includeGhatWalk: formData.includeGhatWalk,
        message: formData.message || null
      };

      console.log('Sending booking data:', bookingData);

      // Save booking to backend
      const response = await fetch(`${BACKEND_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const booking = await response.json();
      console.log('Booking created:', booking);

      // Get WhatsApp number from config
      const configResponse = await fetch(`${BACKEND_URL}/api/config`);
      const config = await configResponse.json();
      const whatsappNumber = config.whatsappNumber;

      console.log('WhatsApp number:', whatsappNumber);

      // Create WhatsApp message
      const whatsappMessage = `🕉️ *New Booking Request - Gofers Varanasi*\n\n` +
        `*Booking ID:* ${booking.id}\n` +
        `*Package:* ${pkg?.name}\n` +
        `*Duration:* ${pkg?.duration || 'As per package'}\n` +
        `*Price:* ₹${finalPrice}\n\n` +
        `*Customer Details:*\n` +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email || 'N/A'}\n` +
        `Travel Date: ${format(formData.date, 'PPP')}\n` +
        `Guests: ${formData.guests}\n` +
        (pkg?.hasOptionalGhatWalk ? `Ghat Walk: ${formData.includeGhatWalk ? 'Yes' : 'No'}\n` : '') +
        (formData.message ? `\n*Message:* ${formData.message}` : '');

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      console.log('Opening WhatsApp:', whatsappUrl);

      toast.success('Booking Confirmed!', {
        description: 'Opening WhatsApp to complete your booking...'
      });

      // Small delay to show toast before opening WhatsApp
      setTimeout(() => {
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Reset form and close modal
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: undefined,
          guests: '',
          message: '',
          includeGhatWalk: false
        });
        
        onClose();
        setIsSubmitting(false);
      }, 500);

    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Booking Failed', {
        description: 'Something went wrong. Please try again.'
      });
      setIsSubmitting(false);
    }
  };

  if (!pkg) return null;

  const displayPrice = (pkg.hasOptionalGhatWalk && formData.includeGhatWalk) 
    ? pkg.priceWithGhatWalk 
    : (pkg.price || pkg.priceStart);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-orange-600">
            Book: {pkg.name}
          </DialogTitle>
          <DialogDescription>
            Fill in your details to proceed with the booking
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Package Summary */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-900">Duration:</span>
              <span className="text-gray-700">{pkg.duration}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Price:</span>
              <span className="text-2xl font-bold text-orange-600 flex items-center">
                <IndianRupee size={20} />
                {displayPrice}
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 XXXXX XXXXX"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Travel Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, 'PPP') : 'Select travel date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Number of Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests *</Label>
            <Input
              id="guests"
              name="guests"
              type="number"
              min="1"
              value={formData.guests}
              onChange={handleInputChange}
              placeholder="Enter number of guests"
              required
            />
          </div>

          {/* Optional Ghat Walk for Package 3 */}
          {pkg.hasOptionalGhatWalk && (
            <div className="flex items-center space-x-2 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <Checkbox
                id="ghatWalk"
                checked={formData.includeGhatWalk}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, includeGhatWalk: checked }))
                }
              />
              <label
                htmlFor="ghatWalk"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Add Guided Ghat Walk (+₹500)
              </label>
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Special Requests (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any special requirements or questions..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              disabled={isSubmitting}
            >
              <MessageCircle className="mr-2" size={18} />
              {isSubmitting ? 'Processing...' : 'Continue on WhatsApp'}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Your booking details will be sent to WhatsApp for confirmation
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;

  if (!pkg) return null;

  const displayPrice = (pkg.hasOptionalGhatWalk && formData.includeGhatWalk) 
    ? pkg.priceWithGhatWalk 
    : pkg.price;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-orange-600">
            Book: {pkg.name}
          </DialogTitle>
          <DialogDescription>
            Fill in your details to proceed with the booking
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Package Summary */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-900">Duration:</span>
              <span className="text-gray-700">{pkg.duration}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Price:</span>
              <span className="text-2xl font-bold text-orange-600 flex items-center">
                <IndianRupee size={20} />
                {displayPrice}
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 XXXXX XXXXX"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Travel Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, 'PPP') : 'Select travel date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Number of Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests *</Label>
            <Input
              id="guests"
              name="guests"
              type="number"
              min="1"
              value={formData.guests}
              onChange={handleInputChange}
              placeholder="Enter number of guests"
              required
            />
          </div>

          {/* Optional Ghat Walk for Package 3 */}
          {pkg.hasOptionalGhatWalk && (
            <div className="flex items-center space-x-2 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <Checkbox
                id="ghatWalk"
                checked={formData.includeGhatWalk}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, includeGhatWalk: checked }))
                }
              />
              <label
                htmlFor="ghatWalk"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Add Guided Ghat Walk (+₹500)
              </label>
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Special Requests (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any special requirements or questions..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="mr-2" size={18} />
              Continue on WhatsApp
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Your booking details will be sent to WhatsApp for confirmation
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;