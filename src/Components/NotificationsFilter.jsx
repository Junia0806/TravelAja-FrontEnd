/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";

function NotificationFilter({ filters, setFilters }) {
  const data = useSelector((state) => state.notif.notification);


  const totalCount = data?.length || 0;
  const unreadCount = data?.filter(notification => !notification.whenRead).length || 0;
  const readCount = data?.filter(notification => notification.whenRead).length || 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col">
        <label className="text-gray-700">Status</label>
        <div className="flex items-center justify-between mb-2">
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 flex-grow"
          >
            <option value="">Semua</option>
            <option value="unread">Belum Dibaca</option>
            <option value="read">Terbaca</option>
          </select>
        </div>
        <p className="text-gray-600 text-sm">
          Total Notifikasi: {totalCount} | Belum Dibaca: {unreadCount} | Terbaca: {readCount}
        </p>
      </div>
    </div>
  );
}

export default NotificationFilter;
