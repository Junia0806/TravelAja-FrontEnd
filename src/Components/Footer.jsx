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
          <Footer.Brand
            href="#"
            src={Logo}
            alt="Travel Aja Logo"
            name="Travel Aja"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
          <div>
            <Footer.Title title="Fitur" />
            <Footer.LinkGroup col>
              <Footer.Link href="/">Pemesanan</Footer.Link>
              <Footer.Link href="/notif">Notifikasi</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Penerbangan" />
            <Footer.LinkGroup col>
              <Footer.Link href="/">Domestik</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Temukan" />
            <Footer.LinkGroup col>
              <Footer.Link href="/tentang">Tentang</Footer.Link>
              <Footer.Link href="https://api.whatsapp.com/send?phone=628970946561&text=Halo%20admin%20travel%20aja%2C%20saya%20ada%20pertanyaan%20nih%F0%9F%98%85">Kontak Kami</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
      <Footer.Divider />
      <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright  by="BINAR-B2™" year={2024} />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <Footer.Icon href="https://api.whatsapp.com/send?phone=628970946561&text=Halo%20admin%20travel%20aja%2C%20saya%20ada%20pertanyaan%20nih%F0%9F%98%85" icon={BsWhatsapp} />
          <Footer.Icon href="https://github.com/Junia0806/TravelAja-FrontEnd" icon={BsGithub} />
          <Footer.Icon href="https://www.instagram.com/academybinar/" icon={BsInstagram} />
          <Footer.Icon href="https://x.com/academybinar?s=11" icon={BsTwitter} />
        </div>
      </div>
    </div>
  </Footer>
  );
};

export default FooterSection;
