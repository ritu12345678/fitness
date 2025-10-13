import React from 'react';
import UserFilters from './components/UserFilters';
import UserTable from './components/UserTable';

function User() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">User</h1>
      <UserFilters />
      <UserTable />
    </div>
  );
}

export default User;

