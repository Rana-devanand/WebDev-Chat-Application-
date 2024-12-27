import React from "react";

function Footer() {
  return (
    <div className="absolute bottom-0 w-full flex items-center bg-zinc-800 to-white h-10">
      {/* White triangle effect */}
      <div className="absolute top-0 left-0 h-full bg-white "></div>

      {/* Content */}
      <div className="flex items-center justify-end flex-grow pr-8">
        {/* User Avatar and Name */}
        <div className="flex items-center space-x-2 text-white"></div>
      </div>
    </div>
  );
}

export default Footer;
