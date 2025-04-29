import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { addDocument } from '../utilFunctions/util';
import { USERS } from '../redux/consts';
import db from '../fireBase/fireBase';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

const UserForm = ({ isToUpdate }) => {
  const dispatch = useDispatch();
  // const activeUser = useSelector((state) => state.activeUser);
  const [activeUser, setActiveUser] = useState(useSelector((state) => state.activeUser));

  const [details, setDetails] = useState({
    firstname: isToUpdate ? activeUser.firstname : '',
    lastname: isToUpdate ? activeUser.lastname : '',
    username: isToUpdate ? activeUser.username : '',
    password: isToUpdate ? activeUser.password : '',
    isAllowing: isToUpdate ? activeUser.isAllowing : false,
    role: 'user',
    joinDate: isToUpdate ? activeUser.joinDate : new Date().toLocaleDateString().replaceAll('.', '/'),
    products_bought: [
      { product: 'TV', quantity: 3, date: '1/1/2020' },
      { product: 'SHIRTS', quantity: 6, date: '1/1/2021' },
    ],
  });

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const updateUser = () => {
    // save to db
    updateDoc(doc(db, USERS, activeUser.id), details);
    //save to redux to reflect changes live in FE
    dispatch({ type: 'SETACTIVE', payload: { ...details, id: activeUser.id } });
  };

  const sendForm = (e) => {
    e.preventDefault();
    !isToUpdate ? addDocument(USERS, details) : isToUpdate ? updateUser() : undefined;
  };

  return (
    //TODO : Add validation to inputs that the field can't be empty / in password maybe use regex
    <form onSubmit={sendForm}>
      <div>
        <label>First name : </label>
        <input
          type="text"
          name="firstname"
          onChange={onChangeHandler}
          defaultValue={isToUpdate ? activeUser.firstname : ''}
        ></input>
      </div>
      <div>
        <label>Last Name : </label>
        <input
          type="text"
          name="lastname"
          onChange={onChangeHandler}
          defaultValue={isToUpdate ? activeUser.lastname : ''}
        ></input>
      </div>
      <div>
        <label>User name : </label>
        <input
          type="text"
          name="username"
          onChange={onChangeHandler}
          defaultValue={isToUpdate ? activeUser.username : ''}
        ></input>
      </div>
      <div>
        <label>Password : </label>
        <input
          type="password"
          name="password"
          onChange={onChangeHandler}
          defaultValue={isToUpdate ? activeUser.password : ''}
        ></input>
      </div>
      <div className="flex justify-around items-center">
        <input
          type="checkbox"
          onChange={(e) => setDetails({ ...details, isAllowing: e.target.checked })}
          // TODO : think of a way to show the current checked status from db
          // maybe build a small component to be sent with props or think of a custom hooks
          defaultChecked={isToUpdate ? activeUser.isAllowing : false}
        ></input>
        <label className="allow-label">Allow others to see my orders</label>
      </div>
      <button className="button-for-forms" type="submit">
        {isToUpdate ? 'Update' : 'Create'}
      </button>
      <Link to="/">Back</Link>
    </form>
  );
};

export default UserForm;
