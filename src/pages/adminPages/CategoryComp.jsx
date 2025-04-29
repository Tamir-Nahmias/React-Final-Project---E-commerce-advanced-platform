import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { memo, useState } from 'react';
import db from '../../fireBase/fireBase';

const CategoryComp = ({ categoryName, categories, setCategories, id }) => {
  const CATEGORIES = 'categories';
  const [isTextShow, setIsTextShow] = useState(false);
  const [updatedName, setUpdatedName] = useState(categoryName);
  const handleRemove = () => {
    setCategories(categories.filter((category) => category.id !== id));
    deleteDoc(doc(db, CATEGORIES, id));
  };

  const handleSecondUpdateClick = () => {
    const obj = { name: updatedName };
    updateDoc(doc(db, CATEGORIES, id), obj);
    setIsTextShow(!isTextShow);
  };
  const handleUpdate = () => {
    isTextShow ? handleSecondUpdateClick() : setIsTextShow(!isTextShow);
  };

  return (
    <div className=" w-fit  flex justify-self-center p-1.5 m-1.5  items-center py-4">
      <div className=" min-w-45">
        {isTextShow ? (
          <input type="text" defaultValue={categoryName} onChange={(e) => setUpdatedName(e.target.value)}></input>
        ) : (
          <label className="w-fit">{categoryName}</label>
        )}
      </div>
      <button onClick={handleUpdate}>Update</button>
      <button id="remove-btn" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};

export default memo(CategoryComp);
