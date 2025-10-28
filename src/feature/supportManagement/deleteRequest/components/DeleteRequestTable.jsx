import React from 'react';
import CustomTable from '../../../../components/CustomTable';
import { Box, Avatar, IconButton, Typography, CircularProgress } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {formatDate} from "../../../../constantFunctions";

const DeleteRequestTable = ({ deleteRequests = [], loading = false, error = null, totalResults = 0, pagination, onPageChange, onRowsPerPageChange, page, rowsPerPage }) => {
  console.log('🗑️ DeleteRequestTable - deleteRequests:', deleteRequests);

  // Map API response to table data - handle various field names
  const rows = deleteRequests.map((request, index) => ({
    id: request.request_id || request.id || request._id || index + 1,
    profile: request.profile || request.profile_pic || request.avatar || request.image || 'https://via.placeholder.com/50',
    name: request.name || request.user_name || request.user?.name || 'N/A',
    number: request.mobile || request.phone || request.contact || 'N/A',
    email: request.email || request.email_address || 'N/A',
    requested: formatDate(request.requested_at || request.requested_date || request.created_at),
  }));

  const columns = [
    { 
      key: 'id', 
      header: '#' 
    },
    { 
      key: 'profile', 
      header: 'Profile', 
      render: (v) => (<Avatar src={v} sx={{ width: 28, height: 28 }} />) 
    },
    { 
      key: 'name', 
      header: 'Name' 
    },
    { 
      key: 'number', 
      header: 'Number' 
    },
    { 
      key: 'email', 
      header: 'Email' 
    },
    { 
      key: 'requested', 
      header: 'Requested Date' 
    },
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

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <CircularProgress size={24} />
        <Typography sx={{ ml: 2 }}>Loading delete requests...</Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <Typography color="error">Error loading delete requests: {error}</Typography>
      </Box>
    );
  }

  // Empty state
  if (deleteRequests.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <Typography color="text.secondary">No delete requests found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: 'white',
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <Box sx={{ flex: 1 }}>
        <CustomTable
          columns={columns}
          rows={rows}
          keyField="id"
          initialRowsPerPage={10}
          rowsPerPageOptions={[5, 10, 25]}
          enablePagination={true}
          // Server-side pagination props
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          count={pagination?.total_items ?? totalResults}
          containerSx={{
            '& .MuiTableHead-root': {
              backgroundColor: '#f8f9fa',
            },
            '& .MuiTableCell-head': {
              fontWeight: 600,
              color: '#6b7280',
              borderBottom: '1px solid #e5e7eb',
            },
            '& .MuiTableCell-body': {
              borderBottom: '1px solid #f3f4f6',
              color: '#374151',
            },
            '& .MuiTableRow-root:hover': {
              backgroundColor: '#f9fafb',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default DeleteRequestTable;











