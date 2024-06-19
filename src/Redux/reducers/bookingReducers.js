import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  dataBooking: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setDataBooking: (state, action) => {
      state.dataBooking = action.payload;
    },
  }
});

export const { setDataBooking} = bookingSlice.actions;

export default bookingSlice.reducer;