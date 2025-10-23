import React from 'react';
import DeleteRequestFilter from './components/DeleteRequestFilter';
import DeleteRequestTable from './components/DeleteRequestTable';

const DeleteRequest = () => {
  return (
    <div className="space-y-4">
      <DeleteRequestFilter />
      <DeleteRequestTable />
    </div>
  );
};

export default DeleteRequest;









