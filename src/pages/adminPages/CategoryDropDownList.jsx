import { useEffect, useState } from 'react';
import { getAllDocs } from '../../utilFunctions/util';
import { CATEGORIES } from '../../utilFunctions/collectionsName';
//default props for generic uses
const CategoryDropDownList = ({ onChangeEventHandler = () => {}, selectedOption = '' }) => {
  const [categories, setCategories] = useState([{ name: '', id: '' }]);

  useEffect(() => {
    getAllDocs(setCategories, CATEGORIES);
  }, []);

  return (
    <div id="category-filter">
      <label htmlFor="category">Category : </label>
      <select
        className="beautiful-dropdown"
        id="category"
        name="category"
        value={selectedOption}
        onChange={onChangeEventHandler}
      >
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
