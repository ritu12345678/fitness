import React from 'react';

import BatchFilter from './components/BatchFilter';
import BatchTable from './components/BatchTable';

function Batch() {
  return (
    <div className="space-y-4">
  
      <BatchFilter />
      <BatchTable />
    </div>
  );
}

export default Batch;

