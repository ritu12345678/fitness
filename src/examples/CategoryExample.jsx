import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, clearError } from '../store/slices/categorySlice';

function CategoryExample() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClearError = () => {
    dispatch(clearError());
  };

  if (loading) return <div>Loading categories...</div>;
  
  if (error) {
    return (
      <div>
        <div>Error: {error}</div>
        <button onClick={handleClearError}>Clear Error</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories?.map((category, index) => (
          <li key={category.id || index}>
            {category.name || category.title || JSON.stringify(category)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryExample;






