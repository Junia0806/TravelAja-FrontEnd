import React, { useEffect, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationsAll,
  markNotificationAsRead,
} from "../Redux/actions/notifActions";
import NotificationFilter from "../Components/NotificationsFilter";
import StatusHistory from "../assets/status pesanan/Status Airlines(5).png";

function NotificationsPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.notif.notification);
  const [filters, setFilters] = useState({
    status: "",
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch(notificationsAll());
  }, [dispatch]);

  const handleFilterClick = () => {
    setFilters(!filters);
  };

  const handleCardClick = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredData = data
    ?.filter((notification) =>
      filters.status === "read"
        ? notification.whenRead
        : filters.status === "unread"
        ? !notification.whenRead
        : true
    )
    .filter(
      (notification) =>
        notification.title
          .toLowerCase()
          .includes(searchKeyword.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchKeyword.toLowerCase())
    );

  return (
    <div className="container mx-auto p-4">
      <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center bg-white p-2 rounded-lg w-full">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            className="w-full bg-transparent outline-none text-blue-600"
            placeholder="Cari Notifikasi Untukmu"
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
      {filters && (
        <NotificationFilter filters={filters} setFilters={setFilters} />
      )}
      <div className="mt-4 space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((notification) => (
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
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center flex-grow text-black">
                Tidak Ada Notifikasi
              </h2>
            </div>
            <p className="text-gray-600 text-center text-base sm:text-lg md:text-xl mb-4">
              Tidak ada notifikasi yang sesuai dengan filter Anda. Silahkan ubah
              filter atau coba lagi nanti.
            </p>

            <img
              className="max-w-full h-auto mx-auto rounded-lg"
              src={StatusHistory}
              alt="Status Tidak Ada Notifikasi"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
