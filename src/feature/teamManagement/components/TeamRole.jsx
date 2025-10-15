import React, { useState } from 'react';
import CustomTable from '../../../components/CustomTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography, Divider } from '@mui/material';

const TeamRole = () => {
  const [roles, setRoles] = useState([
    { id: 1, role: 'Super Admin' },
    { id: 2, role: 'Admin' },
    { id: 3, role: 'Manager' },
  ]);

  const handleEdit = (roleId) => {
    console.log('Edit role:', roleId);
    // Add edit functionality here
  };

  const handleDelete = (roleId) => {
    console.log('Delete role:', roleId);
    // Add delete functionality here
  };

  const columns = [
    {
      key: 'id',
      header: '#',
      className: 'text-left',
    },
    {
      key: 'role',
      header: 'Role',
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
              color: '#6b7280',
              padding: '4px',
              '&:hover': { backgroundColor: 'rgba(107, 114, 128, 0.04)' }
            }}
          >
            <EditIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Typography
            component="span"
            sx={{ 
              color: '#6b7280',
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
          rows={roles}
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
        
        {/* Dotted line separator */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          py: 2,
          px: 3
        }}>
          <Divider 
            sx={{ 
              flex: 1,
              borderStyle: 'dotted',
              borderColor: '#3b82f6',
              '&::before, &::after': {
                borderStyle: 'dotted',
                borderColor: '#3b82f6',
              }
            }} 
          />
          <Box sx={{ 
            mx: 2,
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: '#dbeafe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3b82f6',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            ×
          </Box>
          <Divider 
            sx={{ 
              flex: 1,
              borderStyle: 'dotted',
              borderColor: '#3b82f6',
              '&::before, &::after': {
                borderStyle: 'dotted',
                borderColor: '#3b82f6',
              }
            }} 
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TeamRole;
