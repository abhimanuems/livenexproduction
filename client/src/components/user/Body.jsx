import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSubscriptionMutation } from "../../slices/userApiSlice";
import { clearRTMPURLS } from "../../slices/userDetails.js";
import Destination from "../user/Destination";

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
  }, []);

  const handleModal = () => {
    return true;
  };
 

  return (
    <div className="bg-white w-5/6 p-4">
      <p className="font-semibold text-[#576CBC] text-2xl p-2 m-2">Streams</p>
      <div className="m-2 p-2">
        <Destination onClick={handleModal} />
      </div>
    </div>
  );
};

export default Body;
