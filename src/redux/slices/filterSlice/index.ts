import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import qs, {ParsedQs} from "qs";
import sort from "../../../component/Sort";

export type Sort = {
  name: string,
  sortProperty: string,
}

export interface CounterState {
  categoryId: number,
  sort: Sort,
  searchValue: string,
}


const initialState: CounterState = {
  categoryId: 0,
  sort: {
    sortProperty: 'rating',
    name: 'популярности',
  },
  searchValue: "",
}

const params: Partial<CounterState> = qs.parse(window.location.search, {
  ignoreQueryPrefix: true,
  interpretNumericEntities: false
});

if (params.categoryId) {
  params.categoryId = Number(params.categoryId);
}

Object.assign(initialState, params);

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortName(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    }
  },
})

export const {setCategoryId, setSortName, setSearchValue} = filterSlice.actions

export default filterSlice.reducer