import { useEffect, useState } from 'react';
import Table from '../../Table';
import db from '../../fireBase/fireBase';
import { addDoc, collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
//default props for generic uses
const CategoryDropDownList = ({ onChangeEventHandler = () => {}, selectedOption = '' }) => {
  const CATEGORIES = 'categories';
  const [categories, setCategories] = useState([{ name: '', id: '' }]);

  useEffect(() => {
    getAllDocs();
  }, []);

  const getAllDocs = () => {
    const q = query(collection(db, CATEGORIES));
    onSnapshot(q, (querySnapShot) => {
      setCategories(
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
      <label htmlFor="category">Category : </label>
      <select id="category" name="category" value={selectedOption} onChange={onChangeEventHandler}>
        <option value="all">All</option>
        {categories.map((category) => (
          <option value={category.name.toLowerCase()} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropDownList;
