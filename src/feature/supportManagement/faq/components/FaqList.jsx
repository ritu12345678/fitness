import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const FaqList = () => {
  const faqs = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur e...',
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <Typography sx={{ fontSize: '14px', color: '#374151', flex: 1 }}>
              {faq.text}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
                <AddIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Add</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
                <VisibilityIcon sx={{ fontSize: 16, color: '#11968A' }} />
                <Typography sx={{ fontSize: '12px', color: '#11968A' }}>View</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
                <EditIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>Edit</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
                <DeleteIcon sx={{ fontSize: 16, color: '#C82D30' }} />
                <Typography sx={{ fontSize: '12px', color: '#C82D30' }}>Delete</Typography>
              </Box>
            </Box>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-center py-3 bg-gray-50 border-t border-gray-200">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" sx={{ color: '#6b7280' }}>
            <Typography sx={{ fontSize: '16px' }}>≪</Typography>
          </IconButton>
          <IconButton size="small" sx={{ color: '#6b7280' }}>
            <Typography sx={{ fontSize: '16px' }}>‹</Typography>
          </IconButton>
          
          {[1, 2, 3, 4, 5].map((pageNum) => (
            <Box
              key={pageNum}
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: pageNum === 1 ? '#fecaca' : 'transparent',
                color: pageNum === 1 ? '#dc2626' : '#6b7280',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: pageNum === 1 ? 600 : 400,
                '&:hover': {
                  backgroundColor: pageNum === 1 ? '#fecaca' : '#f3f4f6',
                }
              }}
            >
              {pageNum}
            </Box>
          ))}
          
          <IconButton size="small" sx={{ color: '#6b7280' }}>
            <Typography sx={{ fontSize: '16px' }}>›</Typography>
          </IconButton>
          <IconButton size="small" sx={{ color: '#6b7280' }}>
            <Typography sx={{ fontSize: '16px' }}>≫</Typography>
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <Box sx={{
              backgroundColor: '#fecaca',
              borderRadius: 1,
              px: 1,
              py: 0.5,
              minWidth: 24,
              textAlign: 'center',
              fontSize: '12px',
              color: '#dc2626',
              fontWeight: 500
            }}>
              5
            </Box>
            <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>
              of 124 results
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default FaqList;
