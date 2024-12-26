import React from "react";
import LottieAnimation from "./LottieAnimation";

function Login() {
  return (
    <div className=" w-full flex justify-around mt-5">
      <div className="Lottie-animation">
        <LottieAnimation />
      </div>
      {/* ---------------------------- */}
      <div className="border w-1/3 rounded-md shadow-2xl">
        <h2 className="text-2xl text-center font-bold py-4">Verify Yourself</h2>
        <hr className="" />

        <form className="p-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-center items-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
