import {configureStore} from '@reduxjs/toolkit'
import filterReducer from "./slices/filterSlice"
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

