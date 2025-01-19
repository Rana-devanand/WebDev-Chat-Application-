import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Auth/Login";
import UserDashboard from "../Components/user/UserDashboard";
import Socket from "../Components/user/Socket";
function Routers() {
  return (
    <Routes>
      <Route path="/chatApplication/" element={<Home />} />
      <Route path="/chatApplication/login" element={<Login />} />
      <Route path="/chatApplication/userdashboard" element={<UserDashboard />} />
      <Route path="/chatApplication/chat" element={<Socket />} />
    </Routes>
  );
}

export default Routers;
