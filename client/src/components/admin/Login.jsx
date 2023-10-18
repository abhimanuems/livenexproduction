import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLoginAdminMutation } from "../../slices/adminApiSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentialsAdmin } from "../../slices/adminAuthSlice.js";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginAPI] = useLoginAdminMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.adminAuth);
  useEffect(() => {
    if (adminInfo) {
      navigate("/admins/dashboard");
    } else {
      navigate("/admins/login");
    }
  }, [adminInfo, navigate]);

  const login = async (e) => {
    e.preventDefault();
    if (userName.trim() === "") {
      toast.error("Enter a valid username");
      return;
    }
    if (password.trim() === "") {
      toast.error("Enter a valid password");
      return;
    }
    await loginAPI({ userName, password })
      .unwrap()
      .then((response) => {
        toast.info("login successful");
        dispatch(setCredentialsAdmin({ details: response.adminUserName }));
        navigate("/admins/dashboard");
      })
      .catch((err) => {
        toast.error("invalid username or password");
        console.error(err);
      });
  };

  return (
    <div className="overflow-hidden h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center mt-14">
        <img
          src="https://streamyard.com/static/img/fa89fa979dc597b3ac02254fc423fb5c.svg"
          alt="logo"
        />

        <div className="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-16">
          <p
            tabIndex="0"
            className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
          >
            LiveNex Administration window
          </p>

          <form onSubmit={login}>
            <div className="mt-3 p-2">
              <label
                id="email"
                className="text-sm font-medium leading-none text-gray-800"
              >
                Username
              </label>
              <input
                aria-labelledby="email"
                type="text"
                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-2 mt-2"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mt-6 w-full">
              <label
                htmlFor="pass"
                className="text-sm font-medium leading-none text-gray-800"
              >
                Password
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  id="pass"
                  type="password"
                  className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-12">
        <p className="text-slate-500">liveNex private limited</p>
      </div>
    </div>
  );
}

export default Login;
