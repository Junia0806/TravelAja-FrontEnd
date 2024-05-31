/* eslint-disable no-unused-vars */
import { Footer } from "flowbite-react";
import { BsGithub, BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import React from "react";
import Logo from "../assets/Logo.png";

const FooterSection = () => {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand href="#" src={Logo} alt="Travel Aja Logo" name="Travel Aja" />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Fitur" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Pencarian</Footer.Link>
                <Footer.Link href="#">Destinasi</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Penerbangan" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Domestik</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Temukan" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Tentang</Footer.Link>
                <Footer.Link href="#">Kontak Kami</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="BINAR-B2™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsWhatsapp} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterSection;
