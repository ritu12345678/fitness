import React, { useState } from 'react';
import CustomTable from '../../../components/CustomTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography, Divider, CircularProgress } from '@mui/material';

const TeamRole = ({ roles = [], loading = false, error = null, onEdit }) => {
  console.log("roles",roles)

  const handleEdit = (roleId) => {
    const role = roles.find(r => r.role_id === roleId);
    if (role) {
      onEdit?.(role);
    }
  };

  const handleDelete = (roleId) => {
    console.log('Delete role:', roleId);
    // Add delete functionality here
  };

  const columns = [
    {
      key: 'role_id',
      header: '#',
      className: 'text-left',
    },
    {
      key: 'role_name',
      header: 'Role',
      className: 'text-left',
    },
    {
      key: 'status',
      header: 'Status',
      className: 'text-left',
      render: (value, row) => (
        <span className={`px-2 py-1 rounded-xl text-xs ${
          row.status === true || row.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status === true || row.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      className: 'text-right',
      render: (value, row) => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <IconButton
            onClick={() => handleEdit(row.role_id)}
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
            onClick={() => handleEdit(row.role_id)}
          >
            Edit
          </Typography>
          <IconButton
            onClick={() => handleDelete(row.role_id)}
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
            onClick={() => handleDelete(row.role_id)}
          >
            Delete
          </Typography>
        </Box>
      ),
    },
  ];

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <CircularProgress size={24} />
        <Typography sx={{ ml: 2 }}>Loading roles...</Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <Typography color="error">Error loading roles: {error}</Typography>
      </Box>
    );
  }

  // Empty state
  if (roles.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <Typography color="text.secondary">No roles found</Typography>
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
          rows={roles}
          keyField="role_id"
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
