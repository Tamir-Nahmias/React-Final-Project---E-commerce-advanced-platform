import { useCallback, useEffect, useMemo, useState } from 'react';
import BarChart from './graphs/BarChart';
import PieChart from './graphs/PieChart';
import db from '../../fireBase/fireBase';
import { collection, onSnapshot, query } from 'firebase/firestore';

const Statistics = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalPerProduct, setTotalPerProduct] = useState({});
  const [totalPerCustomer, setTotalPerCustomer] = useState([]);

  useEffect(() => {
    getAllusers();
    getAllOrders();
  }, []);

  const getAllusers = useCallback(() => {
    const q = query(collection(db, 'users'));
    onSnapshot(q, (querySnapShot) => {
      setCustomers(
        querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  const getAllOrders = useCallback(() => {
    const q = query(collection(db, 'orders'));
    onSnapshot(q, (querySnapShot) => {
      setOrders(
        querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
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
