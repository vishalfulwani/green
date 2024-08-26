// 'use client'

// import { addToCart, clearCart, ICartItem, removeFromCart, updateQuantity } from '@/cartRedux/cartSlice';
// import { RootState } from '@/cartRedux/store';
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// // import { RootState } from '../store';
// // import { removeFromCart, updateQuantity, clearCart } from '../cartSlice';
// // import { ICartItem } from '../cartSlice';

// const Page = () => {

//   const cart = useSelector((state: RootState) => state.cart.cart);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Load cart from localStorage when component mounts
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       const parsedCart: ICartItem[] = JSON.parse(storedCart);
//       parsedCart.forEach(item => dispatch(addToCart(item)));
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     // Save cart to localStorage whenever it changes
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);


//   const handleRemoveFromCart = (productId: string) => {
//     dispatch(removeFromCart(productId));
//   };

//   const handleQuantityChange = (productId: string, newQuantity: number) => {
//     dispatch(updateQuantity({ productId, quantity: newQuantity }));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (

//     <div className=" mt-16 p-10  bg-[#9cc09c] min-h-screen">
//       <div className='container'>

//   <h2 className="text-3xl font-bold mb-6 text-green-800">Your Cart</h2>
//   {cart.length === 0 ? (
//     <p className="text-lg text-gray-600">Your cart is empty.</p>
//   ) : (
//     <div className="space-y-4">
//       {cart.map((item: ICartItem) => (
//         <div key={item.product._id} className="cart-item flex items-center p-4 bg-white rounded-lg shadow-md">
//           <img
//             src={item.product.images[0]} // Display the first image
//             alt={item.product.productName}
//             className="w-24 h-24 object-cover rounded-lg mr-4"
//           />
//           <div className="flex-1">
//             <h4 className="text-xl font-semibold text-gray-800">{item.product.productName}</h4>
//             <p className="text-lg text-gray-600">${parseInt(item.product.sellingPrice) * (item.quantity)}</p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <input
//               type="number"
//               value={item.quantity}
//               onChange={(event) => handleQuantityChange(item.product._id, parseInt(event.target.value, 10))}
//               min="1"
//               className="w-16 text-center border border-gray-300 rounded-md p-1"
//             />
//             <button
//               onClick={() => handleRemoveFromCart(item.product._id)}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}
//       <button
//         onClick={handleClearCart}
//         className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//       >
//         Clear Cart
//       </button>
//     </div>
//   )}
  
// </div>
// </div>

//   );
// };

// export default Page;
















// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------


'use client'

import { addToCart, clearCart, ICartItem, removeFromCart, updateQuantity } from '@/cartRedux/cartSlice';
import { RootState } from '@/cartRedux/store';
import { ApiResponse } from '@/helpers/ApiResponse';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Page = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState<number>(0);
  const [code, setCode] = useState('');
  const [codeMsg, setCodeMsg] = useState('');

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart: ICartItem[] = JSON.parse(storedCart);
      parsedCart.forEach(item => dispatch(addToCart(item)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDiscount(parseFloat(event.target.value));
  // };


  // apply coupon
  useEffect(() =>{
    const applyCoupon = async () =>{
     try {
       const response = await axios.post('/api/admin/apply-coupon', {
         code
       })
       const disc = response.data.data?.discount
       setDiscount(disc)
       console.log("-----",disc)
       calculateTotal()
       setCodeMsg("Coupon applyed")
      } catch (error) {
        console.error("Error applying coupon",error)
        const axiosError = error as AxiosError<ApiResponse>
        let errorMessage = axiosError.response?.data.message
        console.log(errorMessage)
        setDiscount(0)
        setCodeMsg("Invalid or expired coupon code")
     }
    }
    applyCoupon()

  },[code])

  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.product.sellingPrice) * item.quantity, 0);
    const total = subtotal - (subtotal * discount / 100);
    return total.toFixed(2);
  };


  // check user logged or not
  const {data:session} = useSession()
  

  // const onClickBuy = () => {
  //   if (session) {
  //     dispatch(addOrder());
  //     dispatch(clearCart());
  //     navigate('/orders');
  //     } else {
  //       navigate('/login');
  //     }
  // }

  return (
    <>
       <Head>
        <title>Cart </title>
        <meta name="description" content="This is the cart page." />
      </Head>
    <div className="mt-16 p-10 bg-[#9cc09c] min-h-screen">
      <div className='container'>
        <h2 className="text-3xl font-bold mb-6 text-green-800">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item: ICartItem) => (
              <div key={item.product._id} className="cart-item flex items-center p-4 bg-white rounded-lg shadow-md">
                <img
                  src={item.product.images[0]} 
                  alt={item.product.productName}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-800">{item.product.productName}</h4>
                  <p className="text-lg text-gray-600">${(parseFloat(item.product.sellingPrice) * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(event) => handleQuantityChange(item.product._id, parseInt(event.target.value, 10))}
                    min="1"
                    className="w-16 text-center border border-gray-300 rounded-md p-1"
                  />
                  <button
                    onClick={() => handleRemoveFromCart(item.product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Discount Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Apply Coupon</h3>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Coupon Code"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <p className='text-xs py-1'>{codeMsg}</p>
            </div>

            {/* Cart Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Cart Summary</h3>
              <div className="flex justify-between mb-4">
                <span className="text-lg text-gray-700">Subtotal:</span>
                <span className="text-lg font-semibold text-gray-800">${cart.reduce((acc, item) => acc + parseFloat(item.product.sellingPrice) * item.quantity, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-lg text-gray-700">Discount:</span>
                <span className="text-lg font-semibold text-gray-800">-{discount}%</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-lg text-gray-700">Total:</span>
                <span className="text-2xl font-bold text-green-800">${calculateTotal()}</span>
              </div>
              <button
                onClick={handleClearCart}
                className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={handleClearCart}
                className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Buy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Page;

