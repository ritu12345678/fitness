import React from 'react';
import CustomTable from '../../../../components/CustomTable';
import { Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StudioPackageTable = () => {
  const rows = Array.from({ length: 24 }).map((_, i) => ({
    id: i + 1,
    packageName: 'Beginner',
    category1: i % 3 === 0 ? 'Beginner' : i % 3 === 1 ? 'Intermediate' : 'Advanced',
    category2: 'Beginner',
    session: 10,
    days: i % 2 === 0 ? 'Mon, Wed, Tur' : 'Tue, Wed, Fri',
    price: '₹3,400',
    location: 'Chennai',
  }));

  const columns = [
    { key: 'id', header: '#' },
    { key: 'packageName', header: 'Package Name' },
    { key: 'category1', header: 'Category' },
    { key: 'category2', header: 'Category' },
    { key: 'session', header: 'Session' },
    { key: 'days', header: 'Days' },
    { key: 'price', header: 'Price' },
    { key: 'location', header: 'Location' },
    {
      key: 'action',
      header: 'Action',
      render: () => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
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

export default StudioPackageTable;






