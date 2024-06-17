import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  flights: [],
  loading: true,
  filterCity: '',
  uniqueCities: [], 
  data: null,
};

export const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFilterCity: (state, action) => {
      state.filterCity = action.payload;
    },
    extractUniqueCities: (state, action) => {
      const cities = action.payload.map(flight => flight.arrival_airport.city);
      state.uniqueCities = [...new Set(cities)];
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
    }
  }
});

export const { setFilterCity, extractUniqueCities, setLoading, setFlights, setFlight } = flightSlice.actions;

export default flightSlice.reducer;
