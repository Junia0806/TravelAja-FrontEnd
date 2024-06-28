import React from "react";
import { FaReact } from 'react-icons/fa';
import { SiTailwindcss, SiSwagger, SiVite } from 'react-icons/si';
import logoTravel from "../assets/Logo.png";
import rahmatImage from "../assets/fotoTeam/rahmat.jpeg";
import kevinImage from "../assets/fotoTeam/masKevin.png";
import ilhamImage from "../assets/fotoTeam/Ilham Praditya.jpg";
import arifImage from "../assets/fotoTeam/Arif Pradana.jpg";
import juniaImage from "../assets/fotoTeam/Junia Vitasari.jpg";
import tantrikImage from "../assets/fotoTeam/Tantrik Lusi.jpg";
import background from "../assets/bg.jpg"; 

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
    description: "Library JavaScript untuk membangun antarmuka pengguna.",
    icon: <FaReact className="text-blue-500 text-6xl mb-4" />,
  },
  {
    name: "Vite",
    description: "Bundler cepat untuk proyek JavaScript.",
    icon: <SiVite className="text-purple-500 text-6xl mb-4" />,
  },
  {
    name: "Tailwind CSS",
    description: "Framework CSS untuk desain yang cepat.",
    icon: <SiTailwindcss className="text-teal-500 text-6xl mb-4" />,
  },
  {
    name: "Swagger",
    description: "Alat untuk mendeskripsikan dan mendokumentasikan API.",
    icon: <SiSwagger className="text-green-500 text-6xl mb-4" />,
  },
];

const About = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen py-10"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container mx-auto px-4 bg-white bg-opacity-30 rounded-lg py-10">
        <h1 className="text-4xl font-bold text-center mb-10">Tentang Kami</h1>
        <div className="flex flex-col md:flex-row items-center justify-center mb-10">
        
          <p className="text-lg text-center md:text-left">
            Situs web ini dibuat untuk memudahkan pemesanan tiket lokal dan tugas
            final project. Kami bertujuan untuk memberikan kemudahan dan
            kenyamanan dalam memesan tiket dengan berbagai pilihan dan harga yang
            kompetitif.
          </p>
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">Teknologi yang Digunakan</h2>
        <div className="flex flex-wrap justify-center mb-10">
          {technologies.map((tech) => (
            <div key={tech.name} className="m-4 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center hover:scale-105 transition-transform w-full md:w-1/3 lg:w-1/4">
              {tech.icon}
              <p className="text-lg font-bold">{tech.name}</p>
              <p className="text-gray-700 text-center mt-2">{tech.description}</p>
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">Tim Kami</h2>
        <div className="flex flex-wrap justify-center">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/3 lg:w-1/4 m-4 hover:scale-105 transition-transform"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-700 mb-2">{member.role}</p>
                <div className="flex space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    GitHub
                  </a>
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
