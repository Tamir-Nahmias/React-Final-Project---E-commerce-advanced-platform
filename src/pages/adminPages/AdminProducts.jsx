import React, { useEffect, useState } from 'react';
import ProductComp from './ProductComp';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import db from '../../fireBase/fireBase';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const PRODUCTS = 'products';

  const addHandler = () =>
    addDoc(collection(db, PRODUCTS), { title: '', category: '', description: '', price: 0, link: '' });

  useEffect(() => {
    console.log('from manage product use effect');
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
    <div>
      <h4>Manage Products</h4>
      {products.map((product) => {
        return <ProductComp key={product.id} data={product} />;
      })}

      <button onClick={addHandler}>Add new</button>
    </div>
  );
};

export default AdminProducts;
