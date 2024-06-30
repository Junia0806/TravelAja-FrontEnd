import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
  name: "notif",
  initialState: {
    notification: [],
    unreadCount: 0,
  },

  reducers: {
    setNotification: (state, action) => {
      const notifications = action.payload;

      const savedStatus = JSON.parse(localStorage.getItem('notificationStatus')) || {};
      const updatedNotifications = notifications.map(notification => ({
        ...notification,
        whenRead: savedStatus[notification.id] || notification.whenRead,
      }));

      updatedNotifications.sort((a, b) => b.id - a.id);

      state.notification = updatedNotifications;
      state.unreadCount = updatedNotifications.filter(
        (notification) => !notification.whenRead
      ).length;

      const newStatus = {};
      updatedNotifications.forEach(notification => {
        newStatus[notification.id] = notification.whenRead;
      });
      localStorage.setItem('notificationStatus', JSON.stringify(newStatus));
    },
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notification.find(
        (n) => n.id === notificationId
      );
      if (notification && !notification.whenRead) {
        notification.whenRead = true;
        state.unreadCount -= 1;

        const savedStatus = JSON.parse(localStorage.getItem('notificationStatus')) || {};
        savedStatus[notificationId] = true;
        localStorage.setItem('notificationStatus', JSON.stringify(savedStatus));
      }
    },
    markAllAsRead: (state) => {
      state.notification.forEach((notification) => {
        if (!notification.whenRead) {
          notification.whenRead = true;
        }
      });
      state.unreadCount = 0;

      const savedStatus = {};
      state.notification.forEach(notification => {
        savedStatus[notification.id] = notification.whenRead;
      });
      localStorage.setItem('notificationStatus', JSON.stringify(savedStatus));
    },
  },
});

export const { setNotification, markAsRead, markAllAsRead } = notifSlice.actions;

export default notifSlice.reducer;
