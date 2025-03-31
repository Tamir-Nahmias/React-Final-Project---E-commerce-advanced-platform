import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router';

const AdminDashBoard = () => {
  const adminName = useSelector((state) => state.activeUser.firstname);

  return (
    <div>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <p>Hello , {adminName}</p>
        <Link to="/">Log out</Link>
      </header>

      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <Link to="categories">Categories</Link>
        <Link to="products">Products</Link>
        <Link to="customers">Customers</Link>
        <Link to="statistics">Statistics</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminDashBoard;
