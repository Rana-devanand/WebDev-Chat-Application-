import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { MdGroups2 } from "react-icons/md";

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roomId");
    localStorage.removeItem("userId");
    navigate("/login");
  }
 
  return (
    <>
      <div className="absolute h-[555px] w-24 bg-blue-500 shadow-[4px_0px_8px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-center p-4">
          {/* Title or Logo */}
          <h1 className="text-white font-bold">logo</h1>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {/* Sidebar Items */}
          <button className="flex items-center p-3 rounded-md bg-blue-400 hover:bg-blue-600">
            <span className="ml-2 text-white text-2xl">
              <FaUser />
            </span>
          </button>

          <button className="flex items-center p-3 rounded-md hover:bg-blue-600">
            <span className="ml-2 text-white text-2xl">
              <MdGroups2 />
            </span>
          </button>
        </div>
        <div className="setting mt-48 p-4 flex flex-col space-y-4 ">
          <button className="flex items-center p-3 rounded-md hover:bg-blue-600">
            <span className="ml-2 text-white text-2xl">
              <IoSettingsSharp />
            </span>
          </button>

          <button className="flex items-center p-3 rounded-md hover:bg-red-400"
          onClick={handleLogout}>
            <span className="ml-2 text-white text-2xl">
              <LuLogOut />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
