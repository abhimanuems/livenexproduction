import React from "react";
import { useLogoutMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import { logoutAdmin } from "../../slices/adminAuthSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [adminLogutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async (req, res) => {
    await adminLogutApi()
      .unwrap()
      .then((res) => {
        toast.info("logout successfull");
        dispatch(logoutAdmin());
        navigate("/admins/login/");
      })
      .catch((err) => {
        toast.error("some internal error");
      });
  };
  return (
    <header className="flex items-center justify-between bg-[#0B2447] p-4">
      <div className="flex items-center space-x-2">
        <span className="text-white font-bold text-lg cursor-pointer">
          LiveNex Administrator
        </span>
      </div>
      <div className="flex space-x-4">
        <button className="text-white font-medium" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
