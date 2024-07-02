import axios from "axios";
import { setPromotions} from "../reducers/promoReducers";

export const fetchPromotions = (page) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://expressjs-production-7d85.up.railway.app/api/v1/promotion?page=${page}&limit=4`
    );
    if (response.data && Array.isArray(response.data.data)) {
      dispatch(setPromotions(response.data.data));
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching promotions:", error);
    dispatch(setPromotions([]));
  }
};