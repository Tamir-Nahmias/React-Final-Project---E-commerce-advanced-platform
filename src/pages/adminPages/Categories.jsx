import { useEffect, useState } from 'react';
import { addDocument } from '../../utilFunctions/util';
import db from '../../fireBase/fireBase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import CategoryComp from './CategoryComp';

const Categories = () => {
  const CATEGORIES = 'categories';
  const [categoryName, setCategoryName] = useState('');
  // in order to prevent initial empty rendering
  // of the initial category object - I added blank values
  //the dummy object  will be overriden afterwards by the useEffect triggers setCategories
  const [categories, setCategories] = useState([{ name: '', id: '' }]);

  const addHandler = () => {
    //Adding the tupple to db
    addDocument(CATEGORIES, { name: categoryName });
    setCategoryName('');
    //adding the new insert to local state variable array
    // setCategories([...categories, { name: categoryName }]);
  };

  useEffect(() => {
    console.log('from use effect of Categories');
    const q = query(collection(db, CATEGORIES));
    onSnapshot(q, (querySnapShot) => {
      setCategories(
        querySnapShot.docs.map((doc) => {
          console.log(doc.id);
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <div className="w-fit flex flex-col justify-self-center items-center">
      {console.log('from dom Categories')}
      <h2>Categories</h2>
      <div id="category-container">
        <div className="categories-list">
          {categories.map((category) => (
            <CategoryComp
              key={category.id}
              categoryName={category.name}
              categories={categories}
              setCategories={setCategories}
              id={category.id}
            />
          ))}
        </div>
        <div className=" flex-row">
          <button className="button-add-new" onClick={addHandler}>
            Add
          </button>
          <input
            id="category-input"
            type="text"
            placeholder="Add new category..."
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Categories;
