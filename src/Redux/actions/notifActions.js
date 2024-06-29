import axios from "axios";
import { toast } from "react-toastify";
import { setNotification } from "../reducers/notifReducers";

export const notificationsAll = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    let config = {
      method: "get",
      url: `https://expressjs-production-6cc1.up.railway.app/api/v1/notification/user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);

    if (response.data.status) {
      dispatch(setNotification(response.data.data));
    }
  } catch (error) {
    toast.error("Failed to fetch notifications");
  }
};
