import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations, clearError } from '../store/slices/locationSlice';

function LocationExample() {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state) => state.location);

  // Fetch locations on component mount
  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleClearError = () => {
    dispatch(clearError());
  };

  if (loading) return <div>Loading locations...</div>;
  
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
      <h2>Locations</h2>
      <ul>
        {locations?.map((location, index) => (
          <li key={location.id || index}>
            {location.name || location.title || JSON.stringify(location)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationExample;




