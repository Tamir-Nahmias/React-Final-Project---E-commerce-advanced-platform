import { useCallback, useEffect, useState } from 'react';
import Table from '../../Table';
import db from '../../fireBase/fireBase';
import { doc, updateDoc } from 'firebase/firestore';
import CategoryDropDownList from './CategoryDropDownList';
import { getAllDocs } from '../../utilFunctions/util';
import { ORDERS, PRODUCTS, USERS } from '../../utilFunctions/collectionsName';

// A-D-M-I-N PRODUCT
// data is the specific product
const ProductComp = ({ data }) => {
  const [product, setproduct] = useState({});
  const [selectedOption, setSelectedOption] = useState(data.category);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [userOrdersTable, setUserOrdersTable] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    getAllDocs(setUsers, USERS);
    setLoadingUsers(false);
    getAllDocs(setOrders, ORDERS);
    setLoadingOrders(false);
  }, []);

  useEffect(() => {
    if (loadingUsers || loadingOrders) return; // Don't run until both are loaded

    const temp = orders.filter((order) => order.title === data.title);
    setFilteredOrders(temp);
  }, [orders, loadingUsers, loadingOrders]); // Run when orders or loading states change

  useEffect(() => {
    if (loadingUsers || loadingOrders) return; // Don't run until both are loaded

    const userOrders = users.map((user) => {
      const userOrders = filteredOrders.filter((order) => order.userId === user.id);
      return userOrders.map((order) => ({
        name: user.firstname,
        qty: order.quantity,
        date: order.date,
      }));
    });

    // Flatten the resulting array and set it to the table state
    setUserOrdersTable(userOrders.flat());
  }, [users, filteredOrders, loadingUsers, loadingOrders]);

  const inputHandler = useCallback(
    (e) => {
      setproduct({ ...product, [e.target.name]: e.target.value });
      if (e.target.name === 'category') {
        setSelectedOption(e.target.value);
      }
    },
    [product]
  );

  const saveHandler = useCallback(() => {
    updateDoc(doc(db, PRODUCTS, data.id), product);
  }, [product]);

  return (
    <div className="manage-prod-container">
      <div className="prod-upper-content">
        <div>
          <label>Title : </label>
          <input name="title" type="text" onChange={inputHandler} defaultValue={data.title}></input>
        </div>

        <CategoryDropDownList
          onChangeEventHandler={inputHandler}
          data={data}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
        <div>
          <label htmlFor="description">Description : </label>
          <textarea
            id="description"
            name="description"
            type="text"
            onChange={inputHandler}
            defaultValue={data.description}
          ></textarea>
        </div>
        <div>
          <label>Price : </label>
          <input name="price" type="number" onChange={inputHandler} defaultValue={data.price}></input>
        </div>
        <div>
          <label>Link to pic : </label>
          <input name="link" type="text" onChange={inputHandler} defaultValue={data.link}></input>
        </div>
        <div>
          <label>Inventory : </label>
          <input type="number" name="inventory" onChange={inputHandler} defaultValue={data.inventory}></input>
        </div>
        <div>
          <label>Brought By : </label>
          <div className="div-container-overflow">
            <Table data={userOrdersTable} />
          </div>
        </div>
      </div>

      <div id="manage-container-button">
        <button onClick={saveHandler}>Save</button>
      </div>
    </div>
  );
};

export default ProductComp;
