'use client'

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
