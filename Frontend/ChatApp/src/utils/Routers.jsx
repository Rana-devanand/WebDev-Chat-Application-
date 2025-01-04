import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Auth/Login";
import UserDashboard from "../Components/user/UserDashboard";
import Socket from "../Components/user/Socket";
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/chat" element={<Socket />} />
    </Routes>
  );
}

export default Routers;
