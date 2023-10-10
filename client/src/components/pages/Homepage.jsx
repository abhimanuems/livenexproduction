import React from 'react'
import Header from '../user/Header'
import BodyPage from './BodyPage';
import Slider from '../user/Slider';

const Homepage = () => {
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
         <BodyPage />
       </div>
     </div>
   </>
 );
};

export default Homepage