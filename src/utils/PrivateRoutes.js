import { Outlet, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
const PrivateRoutes = ({ children, ...rest }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/auth" />
  );
};

export default PrivateRoutes;
