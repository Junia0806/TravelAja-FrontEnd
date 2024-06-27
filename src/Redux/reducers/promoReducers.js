import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  promotions: [],
  page: 1,
};

export const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    setPromotions: (state, action) => {
      state.promotions = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});


export const { setPromotions, setPage } = promoSlice.actions;
export default promoSlice.reducer;
