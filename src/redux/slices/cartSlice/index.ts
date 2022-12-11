import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartSliceState} from "./types";

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizzaToCart(state, action) {
      const hasPizza = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size);

      if (hasPizza) {
        hasPizza.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum: number, obj: any) => {
        return (obj.price * obj.count) + sum
      }, 0);
    },
    addCountPizza(state, action) {
      const hasPizza = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size);
      if (hasPizza) {
        hasPizza.count = action.payload.count;
        if (hasPizza.count === 0) {
          state.items = state.items.filter((obj) => obj.id !== action.payload.id);
        }
      }
      state.totalPrice = state.items.reduce((sum: number, obj: any) => {
        return (obj.price * obj.count) + sum
      }, 0);
    },
    deletePizzaToCart(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size);
      state.totalPrice = state.items.reduce((sum: number, obj: any) => {
        return (obj.price * obj.count) + sum
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

export const {addPizzaToCart, addCountPizza, deletePizzaToCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;