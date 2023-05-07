import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./componets/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { setStoredUser } from "./store/authSlice";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const storedUser = user || JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("user", JSON.stringify(user));
    }
    if (!user) {
      dispatch(setStoredUser(storedUser));
    }
  }, []);

  return (
    <>
      <Header />
      {storedUser?.token ? <Outlet /> : <Navigate to="/login" replace={true} />}
    </>
  );
};

export default ProtectedRoutes;
