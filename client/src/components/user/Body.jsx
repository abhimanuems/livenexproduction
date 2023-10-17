import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSubscriptionMutation } from "../../slices/userApiSlice";
import { clearRTMPURLS } from "../../slices/userDetails.js";
import Destination from "../user/Destination";
import { toast } from "react-toastify";


const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pro, setPro] = useState();
  const { userInfo } = useSelector((state) => state.auth);
  const [subscribe] = useSubscriptionMutation();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    const isSubscribed = subscribe().unwrap();
    if (isSubscribed) {
      setPro(true);
    } else {
      setPro(false);
    }
    dispatch(clearRTMPURLS());
    setPro(false)
  }, []);

  const handleModal = () => {
    return true;
  };


  return (
    <div className="bg-white w-5/6 p-4">
      <p className="font-semibold text-blue-900 text-2xl p-2 m-2">Streams</p>
      <div className="m-2 p-2">
        {pro ? (
          <Destination onClick={handleModal} />
        ) : (
          <button
            className="bg-transparent hover:bg-blue-500 text-[#576CBC] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            type="button"
            onClick={()=>toast.info("subscribe to continue")}
          >
            Create Live

          </button>
        )}
      </div>
    </div>
  );
};

export default Body;
