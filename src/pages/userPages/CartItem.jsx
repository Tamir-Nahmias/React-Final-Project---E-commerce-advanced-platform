import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import db from '../../fireBase/fireBase';
import { collection, onSnapshot, query } from 'firebase/firestore';

const CartItem = ({ order }) => {
  // const dispatch = useDispatch();
  // //   sessionStorage.setItem('amount', 909);
  // const [amount, setAmount] = useState(order.amount);
  // const handleClick = (e) => {
  //   e.target.name === 'plus' ? setAmount(order.amount + 1) : amount === 0 ? setAmount(0) : setAmount(order.amount - 1);
  // };
  // useEffect(() => {
  //   dispatch({ type: 'ADDPRODUCT', payload: { ...order, amount: amount } });
  // }, [amount]);

  // const stateAmount = useSelector((state) => {
  //   return state.order[product?.title]?.amount ?? 0;
  // }, shallowEqual);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    console.log(order);
    dispatch({
      type: 'ADDPRODUCT',
      payload: { ...order, amount: order.amount, change: e.target.name === 'plus' ? 1 : -1 },
    });
  };
  const handleRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { ...order } });
  };

  return (
    <div
      className="single-order-in-cart"
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}
    >
      {order.title}
      <button name="minus" onClick={handleClick}>
        -
      </button>
      {order.amount}
      <button name="plus" onClick={handleClick}>
        +
      </button>
      <p style={{ marginRight: '10px' }}> units - Total : {order.amount * order.price}$ </p>
      <button onClick={handleRemove} style={{ borderRadius: '20px', padding: '0 0' }}>
        <img style={{ width: '25px', height: 'auto' }} src="/assets/icons8-close-48.png"></img>
      </button>
    </div>
  );
};

export default memo(CartItem);
