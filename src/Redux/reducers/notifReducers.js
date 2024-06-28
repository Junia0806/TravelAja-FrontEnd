import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
};

export const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setNotification } = notifSlice.actions;

export default notifSlice.reducer;
