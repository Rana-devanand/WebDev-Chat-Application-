import React from "react";
import { Link, useLocation } from "react-router-dom";
function Header() {
  const ParmsValue = useLocation();
  const path = ParmsValue.pathname;
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const roomId = localStorage.getItem("roomId");
  
  return (
    <>
      <div className="relative flex items-center bg-gradient-to-r from-white to-blue-800 h-16 shadow-2xl">
        {/* White triangle effect */}
        <div className="absolute top-0 left-0 w-[60%] h-full bg-white clip-triangle">
          <h1 className="p-5 font-serif text-lg text-cyan-800">
            <b>Chat Application</b>
          </h1>
        </div>

        {/* Content */}
        <div className="flex items-center justify-end flex-grow pr-8">
          {/* User Avatar and Name */}
          <div className="flex items-center space-x-2 text-white">
            {token && token.length > 0 ? (
              <>
                <img
                  src="https://via.placeholder.com/40"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{username}</p>
                  {/* <p className="text-sm">{roomId}</p> */}
                  <p className="text-sm flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    {roomId}
                  </p>
                </div>
              </>
            ) : (
              <>
              {path === "/login" ? (
                <Link
                  className="px-4 py-2 bg-cyan-700 rounded-md font-semibold"
                  to="/"
                >
                  signup
                </Link>
                ) : (
                  <Link
                    className="px-4 py-2 bg-cyan-700 rounded-md font-semibold"
                    to="/login"
                  >
                    Login
                  </Link>
                )}

                
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
