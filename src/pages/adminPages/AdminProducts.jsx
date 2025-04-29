import React, { useEffect, useState } from 'react';
import ProductComp from './ProductComp';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import db from '../../fireBase/fireBase';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const PRODUCTS = 'products';

  const addHandler = () =>
    addDoc(collection(db, PRODUCTS), { title: '', category: '', description: '', price: 0, link: '', inventory: 0 });

  useEffect(() => {
    getAllDocs();
  }, []);

  const getAllDocs = () => {
    const q = query(collection(db, PRODUCTS));
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
