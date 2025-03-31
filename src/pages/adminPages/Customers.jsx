import { useCallback, useEffect, useMemo, useState } from 'react';
import Table from '../../Table';
import { collection, onSnapshot, query } from 'firebase/firestore';
import db from '../../fireBase/fireBase';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  // const CustomersJoinOrders = customers.map((user) => {
  //   return {
  //     Name: user.firstname,
  //     ['Joined at']: user.joinDate,
  //     ['Products bought']: orders
  //       .filter((order) => {
  //         return order.userId === user.id;
  //       })
  //       .map((order) => {
  //         return { Product: order.title, Qty: order.quantity, Date: order.date };
  //       }),
  //   };
  // });
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
  // const refinedOrdrs = CustomersJoinOrders.filter((tupple) => {
  //   console.log(tupple['Products bought'].length > 0);
  //   return tupple['Products bought'].length > 0;
  // });

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

  return (
    <div>
      <h2>Customers</h2>
      <Table data={CustomersJoinOrders} />
    </div>
  );
};

export default Customers;
