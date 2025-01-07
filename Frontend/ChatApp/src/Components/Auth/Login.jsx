import React, { useState } from "react";
import LottieAnimation from "./LottieAnimation";
import { useNavigate } from "react-router-dom";
import Header from "../Comman_Page/Header";
import Footer from "../Comman_Page/Footer";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";


function Login() {
  const navigate = useNavigate();
  const [value , setValue] = useState({
    email : "",
    password : ""
  })

  const handleLogin = async  (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, value);
      console.log(response);
      if(response.data.success){
        localStorage.setItem("token" , response.data.data.token);
        localStorage.setItem("username" , response.data.data.response.name);
        localStorage.setItem("roomId" , response.data.data.response.roomId);
        localStorage.setItem("userId" , response.data.data.response._id);
        navigate("/userdashboard");
      }
    } catch (error) {
      console.log(error.response.data.message == "Failed to sign in");
      if(error.response.data.message == "Failed to sign in"){
        toast.error("User does not exist");
      }
      if(error.code === "ERR_NETWORK"){
        toast.error("Bad Request");
      }
      console.log(error);
    }
  };
  // Handle error for without form fill try to login
  const handleError = () => {
    if(value.email === ""){
      toast.error("Please Enter Email");
    }
    else if(value.password === ""){
      toast.error("Please Enter Password");
    }
    else{
      handleLogin();  
    }
  }
  return (
    <>
      <Header />
      <ToastContainer />
      <div className=" w-full flex justify-around mt-5">
        <div className="Lottie-animation">
          <LottieAnimation />
        </div>
        {/* ---------------------------- */}
        <div className="border w-1/3 rounded-md shadow-2xl">
          <h2 className="text-2xl text-center font-bold py-4">
            Verify Yourself
          </h2>
          <hr className="" />

          <form className="p-6"
          onSubmit={handleLogin}
          >
            <div className="mb-4">
              <label className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
                placeholder="Enter your email"
                onChange={(e) => setValue({...value , email : e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700">Password</label>
              <input
                type="password"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
                placeholder="Enter your password"
                onChange={(e) => setValue({...value , password : e.target.value})}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleError}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
