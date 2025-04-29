import { memo, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const ProductCompBuyers = ({ product }) => {
  const stateAmount = useSelector((state) => {
    return state.order[product?.title]?.amount ?? 0;
  }, shallowEqual);

  const dispatch = useDispatch();

  const handleClick = useCallback(
    (e) => {
      console.log('product from the right hand side products:', product);
      dispatch({
        type: 'ADDPRODUCT',
        payload: {
          ...product,
          amount: stateAmount,
          categoryId: product.id,
          change: e.target.name === 'plus' ? 1 : -1,
        },
      });
      // dispatch({
      //   type: 'UPDATE_INVENTORY_BOUGHT',
      //   payload: {  },
      // });
    },
    [dispatch, stateAmount]
  );

  return (
    <article className="content-card">
      <header>
        <h3>{product.title}</h3>
      </header>
      <div className="content">
        <p>{product.description}</p>
        <p>Price : {product.price}$</p>
        <p>in stock : {product.inventory}</p>
        <img
          style={{ width: '100px', height: 'auto', placeSelf: 'center' }}
          src={product.link}
          alt={product.description}
        ></img>
        <p>Bought : {product.bought}</p>
        <div id="buyesCardButtonSection">
          <button name="minus" onClick={handleClick}>
            -
          </button>
          <input min={0} type="number" value={stateAmount}></input>
          <button name="plus" onClick={handleClick}>
            +
          </button>
        </div>
      </div>
    </article>
  );
};

export default memo(ProductCompBuyers);
