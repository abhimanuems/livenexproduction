import React from 'react'
import Slider from '../admin/Slider';
import Users from '../admin/Users';
import Header from '../admin/Header';

const UserlistPage = () => {
  return (
      <>
        <Header />
        <div className="flex">
          <Slider />
          <Users/>
        </div>
      </>

  );
}

export default UserlistPage