import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItemFromCart: (state, action: PayloadAction<CartItem>) => {
      const itemExists = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (itemExists && itemExists.quantity > 1) {
        itemExists.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.name !== action.payload.name
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
