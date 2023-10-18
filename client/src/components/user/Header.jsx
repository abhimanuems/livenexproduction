import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useLogoutMutation,
  useSubscriptionMutation,
} from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const [subscribe] = useSubscriptionMutation();
  const [pro, setPro] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo)
      subscribe()
        .unwrap()
        .then((isSubscribed) => {
          if (isSubscribed) {
            setPro(true);
          }
        })
        .catch((err) => {
          console.error(err.message);
          toast.error(err.message);
        });
  }, [pro]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall()
        .unwrap()
        .then((res) => {
          toast.error("logout successfully");
          dispatch(logout());
          navigate("/login");
        })
        .catch((err) => {
          toast.error("internal error");
          console.error(err);
        });
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };
  return (
    <header className="flex items-center justify-between bg-[#0B2447] p-4">
      <div className="flex items-center space-x-2">
        <span
          className="text-white font-bold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          LiveNex
        </span>
      </div>
      <div className="flex space-x-4">
        {pro ? (
          <Link to="/pro">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              pro
            </button>
          </Link>
        ) : (
          <Link to="/pro">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              upgrade
            </button>
          </Link>
        )}

        <button className="text-white font-medium" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
