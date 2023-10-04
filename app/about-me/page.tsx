import React from 'react';
import { FaHtml5, FaCss3, FaJs, FaReact, FaBootstrap, FaNodeJs, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiLinkedin } from 'react-icons/si';

const AboutMe = () => {
  return (
    <div className="bg-pink-500 py-10 px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48">
      <div className="max-w-screen-lg mx-auto flex flex-col lg:flex-row items-center justify-center">
        <div className="flex-shrink-0">
          <img
            src="your_profile_pic_url.jpg"
            alt="Profile Pic"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </div>
        <div className="mt-6 lg:mt-0 lg:ml-10 text-center lg:text-left">
          <h1 className="text-3xl font-semibold text-white">developer.gerison</h1>
          <div className="flex items-center mt-4 space-x-4">
            <TechIcon icon={<FaHtml5 />} text="HTML" />
            <TechIcon icon={<FaCss3 />} text="CSS" />
            <TechIcon icon={<FaJs />} text="JavaScript" />
            <TechIcon icon={<SiNextdotjs />} text="Next.js" />
            <TechIcon icon={<FaReact />} text="React" />
            <TechIcon icon={<FaBootstrap />} text="Bootstrap" />
            <TechIcon icon={<FaNodeJs />} text="Node.js" />
            <TechIcon icon={<SiMongodb />} text="MongoDB" />
          </div>
          <p className="text-white mt-4">
            I am a Software Engineering BSc student at the University of Eastern Africa, Baraton.
          </p>
          <div className="mt-6">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

const TechIcon = ({ icon, text }) => {
  return (
    <div className="flex items-center">
      {icon}
      <span className="ml-2 text-white">{text}</span>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="flex items-center space-x-6">
      <a
        href="mailto:your.email@example.com"
        className="text-white hover:text-pink-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaEnvelope /> Email
      </a>
      <a
        href="https://wa.me/your-whatsapp-number"
        className="text-white hover:text-pink-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp /> WhatsApp
      </a>
      <a
        href="https://linkedin.com/in/your-linkedin-profile"
        className="text-white hover:text-pink-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiLinkedin /> LinkedIn
      </a>
    </div>
  );
};

export default AboutMe;
