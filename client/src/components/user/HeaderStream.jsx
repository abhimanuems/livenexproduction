import React from "react";
import { useNavigate } from "react-router-dom";
const HeaderStream = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between bg-slate-600 p-4">
      <div className="flex items-center space-x-2">
        <span
          className="text-white font-bold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          LiveNex
        </span>
      </div>
    </header>
  );
};

export default HeaderStream;
