// 'use client'

// import { useWishlist } from '@/wishlist/useWishlist';
// import React from 'react';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

// interface WishlistButtonProps {
//   productId: string; // Pass the product ID
// }

// const WishlistButton: React.FC<WishlistButtonProps> = ({ productId }) => {
//   const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

//   const handleClick = () => {
//     isInWishlist(productId) ? removeFromWishlist(productId) : addToWishlist(productId);
//   };

//   return (
//     <div
//     className={`text-lg cursor-pointer transition-all transform ${
//       isInWishlist(productId)
//         ? 'text-green-600'
//         : 'text-green-600'
//     }`}
//     onClick={handleClick}
//   >
//     {isInWishlist(productId) ? <FaHeart /> : <FaRegHeart />}
//   </div>
//   );
// };

// export default WishlistButton;








import { useWishlist } from '@/wishlist/useWishlist';
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useToast } from './ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"


const ProductCard: React.FC<{ productId: string }> = ({ productId }) => {
  const { addProductToWishlist, removeProductFromWishlist, isProductInWishlist } =
    useWishlist();


    const { toast } = useToast()
    const handleAddToWishlist = (productId: any) => {
      addProductToWishlist(productId)
      toast({
        title: "Success",
        description: "Product added to wishlist",
        className: "toast-success"
    })
    }

  return (
<>
<div
    className={`text-lg cursor-pointer flex items-center transition-all transform ${
      isProductInWishlist(productId)
        ? 'text-green-600'
        : 'text-green-600'
    }`}
  >
      {productId && isProductInWishlist(productId) ? (
        <>
        {/* <button
          onClick={() => removeProductFromWishlist(productId)}
          className="remove-from-wishlist-btn"
        >

        <FaHeart/>
        </button> */}
           <AlertDialog>
           <AlertDialogTrigger asChild>
        <FaHeart/>

           </AlertDialogTrigger>
           <AlertDialogContent className='border-t-4 border-green-700'>
               <AlertDialogHeader >
                   <AlertDialogTitle className="text-center">
                   Are you sure you want to remove this item from your wishlist?
                   </AlertDialogTitle>
               </AlertDialogHeader>
               <AlertDialogFooter>
                   <AlertDialogCancel>Cancel</AlertDialogCancel>
                   <AlertDialogAction onClick={() => removeProductFromWishlist(productId)} className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm">
                       Remove
                   </AlertDialogAction>
               </AlertDialogFooter>
           </AlertDialogContent>
       </AlertDialog>
       </>

      ) : (
        <button
          onClick={() => handleAddToWishlist(productId)}
          className="add-to-wishlist-btn"
        >
        <FaRegHeart/>
        </button>
      )}
      </div>
</>
  
  );
};

export default ProductCard;
