import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { useMemo, useState } from 'react';
import db from '../../fireBase/fireBase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ORDERS, PRODUCTS } from '../../utilFunctions/collectionsName';
import { DELETE, UPDATE_INVENTORY_BOUGHT } from '../../redux/consts';

const Cart = ({ setIsCartSlided, isCartSlided }) => {
  const orderState = useSelector((state) => state.order); // Get the entire order state
  const activeUser = useSelector((state) => state.activeUser);
  // const inventoryBought = useSelector((state) => state.inventory_bought);
  const [isClickedSvg, setIsClickedSvg] = useState(false);
  const handleOnClickSvg = (e) => {
    setIsClickedSvg(!isClickedSvg);
    setIsCartSlided(!isCartSlided);
  };

  // Use useMemo to avoid unnecessary filtering computations
  const orders = useMemo(() => {
    return Object.values(orderState).filter((order) => order?.amount !== 0);
  }, [orderState]); // Recalculate only when orderState changes

  const dispatch = useDispatch();

  const addOrder = async () => {
    for (const order of orders) {
      const obj = {
        userId: activeUser.id,
        title: order.title,
        quantity: order.amount,
        total: order.amount * order.price,
        date: new Date().toLocaleDateString().replaceAll('.', '/'),
      };
      await addDoc(collection(db, ORDERS), obj);

      const productRef = doc(db, PRODUCTS, order.categoryId);

      // Fetch the current product data from Firestore
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const productData = productSnap.data();
        const currentBought = Number(productData.bought || 0);
        const currentInventory = Number(productData.inventory || 0);
        dispatch({
          type: UPDATE_INVENTORY_BOUGHT,
          payload: {
            ...order,
          },
        });
        if (activeUser.isAllowing) {
          await updateDoc(productRef, {
            bought: currentBought + order.amount,
            inventory: Math.max(currentInventory - order.amount, 0),
          });
        } else {
          await updateDoc(productRef, {
            inventory: Math.max(currentInventory - order.amount, 0),
          });
        }
      }
    }
    dispatch({ type: DELETE, payload: {} });
  };

  return (
    <div className="cart-container">
      <h3>Cart</h3>
      {orders.map((order) => (
        <CartItem order={order} key={order?.title} />
      ))}
      <div id="sum-order-button" style={{ marginTop: '50px', display: 'flex', flexDirection: 'column' }}>
        Total :{'\u00A0'}
        {orders.reduce((accumulator, currentOrder) => {
          return accumulator + currentOrder.price * currentOrder.amount;
        }, 0)}
        <button id="order-button" onClick={addOrder}>
          Order
        </button>
        {/* <button onClick={reset}>Reset</button> */}
      </div>
      <svg
        className={!isClickedSvg ? 'arrow-svg' : 'arrow-svg-reverse'}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleOnClickSvg}
      >
        <path d="M10 20l6-6-6-6" stroke="black" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
};

export default Cart;
