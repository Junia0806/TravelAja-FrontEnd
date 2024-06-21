import React, { useEffect } from "react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Logo from "../assets/Logo.png";
import { FaUser, FaBell } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, getMe } from "../Redux/actions/authActions";
import Swal from "sweetalert2";
const Header = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe(null, null, null));
  }, [dispatch]);

  const handleLogout = () => {
    // Show SweetAlert confirmation
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

  const handleNotificationsClick = () => {
    navigate("/notif");
  };

  return (
    <>
      <Navbar fluid rounded className="bg-white m-0 p-3">
        <Navbar.Brand href="#">
          <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo Travel Aja" />
        </Navbar.Brand>
        <div className="flex md:order-2 items-center">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-white text-[#00B7C2] border border-[#00B7C2] py-2 px-4 rounded-md hover:bg-[#00B7C2] hover:text-white focus:outline-none flex items-center justify-center"
            >
              <i className="fa-solid fa-arrow-right-to-bracket mr-1"></i> Masuk
            </Link>
          ) : (
            <>
              <div
                className="relative mr-4 cursor-pointer"
                onClick={handleNotificationsClick}
              >
                <FaBell className="text-blue-500" size={20} />
              </div>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User settings" img={user?.avatar_url} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user?.name || "User"}</span>
                </Dropdown.Header>
                <Link to="/profile">
                  <Dropdown.Item>
                    <FaUser className="mr-2" />
                    Profil
                  </Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <IoIosLogOut className="mr-2" /> Logout
                </Dropdown.Item>
              </Dropdown>
            </>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active>
            Beranda
          </Navbar.Link>
          <Navbar.Link href="/riwayat">Riwayat</Navbar.Link>
          <Navbar.Link href="/tentang">Tentang</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
