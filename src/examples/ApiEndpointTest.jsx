import React, { useState } from 'react';
import { apiService } from '../services/apiClient';

function ApiEndpointTest() {
  const [locationsResult, setLocationsResult] = useState(null);
  const [categoriesResult, setCategoriesResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testEndpoints = async () => {
    setLoading(true);
    
    try {
      // Test locations endpoint
      console.log('Testing admin/locations...');
      const locationsResponse = await apiService.get('admin/locations');
      console.log('Locations response:', locationsResponse);
      setLocationsResult(locationsResponse);
    } catch (error) {
      console.error('Locations error:', error);
      setLocationsResult({ error: error.message, status: error.response?.status });
    }

    try {
      // Test categories endpoint
      console.log('Testing admin/categories...');
      const categoriesResponse = await apiService.get('admin/categories');
      console.log('Categories response:', categoriesResponse);
      setCategoriesResult(categoriesResponse);
    } catch (error) {
      console.error('Categories error:', error);
      setCategoriesResult({ error: error.message, status: error.response?.status });
    }
    
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>API Endpoint Test</h3>
      <button 
        onClick={testEndpoints} 
        disabled={loading}
        style={{ padding: '10px', marginBottom: '20px' }}
      >
        {loading ? 'Testing...' : 'Test API Endpoints'}
      </button>

      <div style={{ marginBottom: '20px' }}>
        <h4>Locations API (admin/locations)</h4>
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(locationsResult, null, 2)}
        </pre>
      </div>

      <div>
        <h4>Categories API (admin/categories)</h4>
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(categoriesResult, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default ApiEndpointTest;







