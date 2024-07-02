import axios from "axios";
import { setFlight, setFlights, setLoading,  setSeat } from "../reducers/flightReducers";

export const fetchFlights = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      "https://expressjs-production-7d85.up.railway.app/api/v1/flights"
    );
    dispatch(setFlights(response.data.data));
  } catch (error) {
    console.error("Error", error);
    dispatch(setLoading(false));
  }
};

export const fetchFlightDetail = (idFlight) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const responsedetail = await axios.get(
     `https://expressjs-production-7d85.up.railway.app/api/v1/flights/id/${idFlight}`
    );
    dispatch(setFlight(responsedetail.data.data));
   } catch (error) {
      console.error("Error", error);
      dispatch(setLoading(false));
    }
};

export const fetchSeat = (seatClassId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const responseSeat = await axios.get(
     `https://expressjs-production-7d85.up.railway.app/api/v1/seat/${seatClassId}`
    );
    dispatch(setSeat(responseSeat.data));
   } catch (error) {
      console.error("Error", error);
      dispatch(setLoading(false));
    }
};
