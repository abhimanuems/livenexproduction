import React from 'react'
import Header from '../user/Header';
import Slider from '../user/Slider';
import Share from '../user/Share'
const SharePage = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex">
        <div className=" w-1/6  h-screen bg-[#19376D]">
          <Slider />
        </div>

        <div className=" w-5/6">
          <Share />
        </div>
      </div>
    </div>
  );
}

export default SharePage