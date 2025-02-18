import React from 'react';
import { FaTruck, FaCreditCard, FaSmile } from 'react-icons/fa'; // Import necessary icons

const BenefitsSection: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        {/* Free Delivery */}
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 border-b md:border-b-0 md:border-r border-gray-300 pb-6 md:pb-0 pr-0 md:pr-6">
          <FaTruck className="text-green-600 text-5xl lg:text-3xl mb-4 md:mb-0" />
          <div className="text-center md:text-left">
            <h3 className="text-base font-bold text-black">Free Delivery</h3>
            <p className="text-sm text-gray-600">
              Free shipping around the world for all orders over $120
            </p>
          </div>
        </div>

        {/* Safe Payment */}
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 border-b md:border-b-0 md:border-r border-gray-300 pb-6 md:pb-0 px-0 md:px-6">
          <FaCreditCard className="text-green-600 text-5xl lg:text-3xl mb-4 md:mb-0" />
          <div className="text-center md:text-left">
            <h3 className="text-base font-bold text-black">Safe Payment</h3>
            <p className="text-sm text-gray-600">
              With our payment gateway, don’t worry about your information
            </p>
          </div>
        </div>

        {/* Friendly Services */}
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 pl-0 md:pl-6">
          <FaSmile className="text-green-600 text-5xl lg:text-3xl mb-4 md:mb-0" />
          <div className="text-center md:text-left">
            <h3 className="text-base font-bold text-black">Friendly Services</h3>
            <p className="text-sm text-gray-600">
              You have 30-day return guarantee for every single order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
