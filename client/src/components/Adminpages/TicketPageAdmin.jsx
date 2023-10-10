import React from "react";
import Header from "../admin/Header";
import Slider from "../admin/Slider";
import Ticket from '../admin/Ticket'

const TicketPageAdmin = () => {return(

   <>
   <Header/>
   <div className='flex'>
        <Slider/>
        <Ticket/>
   </div>
   </>
)
}

export default TicketPageAdmin;
