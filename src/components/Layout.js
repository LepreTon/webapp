import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="min-h-screen max-h-screen bg-main-green mx-auto overflow-hidden overscroll-none">
        <Outlet />
        <Navigation />
    </div>
  );
};

export default Layout;
