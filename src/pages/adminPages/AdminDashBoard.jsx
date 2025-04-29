import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router';

const AdminDashBoard = () => {
  const adminName = useSelector((state) => state.activeUser.firstname);

  return (
    <div className="no-center">
      <div>
        <header className=" justify-items-end mr-10">
          <h3>Hello , {adminName}</h3>
          <Link to="/">Log out</Link>
        </header>

        <div className="navigation-bar">
          <Link to="categories">Categories</Link>
          <Link to="products">Products</Link>
          <Link to="customers">Customers</Link>
          <Link to="statistics">Statistics</Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashBoard;
