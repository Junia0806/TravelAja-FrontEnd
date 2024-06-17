import React from "react";

function NotificationFilter({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col">
        <label className="text-gray-700">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">All</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
      </div>
    </div>
  );
}

export default NotificationFilter;
