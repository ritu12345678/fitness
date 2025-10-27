import React, { useState } from 'react';
import CustomModal from '../../../../components/CustomModal';
import CustomSelect from '../../../../components/CustomSelect';
import { Box, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const AddProgramModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({ name: '', session: '', category: 'Group', city: '', days: '', location: '', amount: '' });
  const change = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Package Set Up"
      maxWidth="sm"
      actions={
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={() => onSave?.(form)} sx={{ borderRadius: 2, backgroundColor: '#f6a5a5', color: '#000' }}>Save</Button>
        </Box>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Package Name</Typography>
          <TextField fullWidth placeholder="Enter Package Name" value={form.name} onChange={change('name')} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Session</Typography>
          <TextField fullWidth placeholder="Enter Session Count" value={form.session} onChange={change('session')} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Category</Typography>
          <RadioGroup row value={form.category} onChange={change('category')}>
            <FormControlLabel value="Group" control={<Radio size="small" />} label="Group Classes" />
            <FormControlLabel value="Private" control={<Radio size="small" />} label="Private Classes" />
            <FormControlLabel value="Private Duo" control={<Radio size="small" />} label="Private Duo Classes" />
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>City</Typography>
          <CustomSelect value={form.city} onChange={change('city')} placeholder="Select City" options={[{ label: 'Chennai', value: 'chennai' }]} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Days</Typography>
          <CustomSelect value={form.days} onChange={change('days')} placeholder="Select Days" options={[{ label: 'Mon, Wed, Fri', value: 'mwf' }]} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>location</Typography>
          <CustomSelect value={form.location} onChange={change('location')} placeholder="Select Location" options={[{ label: 'Main', value: 'main' }]} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Starting Amount</Typography>
          <TextField fullWidth placeholder="₹" value={form.amount} onChange={change('amount')} />
        </Box>
      </Box>
    </CustomModal>
  );
};

export default AddProgramModal;














