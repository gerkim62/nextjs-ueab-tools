import React, { ReactNode } from 'react';
import { FaHtml5, FaCss3, FaJs, FaReact, FaBootstrap, FaNodeJs, FaWhatsapp, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb } from 'react-icons/si';
import Logo from '../components/Logo';
import Image from 'next/image';

const AboutMe = () => {
  return (
    <section className="bg-white min-h-full flex flex-col justify-center py-12 px-4 md:px-12 lg:px-24 xl:px-32 2xl:px-48 text-center">
      <div className="max-w-screen-lg mx-auto flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0">
        <div className="relative flex-shrink-0 w-40 h-40 lg:w-48 lg:h-48">
          <div className="absolute -inset-2 bg-pink-500 rounded-full" />
          <Image
            src="your_profile_pic_url.jpg"
            alt="Profile Pic"
            className="w-full h-full rounded-full object-cover ring-4 ring-pink-500"
          />
        </div>
        <div className="mt-6 lg:mt-0 lg:ml-10 text-center lg:text-left">
          <h1 className="font-mono lg:text-xl font-semibold text-gray-800 text-center">developer.gerison</h1>
          {/* <Logo /> */}
          <div className="flex flex-wrap justify-center lg:justify-start m-4 space-x-4">
            <TechIcon icon={<FaHtml5 className="text-4xl text-pink-500" />} text="HTML5" />
            <TechIcon icon={<FaCss3 className="text-4xl text-pink-500" />} text="CSS3" />
            <TechIcon icon={<FaJs className="text-4xl text-pink-500" />} text="JavaScript" />
            <TechIcon icon={<SiNextdotjs className="text-4xl text-pink-500" />} text="Next.js" />
            <TechIcon icon={<FaReact className="text-4xl text-pink-500" />} text="React" />
            <TechIcon icon={<FaBootstrap className="text-4xl text-pink-500" />} text="Bootstrap" />
            <TechIcon icon={<FaNodeJs className="text-4xl text-pink-500" />} text="Node.js" />
            <TechIcon icon={<SiMongodb className="text-4xl text-pink-500" />} text="MongoDB" />
          </div>
          <div className="bg-pink-000 p-4 rounded-lg mt-6 text-gray-800">
            <h2 className="text-lg font-semibold mb-2 underline underline-offset-1 mx-5">About Me</h2>
            <p className="text-sm lg:text-base tracking-wide mx-5 leading-6	">
              I specialize in front-end web development with a focus on creating responsive and user-friendly interfaces. My tech stack includes HTML5, CSS3, JavaScript, React, NextJS and Bootstrap. I also have experience with server-side development using Node.js, ExpressJS and MongoDB for database management. My goal is to build innovative and efficient web applications that deliver exceptional user experiences.
            </p>
          </div>
          <div className="mt-6">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

const TechIcon = ({ icon, text }:{text:string, icon:ReactNode}) => {
  return (
    <div className="flex items-center mb-2 lg:mb-2 lg:mr-4 shadow p-1 rounded">
      {icon}
      <span className="ml-2 text-gray-800 text-xl lg:text-2xl">{text}</span>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="flex items-center justify-center space-x-6 mt-4">
      <a
        href="mailto:your.email@example.com"
        className="text-gray-800 hover:text-pink-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaEnvelope />
      </a>
      <a
        href="https://wa.me/your-whatsapp-number"
        className="text-gray-800 hover:text-pink-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://linkedin.com/in/your-linkedin-profile"
        className="text-gray-800 hover:text-pink-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
      </a>
    </div>
  );
};

export default AboutMe;
