import React from 'react';
import StudioFilter from './components/StudioFilter';
import StudioGrid from './components/StudioGrid';

const Studio = () => {
  return (
    <div className="space-y-4">
      <StudioFilter />
      <StudioGrid />
    </div>
  );
};

export default Studio;





