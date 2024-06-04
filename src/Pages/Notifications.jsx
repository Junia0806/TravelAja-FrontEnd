import React, { useState } from "react";
import { FaArrowLeft, FaFilter, FaSearch } from "react-icons/fa";
import NotificationFilter from "../Components/NotificationsFilter";

const notifications = [
  {
    id: 1,
    type: "Promotion",
    title: "Congratulations! You got a ticket discount",
    time: "2024-03-20T14:04:00",
    read: true,
  },
  {
    id: 2,
    type: "Flight Update",
    title: "Schedule change on your booking code 4509IK",
    time: "2024-03-05T10:45:00",
    read: false,
  },
];

function NotificationsPage() {
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    startDate: "",
    endDate: "",
  });
  const [showFilter, setShowFilter] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    const { status, type, startDate, endDate } = filters;
    const notificationDate = new Date(notification.time);

    if (
      status &&
      ((status === "unread" && notification.read) ||
        (status === "read" && !notification.read))
    ) {
      return false;
    }

    if (type && notification.type !== type) {
      return false;
    }

    if (startDate && notificationDate < new Date(startDate)) {
      return false;
    }

    if (endDate && notificationDate > new Date(endDate)) {
      return false;
    }

    return true;
  });

  return (
    <div className="container mx-auto p-4">
      {/* Top Bar */}
      <div className="flex items-center mb-8">
        <button className="flex items-center text-blue-600 hover:text-blue-700">
          <FaArrowLeft className="mr-2" /> Beranda
        </button>
      </div>

      {/* Notification Bar */}
      <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center bg-white p-2 rounded-lg w-full">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            className="w-full bg-transparent outline-none text-blue-600"
            placeholder="Search notifications..."
          />
        </div>
        <button
          className="ml-2 text-blue-600 hover:text-blue-700"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter />
        </button>
      </div>

      {/* Filter Component */}
      {showFilter && (
        <div className="mt-4 md:flex md:justify-between">
          <NotificationFilter filters={filters} setFilters={setFilters} />
        </div>
      )}

      {/* Notifications List */}
      <div className="mt-4 space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start p-4 rounded-lg shadow-md ${
              notification.read ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div className="flex-1">
              <div className="text-gray-700 font-semibold">
                {notification.type}
              </div>
              <div className="text-gray-900">{notification.title}</div>
              <div className="text-gray-500 text-sm">
                {new Date(notification.time).toLocaleString()}
              </div>
            </div>
            {!notification.read && (
              <div className="ml-4 w-3 h-3 bg-red-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPage;
