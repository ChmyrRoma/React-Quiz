import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="p-10">
      <Outlet />
    </div>
  )
}

export default MainLayout;
