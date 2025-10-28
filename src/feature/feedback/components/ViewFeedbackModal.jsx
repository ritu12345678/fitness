import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ViewFeedbackModal = ({ open, onClose, feedback }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 182, 193, 0.7)', // Light pink background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          width: '90%',
          maxWidth: 600,
          position: 'relative',
          p: 3,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with title and close button */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography 
            sx={{ 
              fontSize: '20px', 
              fontWeight: 700, 
              color: '#1f2937',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            Review
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              backgroundColor: '#ef4444',
              color: 'white',
              width: 32,
              height: 32,
              padding: 0,
              '&:hover': {
                backgroundColor: '#dc2626',
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Content area */}
        <Box
          sx={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 2,
            p: 3,
            minHeight: 150,
            maxHeight: 400,
            overflowY: 'auto',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              lineHeight: '24px',
              color: '#374151',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {feedback?.review || feedback?.feedback || 'No review available'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewFeedbackModal;


