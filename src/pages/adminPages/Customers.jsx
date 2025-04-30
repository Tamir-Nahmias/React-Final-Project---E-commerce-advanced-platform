import { useCallback, useEffect, useMemo, useState } from 'react';
import Table from '../../Table';
import { getAllDocs } from '../../utilFunctions/util';
import { ORDERS, USERS } from '../../utilFunctions/collectionsName';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const CustomersJoinOrders = useMemo(() => {
    return customers.map((user) => ({
      Name: user.firstname,
      ['Joined at']: user.joinDate,
      ['Products bought']: orders
        .filter((order) => order.userId === user.id)
        .map((order) => ({
          Product: order.title,
          Qty: order.quantity,
          Date: order.date,
        })),
    }));
  }, [customers, orders]);

  useEffect(() => {
    getAllDocs(setCustomers, USERS);
    getAllDocs(setOrders, ORDERS);
  }, []);

  return (
    <div className=" flex flex-col w-fit justify-self-center">
      <h2>Customers</h2>
      <Table data={CustomersJoinOrders} />
    </div>
  );
};

export default Customers;
