import React, { useEffect, useState } from 'react';
import ProductComp from './ProductComp';
import { addDoc, collection } from 'firebase/firestore';
import db from '../../fireBase/fireBase';
import { getAllDocs } from '../../utilFunctions/util';
import { PRODUCTS } from '../../utilFunctions/collectionsName';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const addHandler = () =>
    addDoc(collection(db, PRODUCTS), { title: '', category: '', description: '', price: 0, link: '', inventory: 0 });

  useEffect(() => {
    getAllDocs(setProducts, PRODUCTS);
  }, []);

  return (
    <div className="main-categories-container">
      <h2>Manage Products</h2>
      {products.map((product) => {
        return <ProductComp key={product.id} data={product} />;
      })}

      <button className="button-add-new" onClick={addHandler}>
        Add new
      </button>
    </div>
  );
};

export default AdminProducts;
