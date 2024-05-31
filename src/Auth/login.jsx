/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from "flowbite-react";
import { Navbar } from "flowbite-react";

const Login = () => {
  return (
    <div className="bg-yellow-300">
      <h1>Login Page</h1>
    <Button>Click me</Button>
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link  href="#">
          About
        </Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
      {/* Tambahkan form login atau konten lainnya di sini */}
    </div>
    
  );
};

export default Login;
