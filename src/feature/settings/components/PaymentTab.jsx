import React from 'react';
import { Box, Chip, TextField, Typography } from '@mui/material';

function PaymentTab() {
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 9999,
      height: 40,
      '& fieldset': { borderColor: '#e5e7eb' },
      '&:hover fieldset': { borderColor: '#d1d5db' },
      '&.Mui-focused fieldset': { borderColor: '#f6a5a5' },
    },
    '& .MuiInputBase-input': { py: 0, px: 2, fontSize: 14 },
  };

  const chipSx = { borderRadius: 2, bgcolor: '#e5e7eb', fontSize: 12, height: 22, px: 0.5 };
  const chipInputSx = {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    flexWrap: 'wrap',
    border: '1px solid #e5e7eb',
    borderRadius: 9999,
    minHeight: 40,
    px: 1,
    py: 0.5,
    bgcolor: '#fff',
  };

  return (
    <div className="bg-white border border-[#f8c6c6] rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>GST Rate</Typography>
          <TextField fullWidth placeholder="18%" sx={inputSx} />
        </div>
        <div>
          <Typography sx={{ fontSize: 12, color: '#6b7280', mb: 1 }}>Payment Method</Typography>
          <Box sx={chipInputSx}>
            <Chip label="Bank Account" onDelete={() => {}} sx={chipSx} />
            <Chip label="UPI" onDelete={() => {}} sx={chipSx} />
          </Box>
        </div>
        <div>
          <Typography sx={{ fontSize: 12, color: '#6b7280', mb: 1 }}>Currency</Typography>
          <Box sx={chipInputSx}>
            <Chip label="INR" onDelete={() => {}} sx={chipSx} />
            <Chip label="CAD" onDelete={() => {}} sx={chipSx} />
          </Box>
        </div>
        <div>
          <Typography sx={{ fontSize: 12, color: '#6b7280', mb: 1 }}>Currency Symbol</Typography>
          <Box sx={chipInputSx}>
            <Chip label="₹" onDelete={() => {}} sx={chipSx} />
            <Chip label="$" onDelete={() => {}} sx={chipSx} />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default PaymentTab;


