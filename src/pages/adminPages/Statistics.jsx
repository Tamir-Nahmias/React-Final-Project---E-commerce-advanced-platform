import { useEffect, useMemo, useState } from 'react';
import BarChart from './graphs/BarChart';
import PieChart from './graphs/PieChart';
import { getAllDocs } from '../../utilFunctions/util';
import { ORDERS, USERS } from '../../utilFunctions/collectionsName';

const Statistics = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalPerProduct, setTotalPerProduct] = useState({});
  const [totalPerCustomer, setTotalPerCustomer] = useState([]);

  useEffect(() => {
    getAllDocs(setCustomers, USERS);
    getAllDocs(setOrders, ORDERS);
  }, []);

  useMemo(() => {
    return orders.reduce((acc, order) => {
      acc[order.title] = (acc[order.title] ?? 0) + order.quantity;
      return acc;
    }, {});
  }, [orders]);

  const sumTotalPerCustomer = useMemo(() => {
    const sumObj = {};

    orders.forEach((order) => {
      sumObj[order.title] = (sumObj[order.title] ?? 0) + order.quantity;
    });
    setTotalPerProduct(sumObj);
  }, [orders]);

  const CustomersJoinOrders = useMemo(() => {
    setTotalPerCustomer(
      customers.map((user) => ({
        name: user.firstname,
        userId: user.id,
        ordersByCustomer: orders
          .filter((order) => order.userId === user.id)
          .reduce((acc, order) => {
            acc[order.title] = (acc[order.title] ?? 0) + order.quantity;
            return acc;
          }, {}),
      }))
    );
  }, [customers, orders]);

  return (
    <div className="flex flex-col place-items-center">
      <h2>Statistics</h2>
      <BarChart dataForBar={totalPerCustomer} />
      <PieChart dataForPie={totalPerProduct} />
    </div>
  );
};

export default Statistics;
