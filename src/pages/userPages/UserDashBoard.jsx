import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router';

const UserDashBoard = () => {
  const state = useSelector((state) => state.activeUser);
  return (
    <div style={{ display: 'relative', top: '0' }}>
      <div className=" justify-items-end mr-10">
        <h3>Hello, {state.firstname}</h3>
        <a href="/" onClick={() => localStorage.removeItem('token')}>
          Sign out
        </a>
      </div>

      <div className="navigation-bar">
        <Link to="my-account">My account</Link>
        <Link to="my-orders">My orders</Link>
        <Link to="products">products</Link>
        {/* <Link  to="/">Sign out</Link> */}
      </div>
      <Outlet />
    </div>
  );
};

export default UserDashBoard;
