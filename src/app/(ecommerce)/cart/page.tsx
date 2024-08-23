'use client'

import { addToCart, clearCart, ICartItem, removeFromCart, updateQuantity } from '@/cartRedux/cartSlice';
import { RootState } from '@/cartRedux/store';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store';
// import { removeFromCart, updateQuantity, clearCart } from '../cartSlice';
// import { ICartItem } from '../cartSlice';

const Page = () => {

  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

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

  return (

    <div className=" mt-16 p-10  bg-[#9cc09c] min-h-screen">
      <div className='container'>

  <h2 className="text-3xl font-bold mb-6 text-green-800">Your Cart</h2>
  {cart.length === 0 ? (
    <p className="text-lg text-gray-600">Your cart is empty.</p>
  ) : (
    <div className="space-y-4">
      {cart.map((item: ICartItem) => (
        <div key={item.product._id} className="cart-item flex items-center p-4 bg-white rounded-lg shadow-md">
          <img
            src={item.product.images[0]} // Display the first image
            alt={item.product.productName}
            className="w-24 h-24 object-cover rounded-lg mr-4"
          />
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-800">{item.product.productName}</h4>
            <p className="text-lg text-gray-600">${parseInt(item.product.sellingPrice) * (item.quantity)}</p>
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
      <button
        onClick={handleClearCart}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Clear Cart
      </button>
    </div>
  )}
  
</div>
</div>

  );
};

export default Page;
