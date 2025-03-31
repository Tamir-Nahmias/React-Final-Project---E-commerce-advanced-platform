// import { memo, useCallback, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// const ProductCompBuyers = ({ product = {} }) => {
//   const stateAmount = useSelector((state) => state.order[product.title]?.amount);

//   const [amount, setAmount] = useState(stateAmount === undefined ? 0 : stateAmount);
//   const dispatch = useDispatch();

//   const handleClick = (e) => {
//     // sessionStorage.setItem('amount',sessionStorage.getItem('amount')+1)
//     e.target.name === 'plus' ? setAmount(amount + 1) : amount === 0 ? setAmount(0) : setAmount(amount - 1);
//   };
//   useEffect(() => {
//     dispatch({ type: 'ADDPRODUCT', payload: { ...product, amount: amount } });
//   }, [amount]);
//   useEffect(() => {
//     setAmount(stateAmount);
//   }, [stateAmount]);
//   return (
//     <article>
//       <header>
//         <h4>{product.title}</h4>
//       </header>
//       <div className="content">
//         <p>{product.description}</p>
//         <p>{product.price}</p>
//         <p>in stock</p>
//         <img style={{ width: '100px', height: 'auto' }} src={product.link} alt={product.description}></img>
//         <button name="minus" onClick={handleClick}>
//           -
//         </button>
//         <input min={0} style={{ width: '40px' }} type="number" defaultValue={0} value={stateAmount}></input>
//         <button name="plus" onClick={handleClick}>
//           +
//         </button>
//       </div>
//     </article>
//   );
// };

// export default memo(ProductCompBuyers);

import { memo, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const ProductCompBuyers = ({ product }) => {
  const stateAmount = useSelector((state) => {
    return state.order[product?.title]?.amount ?? 0;
  }, shallowEqual);

  const dispatch = useDispatch();

  const handleClick = useCallback(
    (e) => {
      dispatch({
        type: 'ADDPRODUCT',
        payload: { ...product, amount: stateAmount, change: e.target.name === 'plus' ? 1 : -1 },
      });
    },
    [dispatch]
  );

  return (
    <article>
      <header>
        <h4>{product.title}</h4>
      </header>
      <div className="content">
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>in stock</p>
        <img
          style={{ width: '100px', height: 'auto', placeSelf: 'center' }}
          src={product.link}
          alt={product.description}
        ></img>
        <button name="minus" onClick={handleClick}>
          -
        </button>
        <input min={0} style={{ width: '40px' }} type="number" value={stateAmount}></input>
        <button name="plus" onClick={handleClick}>
          +
        </button>
      </div>
    </article>
  );
};

export default memo(ProductCompBuyers);
