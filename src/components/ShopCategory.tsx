import React from 'react';

const ShopCategory: React.FC = () => {
  return (
    <div className="container shop-category-page-wrapper mx-auto py-10 h-[400px] px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Card */}
      <div className="relative bg-gray-100 h-full rounded-lg  product-category-card overflow-hidden shadow-md flex flex-col sm:flex-row sm:items-center"
      style={{'backgroundImage':'url(https://htmldemo.net/lukani/lukani/assets/img/bg/banner1.jpg)'}}
      
      >
        <div className="p-6 sm:w-1/2">
          <h4 className="text-sm font-semibold text-gray-600">Big Sale Products</h4>
          <h2 className="text-2xl font-bold text-black mb-4">Plants For Interior</h2>
          <button className="text-green-600 font-semibold border-b-2 border-green-600 hover:text-green-800 hover:border-green-800 transition">SHOP NOW</button>
        </div>
      </div>

      {/* Second Card */}
      <div className="relative bg-gray-100 product-category-card h-full rounded-lg overflow-hidden shadow-md flex flex-col sm:flex-row sm:items-center"
      style={{'backgroundImage':'url(https://htmldemo.net/lukani/lukani/assets/img/bg/banner2.jpg)'}}
      >
        <div className="p-6 sm:w-1/2">
          <h4 className="text-sm font-semibold text-gray-600">Top Products</h4>
          <h2 className="text-2xl font-bold text-black mb-4">Plants For Healthy</h2>
          <button className="text-green-600 font-semibold border-b-2 border-green-600 hover:text-green-800 hover:border-green-800 transition">SHOP NOW</button>
        </div>
        {/* <img
          src="https://htmldemo.net/lukani/lukani/assets/img/bg/banner2.jpg"
          alt="Plants For Healthy"
          className="sm:w-1/2 w-full h-auto object-cover"
        /> */}
      </div>
    </div>
  );
};

export default ShopCategory;
