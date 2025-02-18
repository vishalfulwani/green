import React from 'react';
import { FaEye, FaRegEye } from 'react-icons/fa';
import { useRecentlyViewed } from '@/viewedRecently/useRecentlyViewed';

const RecentlyViewedButton: React.FC<{ productId: string }> = ({ productId }) => {
  const {
    addProductToRecentlyViewed,
    isProductInRecentlyViewed,
  } = useRecentlyViewed();

  const handleAddToRecentlyViewed = (productId: string) => {
    addProductToRecentlyViewed(productId);
  };

  return (
    <div>
      <div
        className={`text-lg cursor-pointer flex items-center transition-all transform ${
          isProductInRecentlyViewed(productId)
            ? 'text-green-600'
            : 'text-green-600'
        }`}
      >
        {productId && isProductInRecentlyViewed(productId) ? (
            <>
            <FaEye />
          </>
        ) : (
          <div
            onClick={() => handleAddToRecentlyViewed(productId)}
            className="add-to-recently-viewed-btn"
          >
            <FaRegEye />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyViewedButton;
