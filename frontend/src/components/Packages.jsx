import React, { useState } from 'react';
import { tourPackages } from '../mockData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, IndianRupee, Check, Sparkles } from 'lucide-react';
import BookingModal from './BookingModal';

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300">
            <Sparkles className="w-3 h-3 mr-1" />
            Our Offerings
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sacred Journey Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Carefully curated experiences to explore the spiritual heart of Varanasi
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourPackages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className="group hover:shadow-2xl transition-all duration-300 border-2 border-orange-100 hover:border-orange-300 overflow-hidden"
            >
              {/* Package Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange-600 text-white border-0 shadow-lg">
                    {pkg.duration}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">{pkg.name}</CardTitle>
                <CardDescription className="text-base text-gray-600 mt-2">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center text-3xl font-bold text-orange-600">
                      <IndianRupee size={24} />
                      {pkg.price}
                    </div>
                    {pkg.hasOptionalGhatWalk && (
                      <p className="text-sm text-gray-500 mt-1">
                        With Ghat Walk: ₹{pkg.priceWithGhatWalk}
                      </p>
                    )}
                  </div>
                  <Clock className="text-gray-400" size={20} />
                </div>

                {/* Inclusions */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Inclusions:</h4>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <Check className="text-green-600 mr-2 flex-shrink-0" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleBookNow(pkg)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        package={selectedPackage}
      />
    </section>
  );
};

export default Packages;