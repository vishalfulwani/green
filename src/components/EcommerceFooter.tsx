


const EcommerceFooter = () => {

    return (
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Us Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About Us</h2>
              <p className="text-sm">
                At Green E-commerce, we bring you a handpicked selection of plants, seeds, and gardening tools to nurture your green thumb and create a lush paradise at home.
              </p>
            </div>
  
            {/* Quick Links Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
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
              <h2 className="text-2xl font-bold mb-4">Customer Service</h2>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:underline">Order Tracking</a></li>
                <li><a href="#" className="hover:underline">Returns</a></li>
                <li><a href="#" className="hover:underline">Shipping Info</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
  
            {/* Follow Us Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="text-green-300 hover:text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2V6C15 6.55228 14.5523 7 14 7H10C9.44772 7 9 6.55228 9 6V2Z"></path><path d="M4 7H20C21.1046 7 22 7.89543 22 9V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V9C2 7.89543 2.89543 7 4 7Z"></path></svg>
                </a>
                <a href="#" className="text-green-300 hover:text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 2C4 1.44772 4.44772 1 5 1H19C19.5523 1 20 1.44772 20 2V22C20 22.5523 19.5523 23 19 23H5C4.44772 23 4 22.5523 4 22V2Z"></path></svg>
                </a>
                <a href="#" className="text-green-300 hover:text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.02944 20 3 15.9706 3 12C3 8.02944 7.02944 4 12 4C16.9706 4 21 8.02944 21 12C21 15.9706 16.9706 20 12 20Z"></path></svg>
                </a>
              </div>
            </div>
          </div>
  
          {/* Bottom Section */}
          <div className="mt-8 border-t border-green-700 pt-4 text-center text-sm">
            <p>© 2024 Green E-commerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default EcommerceFooter;
  