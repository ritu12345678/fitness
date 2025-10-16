import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

function SocialLinkTab() {
  const fields = [
    'Contact Number', 'Email ID', 'Apple Link', 'Website Link', 'YouTube Link', 'Facebook', 'LinkedIn Link', 'Instagram Link'
  ];
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

  return (
    <div className="bg-white border border-[#f8c6c6] rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3">
        {fields.map((label) => (
          <div key={label}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>{label}</Typography>
            <TextField fullWidth placeholder="#" sx={inputSx} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialLinkTab;


