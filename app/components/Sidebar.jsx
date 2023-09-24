"use client"

import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import React from "react";

export const Sidebar = () => {

  const views = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]


  return (
    <ProSidebar className="min-h-screen">
      <Menu >
        <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
    </ProSidebar>
  );
};
