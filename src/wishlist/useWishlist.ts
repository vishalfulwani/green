// import { useEffect, useState } from 'react';

// export const useWishlist = () => {
//   const [wishlist, setWishlist] = useState<string[]>([]); // Assuming wishlist contains product IDs

//   // Load wishlist from local storage when the component mounts
//   useEffect(() => {
//     const savedWishlist = localStorage.getItem('wishlist');
//     if (savedWishlist) {
//       setWishlist(JSON.parse(savedWishlist));
//     }
//   }, []);

//   // Save wishlist to local storage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('wishlist', JSON.stringify(wishlist));
//   }, [wishlist]);

//   const addToWishlist = (productId: string) => {
//     setWishlist((prevWishlist) => {
//       if (!prevWishlist.includes(productId)) {
//         const updatedWishlist = [...prevWishlist, productId];
//         localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//         return updatedWishlist;
//       }
//       return prevWishlist;
//     });
//   };

//   const removeFromWishlist = (productId: string) => {
//     setWishlist((prevWishlist) => {
//       const updatedWishlist = prevWishlist.filter((id) => id !== productId);
//       localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//       return updatedWishlist;
//     });
//   };

//   const isInWishlist = (productId: string) => wishlist.includes(productId);

//   return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
// };





import { useEffect, useState } from 'react';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    // Initialize state from local storage or an empty array
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (productId: string) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.includes(productId)) {
        return [...prevWishlist, productId];
      }
      return prevWishlist; // No changes needed if already in wishlist
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
};
