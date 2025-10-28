import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../store/slices/locationSlice';
import { fetchCategories } from '../store/slices/categorySlice';

function ApiTestComponent() {
  const dispatch = useDispatch();
  const { locations, loading: locationsLoading, error: locationsError } = useSelector((state) => state.location);
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.category);

  useEffect(() => {
    console.log('Testing API endpoints...');
    dispatch(fetchLocations());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>API Test Results</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>Locations API (admin/locations)</h4>
        <p>Loading: {locationsLoading ? 'Yes' : 'No'}</p>
        <p>Error: {locationsError || 'None'}</p>
        <p>Data: {JSON.stringify(locations, null, 2)}</p>
        <p>Is Array: {Array.isArray(locations) ? 'Yes' : 'No'}</p>
        <p>Length: {locations?.length || 0}</p>
      </div>

      <div>
        <h4>Categories API (admin/categories)</h4>
        <p>Loading: {categoriesLoading ? 'Yes' : 'No'}</p>
        <p>Error: {categoriesError || 'None'}</p>
        <p>Data: {JSON.stringify(categories, null, 2)}</p>
        <p>Is Array: {Array.isArray(categories) ? 'Yes' : 'No'}</p>
        <p>Length: {categories?.length || 0}</p>
      </div>
    </div>
  );
}

export default ApiTestComponent;







