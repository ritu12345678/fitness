import React from 'react';
import CustomTable from '../../../components/CustomTable';
import { Box, Typography, CircularProgress } from '@mui/material';

const columns = [
  { header: 'Student Name', key: 'student' },
  { header: 'Trainer Name', key: 'trainer' },
  { header: 'Package', key: 'package' },
  { header: 'Location', key: 'location' },
  { header: 'Review', key: 'status' },
  { header: 'Action', key: 'action' },
];

function Pill({ text }) {
  const tone = text === 'New' ? 'red' : 'gray';
  const cls = tone === 'red' ? 'bg-[#F6A5A5] text-black' : 'bg-gray-200 text-gray-800';
  return <span className={`px-2 py-1 rounded-xl text-xs ${cls}`}>{text}</span>;
}

function FeedbackTable({ feedbacks = [], loading = false, error = null }) {
  // Transform API data to table format
  const rows = feedbacks.map((feedback, index) => ({
    id: feedback.id || feedback._id || index,
    student: feedback.student_name || feedback.studentName || feedback.student || 'N/A',
    trainer: feedback.trainer_name || feedback.trainerName || feedback.trainer || 'N/A',
    package: feedback.package_name || feedback.packageName || feedback.package || 'N/A',
    location: feedback.location_name || feedback.locationName || feedback.location || 'N/A',
    status: feedback.status || feedback.review_status || 'New',
    action: '...'
  }));

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
      renderCell={({ col, value }) => {
        if (col.key === 'status') return <Pill text={value} />;
        if (col.key === 'action') return <span className="text-gray-400">...</span>;
        return value;
      }}
      containerSx={{}}
    />
  );
}

export default FeedbackTable;


