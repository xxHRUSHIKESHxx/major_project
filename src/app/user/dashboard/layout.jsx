"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
// import NavBar from "../userComponents/NavBar";
const NavBar = dynamic(() => import("../userComponents/NavBar"));

const Layout = ({ children }) => {
  const MemoizedNavBar = useMemo(() => <NavBar />, []);

  return (
    < >
      {MemoizedNavBar}
      <div style={{backgroundColor: "#030439"}}>{ children}</div>
    </>
  );
};

export default Layout;
