import React from 'react';
import StudioCard from './StudioCard';

const StudioGrid = ({ studios = [], loading = false, error = null, onEdit }) => {
  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading studios...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Show no data state
  if (!studios || studios.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500 text-lg">No studios found</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {studios.map((studio) => (
        <StudioCard 
          key={studio.studio_id || studio.id} 
          studio={studio} 
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default StudioGrid;


