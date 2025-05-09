import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { ADDPRODUCT, REMOVE_FROM_CART } from '../../redux/consts';

const CartItem = ({ order }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    console.log(order);
    dispatch({
      type: ADDPRODUCT,
      payload: { ...order, amount: order.amount ?? 0, change: e.target.name === 'plus' ? 1 : -1 },
    });
  };
  const handleRemove = () => {
    dispatch({ type: REMOVE_FROM_CART, payload: { ...order } });
  };

  return (
    <div
      className="single-order-in-cart"
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}
    >
      {order.title}
      {'\u00A0'}
      <button name="minus" onClick={handleClick}>
        -
      </button>
      {'\u00A0'}
      {order.amount}
      {'\u00A0'}
      <button name="plus" onClick={handleClick}>
        +
      </button>
      {'\u00A0'}
      <p style={{ marginRight: '10px' }}> units - Total : {order.amount * order.price}$ </p>
      <button onClick={handleRemove} style={{ borderRadius: '20px', padding: '0 0' }} id="colsing-button">
        <img style={{ width: '25px', height: 'auto' }} src="/assets/icons8-close-48.png"></img>
      </button>
    </div>
  );
};

export default memo(CartItem);
