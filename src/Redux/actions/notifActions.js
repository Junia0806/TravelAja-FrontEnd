import { setNotification, markAsRead } from "../reducers/notifReducers";
import axios from "axios";

export const notificationsAll = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(
      'https://expressjs-production-7d85.up.railway.app/api/v1/notification/user',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setNotification(response.data.data));
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

export const markNotificationAsRead = (notificationId) => (dispatch) => {
  dispatch(markAsRead(notificationId));
};

