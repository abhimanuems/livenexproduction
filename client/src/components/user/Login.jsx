import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      if (response.message) {
        dispatch(setCredentials({ deatils: response.user.email }));
        navigate("/");
        toast.error(response);
      } else if (response.error) {
        toast.error("inavlid credintials");
      }
    } catch (err) {
      if (err) throw err;
      toast.error("invalid credentials");
    }
  };
  const googleAuth = async () => {
    try {
      const authWindow = window.open("https://livenex.online/auth/google");

      const messageListener = (event) => {
        if (event.origin === "https://livenex.online") {
          const response = event.data;
          console.log("google auth login is ", response);
          toast.info("login successful");

          dispatch(setCredentials({ deatils: response.email }));
          console.log(response);
          authWindow.close();
          window.removeEventListener("message", messageListener);
          if (response) navigate("/");
        }
      };
      window.addEventListener("message", messageListener);
    } catch (error) {
      if (error) throw error;
      toast.error(error.message);
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
        <div className="w-96  p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">
            Sign in
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
                type="email"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Login
              </button>
            </div>
          </form>
          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">Or</div>
          </div>
          <div className="flex mt-4 gap-x-2">
            <button
              onClick={googleAuth}
              type="button"
              className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-blue-600"
            >
              <FcGoogle style={{ fontSize: "35px" }} />
            </button>
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Don't have an account?
            <Link to="/signup">
              <a href="" className="font-medium text-blue-600 hover:underline">
                Sign up
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
