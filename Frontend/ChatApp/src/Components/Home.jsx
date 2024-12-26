import React from "react";
import Signup from "./Auth/Signup";
import { useLocation } from "react-router-dom";
import Login from "./Auth/Login";

function Home() {
  const paramsValue = useLocation();
  const path = paramsValue.pathname;
  return <div>{path === "/" ? <Signup /> : <Login />}</div>;
}

export default Home;
