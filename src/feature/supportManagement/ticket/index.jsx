import React from 'react';
import TicketFilter from './components/TicketFilter';
import TicketTable from './components/TicketTable';

const Ticket = () => {
  return (
    <div className="space-y-4">
      <TicketFilter />
      <TicketTable />
    </div>
  );
};

export default Ticket;





