import React from 'react'
import Header from '../admin/Header'
import Slider from '../admin/Slider'
import Subscription from "../admin/Subscription";

const subscriptionAdmin = () => {
  return (
   <>
   <Header/>
   <div className='flex'>
        <Slider/>
        <Subscription/>
   </div>
   </>
  )
}

export default subscriptionAdmin