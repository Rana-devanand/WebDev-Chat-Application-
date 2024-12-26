import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Auth/Login";
import UserDashboard from "../Components/user/UserDashboard";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default Routers;
