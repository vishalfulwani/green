// import React from "react";
// import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB
// import Rating from "./Rating"; // Adjust the import path as needed
// import WishlistButton from "./wishlistButton"; // Adjust the import path as needed

// // Define the IProduct interface
// export interface IProduct {
//   _id: ObjectId; // Keep it as ObjectId
//   productName: string;
//   price: string;
//   sellingPrice: string;
//   rating: string;
//   images: string[];
//   category: string;
// }

// interface ProductCardProps {
//   product: IProduct; // Use IProduct here
//   hoveredProductId: string | null;
//   setHoveredProductId: (id: string | null) => void;
//   handleAddToCart: (product: IProduct) => void;
//   goToProductPage: (category: string, id: string) => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   hoveredProductId,
//   setHoveredProductId,
//   handleAddToCart,
//   goToProductPage,
// }) => {
//   return (
//     <div
//       className="p-4"
//       onMouseEnter={() => setHoveredProductId(product._id.toString())} // Convert _id to string for comparison
//       onMouseLeave={() => setHoveredProductId(null)}
//     >
//       <div className="relative bg-white rounded-lg sm:w-[350px] lg:w-[340px] overflow-hidden shadow-xl p-2 border-y-4 border-green-700 transform hover:scale-105 transition-transform duration-300 group">
//         {/* Badge for Discount or Bestseller */}
//         <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg">
//         {product.sellingPrice && product.price
//   ? `${Math.round(((parseInt(product.price) - parseInt(product.sellingPrice)) / parseInt(product.price)) * 100)}% OFF`
//   : "Best Seller"}
//         </div>

//         {/* Primary Image */}
//         <img
//           src={product.images[0]}
//           alt={product.productName}
//           className={`w-full h-32 sm:h-48 object-cover transition-opacity duration-500 ${
//             hoveredProductId === product._id.toString() ? "opacity-0" : "opacity-100"
//           }`}
//         />

//         {/* Secondary Image */}
//         <img
//           src={product.images[1]}
//           alt={product.productName}
//           className={`w-full h-32 sm:h-48 object-cover transition-opacity duration-500 absolute inset-0 ${
//             hoveredProductId === product._id.toString() ? "opacity-100" : "opacity-0"
//           }`}
//         />

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-transparent to-transparent opacity-30"></div>

//         <div className="p-4 text-left">
//           {/* Product Name */}
//           <h3 className="text-base sm:text-lg font-extrabold text-green-900 mb-2 tracking-wide">
//             {product.productName}
//           </h3>

//           {/* Rating and Wishlist */}
//           <div className="flex justify-between my-3 items-center">
//             <Rating rating={parseFloat(product.rating)} />
//             <WishlistButton productId={product._id.toString()} />
//           </div>

//           {/* Price Section */}
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-2xl sm:text-3xl font-bold text-green-700">
//               ${product.sellingPrice}
//             </span>
//             <span className="text-sm sm:text-base line-through text-gray-500">
//               ${product.price}
//             </span>
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full shadow-md hover:from-green-700 hover:to-green-800 transition duration-300 transform hover:scale-105"
//             onClick={() => handleAddToCart(product)}
//           >
//             Add to Cart
//           </button>

//           {/* View Product Button */}
//           <button
//             className="mt-3 items-center justify-center w-full px-4 py-2 border border-green-600 text-green-700 font-semibold rounded-full hover:bg-green-600 hover:text-white transition duration-300 hidden group-hover:block"
//             onClick={() => goToProductPage(product.category, product._id.toString())} // Convert _id to string for URL
//           >
//             View Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;










import React from "react";
import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB
import Rating from "./Rating"; // Adjust the import path as needed
import WishlistButton from "./wishlistButton"; // Adjust the import path as needed
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import RecentlyViewedButton from "./recentlyViewedButton";

// Define the IProduct interface
export interface IProduct {
  _id: ObjectId; // Keep it as ObjectId
  productName: string;
  price: string;
  sellingPrice: string;
  rating: string;
  images: string[];
  category: string;
}

interface ProductCardProps {
  product: IProduct; // Use IProduct here
  hoveredProductId: string | null;
  setHoveredProductId: (id: string | null) => void;
  handleAddToCart: (product: IProduct) => void;
  goToProductPage: (category: string, id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hoveredProductId,
  setHoveredProductId,
  handleAddToCart,
  goToProductPage,
}) => {


  console.log("pppppppppppppppp",product)

  return (
    <div
      className="p-4"
      onMouseEnter={() => setHoveredProductId(product._id.toString())} // Convert _id to string for comparison
      onMouseLeave={() => setHoveredProductId(null)}
      onClick={() => goToProductPage(product.category, product._id.toString())}
      style={{ width: '100%' }}

    >
      <div
        className="relative bg-white rounded-lg  overflow-hidden shadow-xl p-2 border border-gray-300 transform hover:scale-105 transition-transform duration-300"
      >
        {/* Discount Badge */}
        {product.sellingPrice && product.price && (
          // <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-full">
          //   -{Math.round(
          //     ((parseInt(product.price) - parseInt(product.sellingPrice)) /
          //       parseInt(product.price)) *
          //       100
          //   )}%
          // </div>
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg">
            {product.sellingPrice && product.price
              ? `${Math.round(((parseInt(product.price) - parseInt(product.sellingPrice)) / parseInt(product.price)) * 100)}% OFF`
              : "Best Seller"}
          </div>
        )}

        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.productName}
          className="w-full h-48 object-contain"
        />

        {/* Hover Icons Section */}
        <div
          className={`absolute right-2 bottom-2 bg-white bg-opacity-90 p-2 rounded-lg shadow-md transition-opacity duration-300 ${hoveredProductId === product._id.toString() ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="flex space-x-4 text-gray-700">
            <button className="hover:text-green-700" onClick={() => handleAddToCart(product)}>
              <FaShoppingCart
                className="text-xl cursor-pointer text-green-600 hover:text-green-700 transition-all"
              />
            </button>

            <WishlistButton productId={product._id.toString()} />

            <button className="hover:text-green-700"
              onClick={() => goToProductPage(product.category, product._id.toString())} // Convert _id to string for URL
            >
                <RecentlyViewedButton productId={product._id.toString()}/>
            </button>
          </div>
        </div>

        <div className="p-4 text-center">
          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.productName}
          </h3>

          {/* Price Section */}
          <div className="flex justify-center items-center mb-4">
            <span className="text-lg font-bold text-green-700 mr-2">
            ₹{product.sellingPrice}
            </span>
            <span className="text-sm line-through text-gray-500">
            ₹{product.price}
            </span>
          </div>

          {/* Rating */}
          <div className="flex justify-center items-center text-gray-500">
            <Rating rating={parseFloat(product.rating)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
