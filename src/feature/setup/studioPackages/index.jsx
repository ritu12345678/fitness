import React from 'react';
import StudioPackageTable from './components/StudioPackageTable';
import StudioPackageFilter from './components/StudioPackageFilter';

const StudioPackage = () => {
  return (
    <div className="space-y-4">
      <StudioPackageFilter />
      <StudioPackageTable />
    </div>
  );
};

export default StudioPackage;


