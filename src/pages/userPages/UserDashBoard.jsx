import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router';

const UserDashBoard = () => {
  const state = useSelector((state) => state.activeUser);
  return (
    <div style={{ top: '100vh' }}>
      <h3>Hello, {state.firstname}</h3>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <Link to="my-account">My account</Link>
        <Link to="my-orders">My orders</Link>
        <Link to="products">products</Link>
        <Link to="/">Sign out</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default UserDashBoard;
