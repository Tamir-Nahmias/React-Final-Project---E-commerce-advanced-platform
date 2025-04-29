import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import db from '../../fireBase/fireBase';
import Table from '../../Table';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Orders = () => {
  const [closedOrders, setClosedOrders] = useState([]);
  const activeUser = useSelector((state) => state.activeUser);

  const getAllOrdersByiD = () => {
    const q = query(collection(db, 'orders'), where('userId', '==', activeUser.id));
    onSnapshot(q, (querySnapShot) => {
      setClosedOrders(
        querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,

            ...doc.data(),
          };
        })
      );
    });
  };

  useEffect(() => {
    getAllOrdersByiD();
  }, []);

  return (
    <div className=" flex flex-col w-fit justify-self-center">
      <h2>My orders</h2>
      <Table data={closedOrders} />
    </div>
  );
};

export default Orders;
