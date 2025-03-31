import { useEffect, useState } from 'react';
import Table from '../../Table';
import db from '../../fireBase/fireBase';
import { addDoc, collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import CategoryDropDownList from './CategoryDropDownList';

// A-D-M-I-N PRODUCT
// data is the specific product
const ProductComp = ({ data }) => {
  const [product, setproduct] = useState({});
  const [selectedOption, setSelectedOption] = useState(data.category);

  const inputHandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
    if (e.target.name === 'category') {
      setSelectedOption(e.target.value);
    }
  };

  const saveHandler = () => updateDoc(doc(db, 'products', data.id), product);

  return (
    <div id="manage-prod-container">
      <div className="prod-upper-content" style={{ display: 'grid' }}>
        <div>
          <label>Title : </label>
          <input name="title" type="text" onChange={inputHandler} defaultValue={data.title}></input>
        </div>

        <CategoryDropDownList
          onChangeEventHandler={inputHandler}
          data={data}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
        <div>
          <label htmlFor="description">Description : </label>
          <textarea
            id="description"
            name="description"
            type="text"
            onChange={inputHandler}
            defaultValue={data.description}
          ></textarea>
        </div>
        <div>
          <label>Price : </label>
          <input name="price" type="number" onChange={inputHandler} defaultValue={data.price}></input>
        </div>
        <div>
          <label>Link to pic : </label>
          <input name="link" type="text" onChange={inputHandler} defaultValue={data.link}></input>
        </div>
        <div>
          A Table dispaly
          {/* <Table /> */}
        </div>
      </div>

      <div id="manage-container-button">
        <button onClick={saveHandler}>Save</button>
      </div>
    </div>
  );
};

export default ProductComp;
