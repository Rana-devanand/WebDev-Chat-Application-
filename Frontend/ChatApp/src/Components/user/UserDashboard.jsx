import React from "react";
import Header from "../Comman_Page/Header";
import Footer from "../Comman_Page/Footer";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Navigate } from "react-router-dom";

function UserDashboard() {
  const token = localStorage.getItem("token");
  if(!token){
    Navigate("/login");
  }
  window.addEventListener('popstate', () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        window.location.href = '/login'; // Redirect to login page
    }
});


  return (
    <>
      {token ? (
        <>
        <Header />
        <div className="body">
          <Sidebar />
          <Chat />
        </div>
        <Footer />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default UserDashboard;
