import Table from '../../Table';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCollectionById } from '../../utilFunctions/util';
import { ORDERS } from '../../utilFunctions/collectionsName';

const Orders = () => {
  const [closedOrders, setClosedOrders] = useState([]);
  const activeUser = useSelector((state) => state.activeUser);

  useEffect(() => {
    getCollectionById(setClosedOrders, ORDERS, activeUser.id);
  }, []);

  return (
    <div className=" flex flex-col w-fit justify-self-center">
      <h2>My orders</h2>
      <Table data={closedOrders} />
    </div>
  );
};

export default Orders;
