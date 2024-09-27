// import { useWishlist } from '@/wishlist/useWishlist';
// import React from 'react';
// import { FaHeart } from 'react-icons/fa';

// interface WishlistButtonProps {
//   productId: string; // Only pass the product ID
// }

// const WishlistButton: React.FC<WishlistButtonProps> = ({ productId }) => {
//   const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

//   const handleClick = () => {
//     if (isInWishlist(productId)) {
//       removeFromWishlist(productId);
//     } else {
//       addToWishlist(productId); // Only pass the product ID
//     }
//   };

//   return (
 
// <FaHeart
//   className={`text-lg cursor-pointer transition-all transform ${
//     isInWishlist(productId)
//       ? 'text-green-500  scale-110'
//       : 'text-gray-400  hover:scale-125'
//   }`}
//   onClick={handleClick}
// />


//   );
// };

// export default WishlistButton;







import { useWishlist } from '@/wishlist/useWishlist';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

interface WishlistButtonProps {
  productId: string; // Pass the product ID
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ productId }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const handleClick = () => {
    isInWishlist(productId) ? removeFromWishlist(productId) : addToWishlist(productId);
  };

  return (
    <FaHeart
      className={`text-lg cursor-pointer transition-all transform ${
        isInWishlist(productId) ? 'text-green-500 scale-110' : 'text-gray-400 hover:scale-125'
      }`}
      onClick={handleClick}
    />
  );
};

export default WishlistButton;
