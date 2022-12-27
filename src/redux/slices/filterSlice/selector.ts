import {RootState} from "../../store";

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterSort = (state: RootState) => state.filter.sort;
export const selectFilterCategori = (state: RootState) => state.filter.categoryId;