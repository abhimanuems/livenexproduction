import React from 'react';
import Header from '../admin/Header';
import Slider from '../admin/Slider';
import Dashboard from '../admin/Dashboard';


const DashboardPage = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <Slider />
        <Dashboard />
      </div>
    </>
  );
}

export default DashboardPage