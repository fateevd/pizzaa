import {createSlice} from "@reduxjs/toolkit";
import {CartSliceState} from "./types";
import {calculateTotalPrice, saveLocalStorage} from "../../../utils";

const storage = localStorage.getItem("cart");

const initialState: CartSliceState = storage ? JSON.parse(storage) : {
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
      state.totalPrice = calculateTotalPrice(state.items);
      saveLocalStorage({items: state.items, totalPrice: state.totalPrice});
    },
    addCountPizza(state, action) {
      const hasPizza = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size);
      if (hasPizza) {
        hasPizza.count = action.payload.count;
        if (hasPizza.count === 0) {
          state.items = state.items.filter((obj) => obj.id !== action.payload.id);
        }
      }
      state.totalPrice = calculateTotalPrice(state.items);
      saveLocalStorage({items: state.items, totalPrice: state.totalPrice});
    },
    deletePizzaToCart(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size);
      state.totalPrice = calculateTotalPrice(state.items);
      saveLocalStorage({items: state.items, totalPrice: state.totalPrice});
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    }
  }
});

export const {addPizzaToCart, addCountPizza, deletePizzaToCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;