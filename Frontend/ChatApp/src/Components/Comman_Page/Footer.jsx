import React from "react";

function Footer() {
  return (
    <div className="absolute bottom-0 w-full flex items-center bg-zinc-800 to-white h-10">
      {/* White triangle effect */}
      <div className="absolute top-0 left-0 h-full bg-white ">

      </div>

      {/* Content */}
      <div className="flex items-center justify-center flex-grow pr-8">
        {/* User Avatar and Name */}
        <div className="flex justify-center items-center space-x-2 text-white">
          <p className="font-mono text-sm">mychatapplication@chat.com</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
