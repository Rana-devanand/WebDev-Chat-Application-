import React, { useState, useRef } from "react";
import LottieAnimation from "./LottieAnimation";
import Header from "../Comman_Page/Header";
import Footer from "../Comman_Page/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    roomId: roomId,
  });

  console.log(value);

  const GenerateRoomId = (e) => {
    e.preventDefault();
    const randomDigits = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
    const newRoomId = `${value.name}${randomDigits}`; // Concatenate with prefix
    setRoomId(newRoomId); // Update the roomId state
    setValue((prev) => ({ ...prev, roomId: newRoomId }));
  };

  const HandleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        value
      );
      if (response) {
        toast.success("User Registration Successful");
        formRef.current.reset(); 
        navigate("/login");// Reset the form after successful submission
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Header />
      <div className=" w-full flex justify-around mt-5">
        <div className="Lottie-animation">
          <LottieAnimation />
        </div>
        {/* ---------------------------- */}
        <div className="border w-1/3  rounded-md shadow-2xl">
          <h2 className="text-2xl text-center font-bold py-4">
            Create Account
          </h2>
          <hr className="" />

          <form className="p-6" onSubmit={HandleSubmit} ref={formRef}>
            <div className="mb-4">
              <label className="block text-sm text-gray-700">Name</label>
              <input
                type="Name"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
                placeholder="Enter First Name only.."
                name="name"
                onChange={HandleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
                placeholder="Enter your email"
                name="email"
                onChange={HandleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700">Password</label>
              <input
                type="password"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
                placeholder="Enter your password"
                name="password"
                onChange={HandleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700">
                Generate Room Id
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="appearance-none border rounded-s-md w-full py-3  px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
                  placeholder="Your room id..."
                  value={roomId}
                  disabled
                />
                <button
                  onClick={GenerateRoomId}
                  className="px-5 py-1 bg-blue-400 font-medium text-sm rounded-e-lg text-cyan-900 hover:bg-blue-500 hover:text-zinc-200"
                >
                  Generate
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default Signup;
