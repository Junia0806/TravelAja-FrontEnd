/* eslint-disable no-unused-vars */
import React from "react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Logo from "../assets/Logo.png";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
  return (
    <Navbar fluid rounded className="bg-white m-0 p-3">
      <Navbar.Brand href="#">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo Travel Aja" />
        {/* <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">Travel Aja</span> */}
      </Navbar.Brand>
      <div className="flex md:order-2 ">
        {/* 1. Tampilan login saat belom login */}
        {/* <button className="bg-white text-[#00B7C2] border border-[#00B7C2] py-2 px-4 rounded-md hover:bg-[#00B7C2]  hover:text-white focus:outline-none flex items-center justify-center">
          <i className="fa-solid fa-arrow-right-to-bracket mr-1"></i> Masuk
        </button>
        <Navbar.Toggle /> */}
        {/* 2. Tampilan saat sudah login */}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Junia Vitasari</span>
          </Dropdown.Header>
          <Dropdown.Item>
            <FaUser className="mr-2" />
            Profil{" "}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            {" "}
            <IoIosLogOut className="mr-2 " /> Logout
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Beranda
        </Navbar.Link>
        <Navbar.Link href="#">Tentang</Navbar.Link>
        <Navbar.Link href="#">Kontak</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
