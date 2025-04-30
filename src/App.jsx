import { Link, Routes, useNavigate, Route } from 'react-router';
import './App.css';
import LoginPage from './pages/LoginPage';
import NewUserReg from './pages/NewUserReg';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { USERS } from './redux/consts';
import AdminDashBoard from './pages/adminPages/AdminDashBoard';
import AdminProducts from './pages/adminPages/AdminProducts';
import Customers from './pages/adminPages/Customers';
import Categoriies from './pages/adminPages/Categories';
import Statistics from './pages/adminPages/Statistics';
import { collection, onSnapshot, query } from 'firebase/firestore';
import db from './fireBase/fireBase';
import ErrorPage from './pages/ErrorPage';
import UserDashBoard from './pages/userPages/UserDashBoard';
import Account from './pages/userPages/Account';
import Orders from './pages/userPages/Orders';
import Products from './pages/userPages/Products';
import RedirectionPage from './pages/redirectionPage';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    //second, on app launch I want to retrieve existing users from fireBase

    const q = query(collection(db, USERS));
    onSnapshot(q, (querySnapShot) => {
      dispatch({
        type: 'UPLOAD',
        payload: querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }),
      });
    });
  }, []);
  return (
    <>
      <Routes>
        {/* Public Routes - accessible for all  */}
        {/*automatically page lands at "/" when app component is renedered */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/new-user-registration" element={<NewUserReg />} />

        <Route path="/redirect" element={<RedirectionPage />} />
        {/* Admin's Routes */}
        <Route path="/admin" element={<AdminDashBoard />}>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="categories" element={<Categoriies />}></Route>
          <Route path="statistics" element={<Statistics />}></Route>
          <Route path="customers" element={<Customers />}></Route>
        </Route>
        {/* Customer's pages :  */}
        <Route path="/Home" element={<UserDashBoard />}>
          <Route path="my-account" element={<Account />}></Route>
          <Route path="my-orders" element={<Orders />}></Route>
          <Route path="products" element={<Products />}></Route>
        </Route>
        {/* when nothing is matched to be the url : */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
