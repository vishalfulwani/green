'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/cartRedux/store'; // Ensure this is correctly pointing to your store
import { addToWishlist, removeFromWishlist } from '@/cartRedux/wishlistSlice';



export const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const addProductToWishlist = (productId: string) => {
    dispatch(addToWishlist(productId)); // Dispatch to add to wishlist
  };

  const removeProductFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId)); // Dispatch to remove from wishlist
  };

  const isProductInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId); // Check if product ID exists in the wishlist
  };

  return {
    wishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    isProductInWishlist,
  };
};
