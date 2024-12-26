import React from "react";
import Header from "./Comman_Page/Header";
import Footer from "./Comman_Page/Footer";
import Signup from "./Signup";
import { useLocation } from "react-router-dom";
import Login from "./Login";

function Home() {
  const paramsValue = useLocation();
  const path = paramsValue.pathname;
  return (
    <div>
      <Header />
      {path === "/" ? <Signup /> : <Login />}
      <Footer />
    </div>
  );
}

export default Home;
