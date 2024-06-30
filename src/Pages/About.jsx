import React from "react";
import { FaReact } from "react-icons/fa";
import {
  SiTailwindcss,
  SiSwagger,
  SiVite,
  SiExpress,
  SiPostgresql,
  SiRailway,
  SiPrisma,
} from "react-icons/si";
import { BsWhatsapp } from "react-icons/bs";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import rahmatImage from "../assets/fotoTeam/rahmat.jpeg";
import kevinImage from "../assets/fotoTeam/masKevin.png";
import ilhamImage from "../assets/fotoTeam/Ilham Praditya.jpg";
import arifImage from "../assets/fotoTeam/Arif Pradana.jpg";
import juniaImage from "../assets/fotoTeam/Junia Vitasari.jpg";
import tantrikImage from "../assets/fotoTeam/Tantrik Lusi.jpg";
import background from "../assets/bg_tentang.jpg";

const teamMembers = [
  {
    name: "Rahmat Arayyan",
    role: "Frontend Developer",
    image: rahmatImage,
    github: "https://github.com/rayyan503",
    instagram: "https://www.instagram.com/rahmatarayyan05",
  },
  {
    name: "Junia Vitasari",
    role: "Frontend Developer",
    image: juniaImage,
    github: "https://github.com/Junia0806",
    instagram: "https://www.instagram.com/juniavitasari7",
  },
  {
    name: "Tantrik Ulil Lusianti",
    role: "Frontend Developer",
    image: tantrikImage,
    github: "https://github.com/tantriklusi",
    instagram: "https://www.instagram.com/tntrklusi_",
  },
  {
    name: "Arif Perdana",
    role: "Backend Developer",
    image: arifImage,
    github: "https://github.com/arifprdn",
    instagram: "https://www.instagram.com/arif.prdna",
  },
  {
    name: "M. Ilham Praditya A.N",
    role: "Backend Developer",
    image: ilhamImage,
    github: "https://github.com/ilhampraditya",
    instagram: "https://www.instagram.com/ilham.prdty",
  },
  {
    name: "Kevin Yohanes Wuryanto",
    role: "Backend Developer",
    image: kevinImage,
    github: "https://www.instagram.com/kevinyohanesw",
    instagram: "https://www.instagram.com/kevinyohanes",
  },
];

const technologies = [
  {
    name: "React",
    icon: <FaReact className="text-blue-500 text-6xl mb-4" />,
  },
  {
    name: "Vite",
    icon: <SiVite className="text-purple-500 text-6xl mb-4" />,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-teal-500 text-6xl mb-4" />,
  },
  {
    name: "Swagger",
    icon: <SiSwagger className="text-green-500 text-6xl mb-4" />,
  },
  {
    name: "Express.js",
    icon: <SiExpress className="text-gray-700 text-6xl mb-4" />,
  },
  {
    name: "Postgre SQL",
    icon: <SiPostgresql className="text-blue-700 text-6xl mb-4" />,
  },
  {
    name: "Railway",
    icon: <SiRailway className="text-blue-600 text-6xl mb-4" />,
  },
  {
    name: "Prisma",
    icon: <SiPrisma className="text-green-500 text-6xl mb-4" />,
  },
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex-grow bg-cover bg-center py-10"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="container mx-auto px-4 bg-white bg-opacity-30 rounded-lg py-10">
          <h1 className="text-4xl font-bold text-center mb-10">Tentang Kami</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center">
                {technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="m-4 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center hover:scale-105 transition-transform w-24 h-24 relative"
                  >
                    {tech.icon}
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-center p-2">
                        <p className="text-xl font-bold">{tech.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-lg text-justify pr-8 mb-4">
              <strong>Selamat datang di TravelAja</strong> – solusi
                tiket lokal Anda yang sederhana, cepat, dan terpercaya! 
                Kami adalah platform pemesanan tiket yang dirancang untuk
                mempermudah Anda dalam menemukan berbagai pilihan tiket dengan
                harga yang sangat kompetitif.{" "}
                <strong>Pingin liburan? Click TravelAja! 🌟🚀 </strong>
              </p>

              <p className="text-lg text-justify pr-8">
                Dapatkan tiket terbaik hanya di TravelAja!  Jangan tunda
                lagi – klik dan temukan tiket yang Anda butuhkan sekarang juga!
                 Jangan ragu untuk menjelajahi berbagai pilihan tiket dan
                penawaran istimewa yang hanya tersedia di TravelAja! 
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center bg-gray-200 p-6">
        Tim Developer
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10 bg-gray-200 pb-20 px-6">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:bg-gray-100 hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-4 mb-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-3xl hover:text-gray-400 transition-colors"
                >
                  <AiFillGithub />
                </a>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-3xl hover:text-pink-400 transition-colors"
                >
                  <AiFillInstagram />
                </a>
              </div>
              <div className="text-white text-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <a
        href="https://api.whatsapp.com/send?phone=628970946561&text=Halo%20admin%20TravelAja%2C%20saya%20ingin%20menanyakan%20beberapa%20hal%20tentang%20layanan%20dan%20penawaran%20yang%20tersedia.%20Terima%20kasih%20atas%20perhatiannya.%20😊"
        className="fixed bottom-4 left-4 flex items-center justify-center group "
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsWhatsapp className="text-4xl relative z-10 bg-green-500 rounded-full m-1" />
        <span className="absolute inset-0 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center group-hover:w-52 group-hover:h-12 p-2 group-hover:p-4">
          <span className="text-white text-sm flex items-center">
            Yuk tanya MiminAja!
          </span>
        </span>
      </a>
    </div>
  );
};

export default About;
