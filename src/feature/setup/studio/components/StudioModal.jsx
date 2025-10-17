import React, { useState } from 'react';
import CustomModal from '../../../../components/CustomModal';
import CustomSelect from '../../../../components/CustomSelect';
import { Box, TextField, Button, Typography } from '@mui/material';

const StudioModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({ name: '', address1: '', address2: '', city: '', state: '', from: '', to: '', amount: '', image: '', video: '' });
  const change = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Studio Set Up"
      maxWidth="md"
      actions={
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={() => onSave?.(form)} sx={{ borderRadius: 2, backgroundColor: '#f6a5a5', color: '#000' }}>Save</Button>
        </Box>
      }
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Studio Name</Typography>
          <TextField fullWidth placeholder="Enter Studio Name" value={form.name} onChange={change('name')} />
        </Box>
        <Box />
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Address Line 1</Typography>
          <TextField fullWidth placeholder="Enter Address Line 1" value={form.address1} onChange={change('address1')} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Address Line 2</Typography>
          <TextField fullWidth placeholder="Enter Address Line 2" value={form.address2} onChange={change('address2')} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>City</Typography>
          <CustomSelect value={form.city} onChange={change('city')} placeholder="Select City" options={[{ label: 'Bangalore', value: 'blr' }]} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>State</Typography>
          <CustomSelect value={form.state} onChange={change('state')} placeholder="Select State" options={[{ label: 'Karnataka', value: 'ka' }]} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>From</Typography>
          <TextField fullWidth placeholder="Opening Time" value={form.from} onChange={change('from')} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>To</Typography>
          <TextField fullWidth placeholder="Closing Time" value={form.to} onChange={change('to')} />
        </Box>
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Starting Amount</Typography>
          <TextField fullWidth placeholder="₹" value={form.amount} onChange={change('amount')} />
        </Box>
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Feature Image</Typography>
          <div className="flex gap-2">
            <TextField fullWidth placeholder="#" value={form.image} onChange={change('image')} />
            <Button variant="contained">Upload</Button>
          </div>
        </Box>
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Video</Typography>
          <div className="flex gap-2">
            <TextField fullWidth placeholder="#" value={form.video} onChange={change('video')} />
            <Button variant="contained">Upload</Button>
          </div>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default StudioModal;






