"use client";

import { useState } from "react";

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
  FaBars,
  FaTimes,
  FaBan,
} from "react-icons/fa"; // Import the icons you need from react-icons

import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import useIsLgScreen from "../hooks/useIsLgScreen";

export const Sidebar = () => {
  const views = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const [sidebarShowing, setSidebarShowing] = useState(false);
  const isLgScreen = useIsLgScreen();
  return (
    <>
      {sidebarShowing && (
        <div
          onClick={() => setSidebarShowing(false)}
          className="w-full h-full absolute bg-gray-500/50 z-50 lg:hidden"
        ></div>
      )}
      <button
        style={{ zIndex: 100 }}
        className="absolute right-2 top-2 z-10border-2 p-1 lg:hidden"
        onClick={() => setSidebarShowing((prev) => !prev)}
      >
        {sidebarShowing ? <FaTimes size={30} /> : <FaBars size={30} />}
      </button>

      <div style={{ zIndex: 100 }} className="absolute z-10 lg:relative">
        <ProSidebar
          onBackdropClick={() => {
            setSidebarShowing(false);
          }}
          width={sidebarShowing || isLgScreen ? "270px" : "0"}
          toggled={false}
          className="h-screen lg:h-[95vh] overflow-y-auto 
          overflow-x-hidden bg-white lg:w-[270px]"
        >
          <Menu>
            <MenuItem
              onClick={() => setSidebarShowing(false)}
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
                onClick={() => setSidebarShowing(false)}
                component={<Link href={"/courses-selector"}></Link>}
                icon={<FaPlayCircle className="text-pink-600" />}
              >
                Select courses
              </MenuItem>
              <MenuItem
                onClick={() => setSidebarShowing(false)}
                component={<Link href={"/courses-selector"}></Link>}
                icon={<FaPlayCircle className="text-pink-600" />}
              >
                View selected
              </MenuItem>
              <MenuItem
                onClick={() => setSidebarShowing(false)}
                component={<Link href={"/courses-selector/how-to-use"}></Link>}
                icon={<FaQuestionCircle className="text-pink-600" />}
              >
                How to Use
              </MenuItem>
              <MenuItem
                onClick={() => setSidebarShowing(false)}
                component={<Link href={"/courses-selector/limitations"}></Link>}
                icon={<FaBan className="text-pink-600" />}
              >
                Learn more
              </MenuItem>
            </SubMenu>
            <SubMenu
              icon={<FaClipboardCheck className="text-pink-600" />}
              label="Cute Timetable"
            >
              <MenuItem
                onClick={() => setSidebarShowing(false)}
                component={<Link href={"/cute-timetable"}></Link>}
                icon={<FaPlayCircle className="text-pink-600" />}
              >
                Download now
              </MenuItem>
              <MenuItem
                onClick={() => setSidebarShowing(false)}
                component={<Link href={"/cute-timetable"}></Link>}
                icon={<FaPlayCircle className="text-pink-600" />}
              >
                View timetable
              </MenuItem>
              <MenuItem
                onClick={() => setSidebarShowing(false)}
                component={<Link href={"/cute-timetable/how-to-use"}></Link>}
                icon={<FaQuestionCircle className="text-pink-600" />}
              >
                How to Use
              </MenuItem>
            </SubMenu>
            <SubMenu
              icon={<FaClipboard className="text-pink-600" />}
              label="Exam Timetable"
            >
              <MenuItem
                component={<Link href={"/exam-timetable"}></Link>}
                onClick={() => setSidebarShowing(false)}
                icon={<FaPlayCircle className="text-pink-600" />}
              >
                Extract Now
              </MenuItem>
              <MenuItem
                component={<Link href={"/exam-timetable"}></Link>}
                onClick={() => setSidebarShowing(false)}
                icon={<FaPlayCircle className="text-pink-600" />}
              >
                Learn more
              </MenuItem>
              <MenuItem
                component={<Link href={"/exam-timetable/how-to-use"}></Link>}
                onClick={() => setSidebarShowing(false)}
                icon={<FaQuestionCircle className="text-pink-600" />}
              >
                How to Use
              </MenuItem>
              <MenuItem
                component={<Link href={"/exam-timetable/update"}></Link>}
                onClick={() => setSidebarShowing(false)}
                icon={<FaCode className="text-pink-600" />}
              >
                Advanced
              </MenuItem>
            </SubMenu>

            <MenuItem
              component={<Link href={"/about-me"}></Link>}
              onClick={() => setSidebarShowing(false)}
              icon={<FaInfoCircle className="text-pink-600" />}
            >
              About me
            </MenuItem>
            <MenuItem
              component={<Link href={"/contact-me"}></Link>}
              onClick={() => setSidebarShowing(false)}
              icon={<FaEnvelope className="text-pink-600" />}
            >
              Contact me
            </MenuItem>

            <MenuItem
              component={<Link href={"/suggestions"}></Link>}
              onClick={() => setSidebarShowing(false)}
              icon={<FaComments className="text-pink-600" />}
            >
              Suggestions
            </MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    </>
  );
};
