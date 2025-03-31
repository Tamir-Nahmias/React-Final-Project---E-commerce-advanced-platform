// import { useSelector } from 'react-redux';
// import CartItem from './CartItem';

// const Cart = () => {
//   const state = useSelector((state) => state.order);
//   const orders = Object.values(state);
//   // console.log('from cart:', orders, 'type of state:', typeof orders, Array.isArray(orders));
//   return (
//     <div>
//       Cart
//       {orders
//         .filter((order) => {
//           return order?.amount !== 0;
//         })
//         .map((order) => {
//           return <CartItem order={order} key={order?.title} />;
//         })}
//       {/* <CartItem order={or}/> */}
//       Total :
//       {orders
//         .filter((order) => {
//           return Number(order?.amount);
//         })
//         .reduce((accumalator, currentOrder) => {
//           // console.log(preOrder.price, currentOrder.amount);
//           return accumalator + currentOrder.price * currentOrder.amount;
//         }, 0)}
//     </div>
//   );
// };

// export default Cart;

import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { useCallback, useEffect, useMemo } from 'react';
import db from '../../fireBase/fireBase';
import { addDoc, collection } from 'firebase/firestore';

const Cart = () => {
  const orderState = useSelector((state) => state.order); // Get the entire order state
  const activeUser = useSelector((state) => state.activeUser);
  console.log(activeUser);

  const dispatch = useDispatch();
  const addOrder = () => {
    orders.map((order) => {
      const obj = {
        userId: activeUser.id,
        title: order.title,
        quantity: order.amount,
        total: order.amount * order.price,
        date: new Date().toLocaleDateString().replaceAll('.', '/'),
      };
      addDoc(collection(db, 'orders'), obj);
    });
    dispatch({ type: 'DELETE', payload: {} });
  };

  // dispatch({ type: 'DELETE', payload: {} });

  // Use useMemo to avoid unnecessary filtering computations
  const orders = useMemo(() => {
    return Object.values(orderState).filter((order) => order?.amount !== 0);
  }, [orderState]); // Recalculate only when orderState changes

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      Cart
      {orders.map((order) => (
        <CartItem order={order} key={order?.title} />
      ))}
      <div id="sum-order-button" style={{ marginTop: '50px', display: 'flex', flexDirection: 'column' }}>
        Total :{'\u00A0'}
        {orders.reduce((accumulator, currentOrder) => {
          return accumulator + currentOrder.price * currentOrder.amount;
        }, 0)}
        <button onClick={addOrder}>Order</button>
        {/* <button onClick={reset}>Reset</button> */}
      </div>
    </div>
  );
};

export default Cart;
