import ProductCompBuyers from './ProductCompBuyers';
import Cart from './Cart';
import CategoryDropDownList from '../adminPages/CategoryDropDownList';
import { useEffect, useMemo, useState } from 'react';
import db from '../../fireBase/fireBase';
import { collection, onSnapshot, query } from 'firebase/firestore';

const Products = () => {
  const [filters, setfilters] = useState({ category: 'all', slide: 0, search: '' });
  const [minMax, setMinMax] = useState({ max: 0, min: 0 });
  const [products, setProducts] = useState([]);
  const [isCartSlided, setIsCartSlided] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return filters.category === 'all'
        ? Number(product.price) <= Number(filters.slide) && product.title.includes(filters.search)
        : Number(product.price) <= Number(filters.slide) &&
            product.title.includes(filters.search) &&
            product.category === filters.category;
    });
  }, [filters, products]);

  useEffect(() => {
    getAllDocs();
  }, []);

  useEffect(() => {
    minMaxRange();
    console.log(products);
  }, [products]);

  const getAllDocs = () => {
    const q = query(collection(db, 'products'));
    onSnapshot(q, (querySnapShot) => {
      setProducts(
        querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  };

  const minMaxRange = () => {
    const x = products.map((product) => {
      return Number(product.price);
    });
    setMinMax({ max: Math.max(...x), min: Math.min(...x) });
    setfilters({ ...filters, slide: Number(Math.max(...x)) });
  };

  const eventHandler = (e) => {
    setfilters({ ...filters, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Products</h2>
      <div
        id="filter-bar"
        className="bg-indigo-50"
        style={{ display: 'flex', justifyContent: 'space-around', marginBlock: '30px', paddingBlock: '20px' }}
      >
        <h3> filter by </h3>
        <div id="category-filter">
          {/* {console.log(filters)} */}
          <CategoryDropDownList onChangeEventHandler={eventHandler} selectedOption={filters.category} />
        </div>
        <div id="range-price-filter">
          <input
            className="filters-input"
            type="range"
            min={minMax.min}
            max={minMax.max}
            name="slide"
            defaultValue={minMax.max}
            id="priceRange"
            onChange={eventHandler}
          ></input>
          <label>{filters.slide}$</label>
        </div>
        <div id="search-filter">
          <label>Title : </label>
          <input className="filters-input" type="text" name="search" onChange={eventHandler}></input>
        </div>
      </div>
      <div
        id="products-and-cart"
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <ul id="products" className="card-list mr-10">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <ProductCompBuyers product={product} />
            </li>
          ))}
        </ul>
        <div className={!isCartSlided ? 'sticky-cart' : 'sticky-cart-reverse'}>
          <Cart setIsCartSlided={setIsCartSlided} isCartSlided={isCartSlided} />
        </div>
      </div>
    </div>
  );
};

export default Products;
