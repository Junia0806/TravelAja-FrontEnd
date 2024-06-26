/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaUserEdit, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {
  updateProfile,
  uploadAvatar,
  getMe,
  logout,
} from "../Redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

function Profile() {
  const [avatarFile, setAvatarFile] = useState("");
  const [name, setName] = useState("");
  const [no_telp, setNo_telp] = useState("");

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe(null, null, null));
    if (location.state) {
      if (location.state.info) toast.info(location.state.info);
      else if (location.state.success) {
        toast.success(location.state.success);
      }
      navigate(".", { replace: false });
    }
  }, [location, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadAvatar(formData)).then(() => {
        dispatch(getMe());
      });
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda akan Logout.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout(navigate));
        Swal.fire("Logout!", "Anda telah Logout.", "success");
      }
    });
  };


  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = { name, no_telp };
    dispatch(updateProfile(profileData, navigate));
  };

  return (
    <div>
      <ToastContainer />
      <div className="container mx-auto px-4 sm:px-8 py-4">
       

        <div className="flex flex-col md:flex-row md:items-start md:space-x-4 justify-center">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <button
                  className="flex items-center w-full text-gray-700 hover:text-blue-500"
                  onClick={() => handleNavigate("/profile")}
                >
                  <FaUserEdit className="mr-2" /> Ubah Profil
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <button
                  className="flex items-center w-full text-gray-700 hover:text-blue-500"
                  onClick={() => handleNavigate("/pengaturan")}
                >
                  <FaCog className="mr-2" /> Pengaturan Akun
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <button
                  className="flex items-center w-full text-gray-700 hover:text-blue-500"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>
          </div>

          <div className="w-full max-w-sm">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Ubah Data Profil</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Foto Profil</label>
                  <div className="flex items-center mt-2">
                    <img
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      src={
                        avatarFile
                          ? URL.createObjectURL(avatarFile)
                          : user?.avatar_url ||
                            "https://via.placeholder.com/150"
                      }
                      alt="avatarFile"
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
                    placeholder={user?.name || "Masukkan Nama Lengkap"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Nomor Telepon</label>
                  <input
                    type="text"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    placeholder={user?.no_telp || "Masukkan Nomor Telepon"}
                    value={no_telp}
                    onChange={(e) => setNo_telp(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                >
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
