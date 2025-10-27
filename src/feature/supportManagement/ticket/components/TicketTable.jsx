import React from 'react';
import CustomTable from '../../../../components/CustomTable';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {formatDate} from "../../../../constantFunctions"

const TicketTable = ({ tickets = [], loading = false, error = null, totalResults = 0 }) => {
  console.log('🎫 TicketTable - tickets:', tickets);

  // Map API response to table data - handle various field names
  const rows = tickets.map((ticket, index) => ({
    id: ticket.ticket_id || ticket.id || ticket._id || index + 1,
    ticketNo: ticket.ticketNo ,
    name: ticket.name || ticket.user_name || ticket.user?.name || 'N/A',
    number: ticket.mobile || ticket.phone || ticket.contact || 'N/A',
    status: ticket?.ticket_status || 'N/A',
    created: formatDate(ticket.created_at ),
  }));

  const columns = [
    { 
      key: 'id', 
      header: '#' 
    },
    { 
      key: 'ticketNo', 
      header: 'Ticket No' 
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
      key: 'status', 
      header: 'Status',
      render: (value, row) => (
        <span className={`px-2 py-1 rounded-xl text-xs ${
          row.status === 'Open' || row.status === 'open' || row.status === true
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status || 'N/A'}
        </span>
      ),
    },
    { 
      key: 'created', 
      header: 'Created Date' 
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
        <Typography sx={{ ml: 2 }}>Loading tickets...</Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <Typography color="error">Error loading tickets: {error}</Typography>
      </Box>
    );
  }

  // Empty state
  if (tickets.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <Typography color="text.secondary">No tickets found</Typography>
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
          enablePagination
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

export default TicketTable;














