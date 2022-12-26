import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export interface CounterState {
  items: any[],
  status: string,
}

const initialState: CounterState = {
  items: [],
  status: 'loading',
}

export const fetchPizzas: any = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (query) => {
    const {
      category,
      sortBy,
      order,
      search
    }: any = query;
    const {data} = await axios.get(`https://634c67c0acb391d34a853ce2.mockapi.io/item?${category}&sortBy=${sortBy}&order=${order}&${search}`)
    return data;
  }
)

export const pizzas = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  }
})

export const {setItems} = pizzas.actions

export default pizzas.reducer