import React from 'react';

import TrainerFilter from './components/TrainerFilter';
import TrainerTable from './components/TrainerTable';

function Trainer() {
  return (
    <div className="space-y-4">
      
      <TrainerFilter />
      <TrainerTable />
    </div>
  );
}

export default Trainer;

