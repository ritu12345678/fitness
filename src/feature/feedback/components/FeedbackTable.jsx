import React from 'react';
import CustomTable from '../../../components/CustomTable';
import { Box, Typography, CircularProgress } from '@mui/material';

function FeedbackTable({ feedbacks = [], loading = false, error = null, onViewReview }) {
  // Transform API data to table format
  const rows = feedbacks.map((feedback, index) => ({
    no: index+1,
    user: feedback?.created_by_data?.name || 'N/A',
    trainer: feedback?.trainer_data?.name || 'N/A',
    package: feedback?.package_data?.name || 'N/A',
    location: feedback?.location_data?.name || 'N/A',
    review: "View",
    reviewData: feedback?.review || feedback?.feedback || '', // Store actual review data
    status: feedback?.status || feedback.review_status || 'New',
    action: '...'
  }));

  const columns = [
    { header: '#', key: 'no' },
    { header: 'User Name', key: 'user' },
    { header: 'Trainer Name', key: 'trainer' },
    { header: 'Package', key: 'package' },
    { header: 'Location', key: 'location' },
    { 
      header: 'Review', 
      key: 'review',
      renderCell: ({ value, row }) => (
        <button
          onClick={() => onViewReview?.(row.reviewData)}
          className="px-3 py-1 rounded-xl text-sm bg-[#F6A5A5] text-white hover:bg-[#f5a0a0] transition-colors"
        >
          View
        </button>
      )
    },
    { header: 'Action', key: 'action' },
  ];

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <CircularProgress size={24} />
        <Typography sx={{ ml: 2 }}>Loading feedbacks...</Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <Typography color="error">Error loading feedbacks: {error}</Typography>
      </Box>
    );
  }

  // Empty state
  if (feedbacks.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <Typography color="text.secondary">No feedbacks found</Typography>
      </Box>
    );
  }

  return (
    <CustomTable
      title="Feedback"
      columns={columns}
      rows={rows}
      stickyHeader
      initialRowsPerPage={5}
      rowsPerPageOptions={[5, 10, 20]}
      renderCell={({ col, value, row }) => {
        // Use custom renderer if provided
        if (col.renderCell) {
          return col.renderCell({ value, row });
        }
        if (col.key === 'action') return <span className="text-gray-400">...</span>;
        return value;
      }}
      containerSx={{}}
    />
  );
}

export default FeedbackTable;


