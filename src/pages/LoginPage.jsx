import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SETACTIVE } from '../redux/consts';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersPool = useSelector((state) => state.users);
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const handleChange = (e) => {
    setIsWrongCredentials(false);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSuccessUserLogIn = (user) => {
    // user is configuered as  {username , password}
    dispatch({ type: SETACTIVE, payload: user });
    navigate('/Home');
  };
  const onSuccessAdminLogIn = (admin) => {
    dispatch({ type: SETACTIVE, payload: admin });
    navigate('/admin');
  };
  const handleLogIn = () => {
    usersPool
      .filter((user) => user.username === credentials.username && user.password === credentials.password)
      .map((user) => {
        user.role === 'admin'
          ? onSuccessAdminLogIn(user)
          : user.role === 'user'
          ? onSuccessUserLogIn(user)
          : setIsWrongCredentials(true);
      }).length === 0
      ? setIsWrongCredentials(true)
      : setIsWrongCredentials(false);
  };

  return (
    <div className="center">
      <div className="generic-container">
        <h2>Next generation E-commerce platform</h2>
        <div className=" mt-2.5">
          <label>User name : </label>
          <input type="text" name="username" onChange={handleChange}></input>
        </div>
        <div>
          <label>Password : </label>
          <input type="password" name="password" onChange={handleChange}></input>
        </div>
        {isWrongCredentials && <p style={{ color: 'red' }}>Wrong user or password</p>}

        <button className="button-for-forms mt-8" onClick={handleLogIn}>
          Login
        </button>
        <div>
          New user? <Link to="/new-user-registration">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
