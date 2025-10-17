import React from 'react';
import CustomTable from '../../../../components/CustomTable';
import { Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TicketTable = () => {
  const rows = Array.from({ length: 24 }).map((_, i) => ({
    id: i + 1,
    ticketNo: '#23' + (20 + (i % 10)),
    name: ['Cody Fisher','Eleanor Pena','Jane Cooper','Kathryn Murphy','Kristin Watson','Annette Black','Robert Fox','Ralph Edwards','Darlene Robertson'][i % 9],
    number: '78459612365',
    status: i % 3 === 0 ? 'Open' : 'Close',
    created: '21-May-2025 11:05 AM',
  }));

  const columns = [
    { key: 'id', header: '#' },
    { key: 'ticketNo', header: 'Ticket No' },
    { key: 'name', header: 'Name' },
    { key: 'number', header: 'Number' },
    { key: 'status', header: 'Status' },
    { key: 'created', header: 'Created Date' },
    {
      key: 'action',
      header: 'Action',
      render: () => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
        </Box>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      rows={rows}
      keyField="id"
      initialRowsPerPage={10}
      rowsPerPageOptions={[5, 10, 25]}
      enablePagination
    />
  );
};

export default TicketTable;







