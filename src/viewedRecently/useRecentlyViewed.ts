'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/cartRedux/store'; // Ensure this points to your store setup
import { addToRecentlyViewed } from '@/cartRedux/recentlyViewedSlice';

export const useRecentlyViewed = () => {
  const dispatch = useDispatch();
  const recentlyViewed = useSelector((state: RootState) => state.recentlyViewed.items);

  const addProductToRecentlyViewed = (productId: string) => {
    dispatch(addToRecentlyViewed(productId)); // Dispatch to add to recently viewed
  };



  const isProductInRecentlyViewed = (productId: string): boolean => {
    return recentlyViewed.includes(productId); // Check if product ID exists in recently viewed
  };

  return {
    recentlyViewed,
    addProductToRecentlyViewed,
    isProductInRecentlyViewed,
  };
};
