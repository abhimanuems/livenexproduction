import React from 'react'
import Header from "../user/Header";
import Subscription from '../user/Subscription'
import Slider from "../user/Slider";

const SubscriptionPage = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex">
        <div className=" w-1/6  h-screen bg-[#19376D]">
          <Slider />
        </div>

        <div className=" w-5/6">
          <Subscription />
        </div>
      </div>
    </>
  );
}

export default SubscriptionPage