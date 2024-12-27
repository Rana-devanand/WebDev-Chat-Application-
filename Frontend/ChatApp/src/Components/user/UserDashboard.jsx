import React from "react";
import Header from "../Comman_Page/Header";
import Footer from "../Comman_Page/Footer";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function UserDashboard() {
  return (
    <>
      <Header />
      <div className="body">
        <Sidebar />
        <Chat />
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;
