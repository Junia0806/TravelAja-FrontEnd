import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flights: [],
  loading: true,
  filterClass: '',
  uniqueCities: [], 
  data: null,
  seat: []
};

export const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFilterClass: (state, action) => {
      state.filterClass = action.payload;
    },
    extractUniqueCities: (state, action) => {
      const classes = action.payload.map(flight => flight?.seatclass?.seat_class_type);
      state.uniqueCities = [...new Set(classes)];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFlights: (state, action) => {
      state.flights = action.payload;
      state.loading = false;
    },
    setFlight: (state,action) =>{
      state.data = action.payload;
    },
    setSeat: (state,action) =>{
      state.seat = action.payload;
    },
  }
});

export const { setFilterClass, extractUniqueCities, setLoading, setFlights, setFlight,  setSeat} = flightSlice.actions;

export default flightSlice.reducer;
