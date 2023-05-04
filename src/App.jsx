import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route  element={<ProtectedRoutes />}>
          <Route index path="/" element={<Home />} />
         </Route>
          <Route path="/not" element={<h1>not found</h1>}/>
      </Routes>
    </>
  );
}

export default App;
