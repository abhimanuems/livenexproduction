import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { MdSubscriptions } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { FaTicketSimple } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const navigate = useNavigate();
  return (
    <div className="w-1/6 h-screen bg-[#19376D] p-4 text-white">
      <ul className="space-y-4">
        <li>
          <button
            className="flex w-full py-2 px-4 text-left hover:bg-blue-950 rounded-md"
            onClick={() => navigate("/admins/dashboard")}
          >
            <span className="mt-1">
              <RiDashboardFill />
            </span>
            <span className="ml-2">Dashboard</span>
          </button>
        </li>
        <li>
          <button
            className="flex w-full py-2 px-4 text-left hover:bg-blue-950 rounded-md"
            onClick={() => {
              navigate("/admins/subscription");
            }}
          >
            <span className="mt-1">
              <MdSubscriptions />
            </span>
            <span className="ml-2"> Subscription</span>
          </button>
        </li>
        <li>
          <button
            className="flex w-full py-2 px-4 text-left hover:bg-blue-950 rounded-md"
            onClick={() => {
              navigate("/admins/user");
            }}
          >
            <span className="mt-1">
              <HiUsers />
            </span>
            <span className="ml-2">Users</span>
          </button>
        </li>
        <li>
          <button
            className="flex w-full py-2 px-4 text-left hover:bg-blue-950 rounded-md"
            onClick={() => navigate("/admins/ticket")}
          >
            <span className="mt-1">
              <FaTicketSimple />
            </span>
            <span className="ml-2"> Tickets</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Slider;
