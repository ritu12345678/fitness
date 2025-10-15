import React, { useState } from 'react';
import CustomModal from '../../../../components/CustomModal';
import CustomSelect from '../../../../components/CustomSelect';
import { Box, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const AddStudioPackageModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({ branch: '', category: 'Group', packageName: '', maxTrainee: '' });
  const handle = (k) => (e) => setFormData((p) => ({ ...p, [k]: e.target.value }));

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Add Studio Packages"
      maxWidth="sm"
      actions={
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={() => { onSave?.(formData); }} sx={{ borderRadius: 2, backgroundColor: '#f6a5a5', color: '#000' }}>Save</Button>
        </Box>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Branch Name</Typography>
          <CustomSelect value={formData.branch} onChange={handle('branch')} placeholder="Select Branch Name" options={[{ label: 'Branch A', value: 'a' }]} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Category</Typography>
          <RadioGroup row value={formData.category} onChange={handle('category')}>
            <FormControlLabel value="Group" control={<Radio size="small" />} label="Group Classes" />
            <FormControlLabel value="Private" control={<Radio size="small" />} label="Private Classes" />
            <FormControlLabel value="Private Duo" control={<Radio size="small" />} label="Private Duo Classes" />
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Package Name</Typography>
          <CustomSelect value={formData.packageName} onChange={handle('packageName')} placeholder="Select Package Name" options={[{ label: 'Beginner', value: 'beginner' }]} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Max Trainee</Typography>
          <TextField fullWidth placeholder="Enter Max Trainee" value={formData.maxTrainee} onChange={handle('maxTrainee')} />
        </Box>
      </Box>
    </CustomModal>
  );
};

export default AddStudioPackageModal;


