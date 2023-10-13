import React from "react";
import { BsCameraVideo, BsFillShareFill } from "react-icons/bs";
import { FaTicketSimple } from "react-icons/fa6";
import { GiUpgrade } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-2 p-4 text-white">
      <ul className="space-y-4 ">
        <li>
          <button
            className="flex w-full py-2 px-4 text-left hover:bg-blue-950 rounded-md"
            onClick={() => navigate("/")}
          >
            <span className="mt-1">
              <BsCameraVideo />
            </span>
            <span className="ml-2">Home</span>
          </button>
        </li>
        <li>
          <button
            className="flex w-full py-2 px-4 text-left hover:bg-blue-950 rounded-md"
            onClick={() => navigate("/ticket")}
          >
            <span className="mt-1">
              <FaTicketSimple />
            </span>

            <span className="ml-2"> Tickets</span>
          </button>
        </li>
        <li>
          <button
            className="flex w-full py-2 px-4 text-left hover:bg-blue-950 rounded-md"
            onClick={() => navigate("/pro")}
          >
            <span className="mt-1">
              <GiUpgrade />
            </span>

            <span className="ml-2"> plans</span>
          </button>
        </li>
        <li>
          <button
            className="flex w-full py-2 px-4 text-left hover:bg-blue-950 rounded-md"
            onClick={() => navigate("/share")}
          >
            <span className="mt-1">
              <BsFillShareFill />
            </span>

            <span className="ml-2"> Destinations</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Slider;
