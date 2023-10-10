import React from 'react'
import Header from '../user/Header';
import Slider from '../user/Slider';
import Ticket from '../user/Ticket';

const TicketPage = () => {
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
          <Ticket />
        </div>
      </div>
    </>
  );
}

export default TicketPage