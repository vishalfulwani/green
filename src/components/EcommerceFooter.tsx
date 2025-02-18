'use client'

import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";


const EcommerceFooter = () => {

    return (
      <footer className="bg-green-800 text-white pt-12 pb-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between gap-8 py-4">
            {/* About Us Section */}
            <div className="md:w-1/4 ">
              <h2 className="text-2xl font-bold mb-4">Green Ecommerce</h2>
              <p className="text-sm">
                At Green E-commerce, we bring you a handpicked selection of plants, seeds, and gardening tools to nurture your green thumb and create a lush paradise at home.
              </p>
            </div>
  
            {/* Quick Links Section */}
            <div>
              <h2 className="text-2xl min-w-40 font-bold mb-4">Quick Links</h2>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">Shop</a></li>
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
              </ul>
            </div>
  
            {/* Customer Service Section */}
            <div>
              <h2 className="text-2xl min-w-40 font-bold mb-4">Customer Service</h2>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:underline">Order Tracking</a></li>
                <li><a href="#" className="hover:underline">Returns</a></li>
                <li><a href="#" className="hover:underline">Shipping Info</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
  
            {/* Follow Us Section */}
            <div>
              <h2 className="text-2xl min-w-40 font-bold mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="text-green-300 hover:text-green-400">
                  <FaWhatsapp className="text-2xl"/>
                </a>
                <a href="#" className="text-green-300 hover:text-green-400">
                  <FaInstagram className="text-2xl"/>
                </a>
                <a href="#" className="text-green-300 hover:text-green-400">
                  <FaTelegram className="text-2xl"/>
                </a>
              </div>
            </div>
          </div>
  
          {/* Bottom Section */}
          <div className="mt-8 border-t border-green-700 pt-4 pb-2 text-center text-sm">
            <p>© 2024 Green E-commerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default EcommerceFooter;
  