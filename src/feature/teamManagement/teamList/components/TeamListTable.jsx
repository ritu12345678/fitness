import React, { useState } from 'react';
import CustomTable from '../../../../components/CustomTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography, Avatar } from '@mui/material';

const  TeamListTable = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      profile: 'AS',
      name: 'Abhishek Sharma',
      email: 'abhishekcharma@gmail.com',
      contract: '987457888',
      teamRole: 'Super Admin'
    },
    {
      id: 2,
      profile: 'JC',
      name: 'Jane-Cooper',
      email: 'janecooper@gmail.com',
      contract: '987457888',
      teamRole: 'Sub Admin'
    },
    {
      id: 3,
      profile: 'JW',
      name: 'Jenny Wilson',
      email: 'jennywilson@gmail.com',
      contract: '987457888',
      teamRole: 'Manage'
    }
  ]);

  const handleEdit = (memberId) => {
    console.log('Edit team member:', memberId);
    // Add edit functionality here
  };

  const handleDelete = (memberId) => {
    console.log('Delete team member:', memberId);
    // Add delete functionality here
  };

  const columns = [
    {
      key: 'id',
      header: '#',
      className: 'text-left',
    },
    {
      key: 'profile',
      header: 'Profile',
      className: 'text-left',
      render: (value, row) => (
        <Avatar
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '12px',
            fontWeight: 600
          }}
        >
          {row.profile}
        </Avatar>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      className: 'text-left',
    },
    {
      key: 'email',
      header: 'Email',
      className: 'text-left',
    },
    {
      key: 'contract',
      header: 'Contract',
      className: 'text-left',
    },
    {
      key: 'teamRole',
      header: 'Team Role',
      className: 'text-left',
    },
    {
      key: 'actions',
      header: 'Action',
      className: 'text-right',
      render: (value, row) => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <IconButton
            onClick={() => handleEdit(row.id)}
            sx={{ 
              color: '#1976d2',
              padding: '4px',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
            }}
          >
            <EditIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Typography
            component="span"
            sx={{ 
              color: '#1976d2',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </Typography>
          <IconButton
            onClick={() => handleDelete(row.id)}
            sx={{ 
              color: '#d32f2f',
              padding: '4px',
              '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.04)' }
            }}
          >
            <DeleteIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Typography
            component="span"
            sx={{ 
              color: '#d32f2f',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Typography>
        </Box>
      ),
    },
  ];

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
          rows={teamMembers}
          keyField="id"
          rowsPerPageOptions={[5, 10, 25]}
          initialRowsPerPage={5}
          enablePagination={true}
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

export default  TeamListTable;
