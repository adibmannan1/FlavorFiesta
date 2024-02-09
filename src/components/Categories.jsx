import React from 'react';
import { useGlobalContext } from '../context';

const Categories = () => {
    const { filterByCategory, categories } = useGlobalContext();
  
    return (
      <div className='category-container'>
        <h2 className='categories-title'>Categories</h2>
        <div className="categories">
          {categories.map((category) => (
            <div
              key={category.idCategory}
              onClick={() => filterByCategory(category.strCategory)}
              className='category-card'
            >
              <div className="img-container"><img src={category.strCategoryThumb} alt={category.strCategory} /></div>
              <h5>{category.strCategory}</h5>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
    export default Categories;
