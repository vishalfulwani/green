// cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
  product: {
    _id: string;
    productName: string;
    productDesc: string;
    price: string;
    sellingPrice: string;
    images: string[];
    category: string;
    subCategory: string;
    rating: string;
  };
  quantity: number;
}

interface CartState {
  cart: ICartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const existingItem = state.cart.find(item => item.product._id === action.payload.product._id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
      // localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.product._id !== action.payload);
      // localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
      const existingItem = state.cart.find(item => item.product._id === action.payload.productId);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
      // localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      // localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
