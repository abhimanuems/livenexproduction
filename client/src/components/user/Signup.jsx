import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserDetails } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

export default function Signup() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email.trim()) {
        toast.error("Email is required");
        return;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error("Invalid email format");
        return;
      }
      if (!password.trim()) {
        toast.error("Password is required");
        return;
      } else if (password.trim().length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      dispatch(setUserDetails({ email, password }));
      navigate("/verifyotp");
    } catch (err) {
      toast.info("User already exists");
      navigate("/login");
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-[#E4ECFF] ">
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://streamyard.com/static/img/c447cea5671ebcd7e8e02e1ca094ba44.svg")',
          backgroundSize: "cover",
        }}
      >
        <div className="w-96 h-96 p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">
            Sign Up
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-bg-blue-600">
                Signup
              </button>
            </div>
          </form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <Link to="/login">
              <a className="font-medium text-blue-600 hover:underline">Login</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
