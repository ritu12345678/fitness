import React from 'react';
import CustomTable from '../../../../components/CustomTable';
import { Box, Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DeleteRequestTable = () => {
  const rows = Array.from({ length: 24 }).map((_, i) => ({
    id: i + 1,
    profile: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    name: ['Beginner','Intermediate','Advanced'][i % 3],
    number: '78459612365',
    email: 'abhishekharmap@gmail.com',
    requested: '21-May-2025 11:05 AM',
  }));

  const columns = [
    { key: 'id', header: '#' },
    { key: 'profile', header: 'Profile', render: (v) => (<Avatar src={v} sx={{ width: 28, height: 28 }} />) },
    { key: 'name', header: 'Name' },
    { key: 'number', header: 'Number' },
    { key: 'email', header: 'Email' },
    { key: 'requested', header: 'Requested Date' },
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

export default DeleteRequestTable;


