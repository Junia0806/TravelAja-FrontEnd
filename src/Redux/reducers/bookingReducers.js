import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataBooking: null,
  dataHistory: [],
  details: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setDataBooking: (state, action) => {
      state.dataBooking = action.payload;
    },
    setDataHistory: (state, action) => {
      state.dataHistory = action.payload;
    },
  },
});

export const { setDataBooking, setDataHistory } = bookingSlice.actions;

export default bookingSlice.reducer;
