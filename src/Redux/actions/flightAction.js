import axios from "axios";
import { setFlight, setFlights, setLoading } from "../reducers/flightReducers";

export const fetchFlights = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      "https://expressjs-develop.up.railway.app/api/v1/flights"
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
     `https://expressjs-develop.up.railway.app/api/v1/flights/${idFlight}`
    );
    dispatch(setFlight(responsedetail.data.data));
    console.log('response.data.data :>> ', responsedetail.data);
   } catch (error) {
      console.error("Error", error);
      dispatch(setLoading(false));
    }
};
