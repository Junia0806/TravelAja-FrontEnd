import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaFilter, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { notificationsAll } from "../Redux/actions/notifActions";
import NotificationFilter from "../Components/NotificationsFilter";

function NotificationsPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.notification);
  const [filters, setFilters] = useState({
    status: "",
  });
  const [notifications, setNotifications] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [showFilter, setShowFilter] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch(notificationsAll());
  }, [dispatch]);

  useEffect(() => {
    // Load read status from Local Storage
    const readStatus =
      JSON.parse(localStorage.getItem("readNotifications")) || {};
    const updatedData = data?.map((notification) => ({
      ...notification,
      whenRead: readStatus[notification.id] || notification.whenRead,
    }));
    setNotifications(updatedData);
  }, [data]);

  useEffect(() => {
    let filtered = notifications;

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter((notification) =>
        filters.status === "read"
          ? notification.whenRead
          : !notification.whenRead
      );
    }

    // Filter by search keyword
    filtered = filtered?.filter((notification) =>
      notification.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    setFilteredData(filtered);
  }, [notifications, filters, searchKeyword]);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleCardClick = (notificationId) => {
    const updatedNotifications = notifications?.map((notification) =>
      notification.id === notificationId
        ? { ...notification, whenRead: true }
        : notification
    );
    setNotifications(updatedNotifications);

    // Save read status to Local Storage
    const readStatus =
      JSON.parse(localStorage.getItem("readNotifications")) || {};
    readStatus[notificationId] = true;
    localStorage.setItem("readNotifications", JSON.stringify(readStatus));
  };

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-8">
        <button className="flex items-center text-blue-600 hover:text-blue-700">
          <FaArrowLeft className="mr-2" /> Beranda
        </button>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center bg-white p-2 rounded-lg w-full">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            className="w-full bg-transparent outline-none text-blue-600"
            placeholder="Search notifications..."
            value={searchKeyword}
            onChange={handleSearchInputChange}
          />
        </div>
        <button
          className="ml-2 text-blue-600 hover:text-blue-700"
          onClick={handleFilterClick}
        >
          <FaFilter />
        </button>
      </div>
      {showFilter && (
        <NotificationFilter filters={filters} setFilters={setFilters} />
      )}
      <div className="mt-4 space-y-4">
        {filteredData?.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleCardClick(notification.id)}
            className={`flex items-start p-4 rounded-lg shadow-md cursor-pointer ${
              notification.whenRead ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div className="flex-1">
              <div className="text-gray-700 font-semibold">
                {notification.title}
              </div>
              <div className="text-gray-900">{notification.message}</div>
            </div>
            {!notification.whenRead && (
              <div className="ml-4 w-3 h-3 bg-red-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPage;
