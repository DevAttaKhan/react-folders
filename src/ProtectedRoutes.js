import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./componets/Header";

const ProtectedRoutes = () => {
  const token = true;
  return (
    <>
      <Header />
      {token ? <Outlet /> :    <Navigate to="/not" replace={true} />}
    </>
  );
};

export default ProtectedRoutes;
