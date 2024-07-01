// import axios from "axios";
// import { toast } from "react-toastify";
// import { setNotification } from "../reducers/notifReducers";

// export const notificationsAll = () => async (dispatch, getState) => {
//   try {
//     const { token } = getState().auth;
//     let config = {
//       method: "get",
//       url: `https://expressjs-production-7255.up.railway.app/api/v1/notification/user`,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const response = await axios.request(config);

//     if (response.data.status) {
//       dispatch(setNotification(response.data.data));
//     }
//   } catch (error) {
//     toast.error("Failed to fetch notifications");
//   }
// };

import { setNotification, markAsRead } from "../reducers/notifReducers";
import axios from "axios";

export const notificationsAll = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(
      'https://expressjs-production-7255.up.railway.app/api/v1/notification/user',
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

