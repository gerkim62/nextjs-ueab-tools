"use client";

import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import {
  FaHome,
  FaUser,
  FaCog,
  FaInfoCircle,
  FaEnvelope,
  FaComments,
  FaExclamationTriangle,
  FaPlayCircle,
  FaCode,
  FaQuestionCircle,
  FaClipboard,
  FaCalendar,
  FaBook,
  FaClipboardCheck,
} from "react-icons/fa"; // Import the icons you need from react-icons

import React from "react";
import Logo from "./Logo";
import Link from "next/link";

export const Sidebar = () => {
  const views = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <ProSidebar toggled className="min-h-screen overflow-x-auto">
      <Menu>
        <MenuItem
          component={<Link href={"/"}></Link>}
          className="hover:bg-white"
        >
          <Logo />
        </MenuItem>
        <SubMenu
          className=""
          icon={<FaBook className="text-pink-600" />}
          label="Courses Selector"
        >
          <MenuItem
            component={<Link href={"/courses-selector"}></Link>}
            icon={<FaPlayCircle className="text-pink-600" />}
          >
            Launch Now
          </MenuItem>
          <MenuItem
            component={<Link href={"/courses-selector/how-to-use"}></Link>}
            icon={<FaQuestionCircle className="text-pink-600" />}
          >
            How to Use
          </MenuItem>
        </SubMenu>
        <SubMenu
          icon={<FaClipboardCheck className="text-pink-600" />}
          label="Cute Timetable"
        >
          <MenuItem
            component={<Link href={"/cute-timetable"}></Link>}
            icon={<FaPlayCircle className="text-pink-600" />}
          >
            Launch Now
          </MenuItem>
          <MenuItem
            component={<Link href={"/cute-timetable/how-to-use"}></Link>}
            icon={<FaQuestionCircle className="text-pink-600" />}
          >
            How to Use
          </MenuItem>
        </SubMenu>
        <SubMenu
          icon={<FaClipboard className="text-pink-600" />}
          label="Exams Timetable"
        >
          <MenuItem icon={<FaPlayCircle className="text-pink-600" />}>
            Launch Now
          </MenuItem>
          <MenuItem icon={<FaQuestionCircle className="text-pink-600" />}>
            How to Use
          </MenuItem>
          <MenuItem disabled icon={<FaCode className="text-pink-600" />}>
            For the Dev
          </MenuItem>
        </SubMenu>

        <MenuItem icon={<FaInfoCircle className="text-pink-600" />}>
          About me
        </MenuItem>
        <MenuItem icon={<FaEnvelope className="text-pink-600" />}>
          Contact me
        </MenuItem>

        <MenuItem icon={<FaComments className="text-pink-600" />}>
          Suggestions
        </MenuItem>
        <MenuItem icon={<FaExclamationTriangle className="text-pink-600" />}>
          Report a bug
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
};
