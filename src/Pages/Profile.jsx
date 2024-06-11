import React, { useState } from "react";
import { FaArrowLeft, FaUserEdit, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8 py-4">
        {/* Top Bar */}
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-blue-500 hover:text-gray-800"
            onClick={() => handleNavigate("/")}
          >
            <FaArrowLeft className="mr-2" /> Beranda
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:space-x-4 justify-center">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <button className="flex items-center w-full text-gray-700 hover:text-blue-500">
                  <FaUserEdit className="mr-2" /> Ubah Profil
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <button className="flex items-center w-full text-gray-700 hover:text-blue-500">
                  <FaCog className="mr-2" /> Pengaturan Akun
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <button className="flex items-center w-full text-gray-700 hover:text-blue-500">
                  <FaSignOutAlt className="mr-2" /> Keluar
                </button>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="w-full max-w-sm">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Ubah Data Profil</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Foto Profil</label>
                <div className="flex items-center mt-2">
                  <img
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    src={profileImage || "https://via.placeholder.com/150"}
                    alt="Profile"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nama Lengkap</label>
                <input
                  type="text"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Nama Lengkap"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nomor Telepon</label>
                <input
                  type="text"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Nomor Telepon"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Email"
                />
              </div>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-gray-800">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
