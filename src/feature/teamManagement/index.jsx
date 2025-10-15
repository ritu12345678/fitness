import React from 'react';
import TeamRole from './components/TeamRole';
import TeamFilters from './components/TeamFilterSection';

const TeamManagement = () => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <TeamFilters />
      </div>
      
      <div className="mb-6">
        <TeamRole />
      </div>
      
      
    </div>
  );
};

export default TeamManagement;
