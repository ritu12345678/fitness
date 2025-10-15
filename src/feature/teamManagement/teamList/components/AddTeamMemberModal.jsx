import React, { useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import CustomSelect from '../../../components/CustomSelect';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddTeamMemberModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
  });

  const handleChange = (field) => (e) => setFormData((p) => ({ ...p, [field]: e.target.value }));

  const handleCancel = () => {
    setFormData({ name: '', email: '', phone: '', role: '', password: '' });
    onClose?.();
  };

  const handleSave = () => {
    onSave?.(formData);
    onClose?.();
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: '#ffffff',
      '& fieldset': { borderColor: '#e5e7eb' },
      '&:hover fieldset': { borderColor: '#9ca3af' },
      '&.Mui-focused fieldset': { borderColor: '#fca5a5' },
    },
    '& .MuiInputBase-input': {
      padding: '12px 40px 12px 12px',
      fontSize: '14px',
      color: '#374151',
      '&::placeholder': { color: '#9ca3af', opacity: 1 },
    },
  };

  const selectSx = {
    sx: {
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        backgroundColor: '#ffffff',
        '& fieldset': { borderColor: '#e5e7eb' },
        '&:hover fieldset': { borderColor: '#9ca3af' },
        '&.Mui-focused fieldset': { borderColor: '#fca5a5' },
      },
      '& .MuiInputBase-input': {
        padding: '12px 40px 12px 12px',
        fontSize: '14px',
        color: '#374151',
      },
    },
  };

  return (
    <CustomModal
      open={open}
      onClose={handleCancel}
      title="Add Team Member"
      maxWidth="sm"
      paperSx={{ borderColor: '#fecaca' }}
      actions={
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            sx={{
              borderColor: '#d1d5db',
              color: '#374151',
              backgroundColor: '#f3f4f6',
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: '#f6a5a5',
              color: '#000000',
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 500,
              border: '1px solid #f6a5a5',
            }}
          >
            Save
          </Button>
        </Box>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#374151', mb: 1 }}>Name</Typography>
          <TextField fullWidth placeholder="Enter Name" value={formData.name} onChange={handleChange('name')} sx={inputSx} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#374151', mb: 1 }}>Email</Typography>
          <TextField fullWidth placeholder="Enter Email Address" value={formData.email} onChange={handleChange('email')} sx={inputSx} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#374151', mb: 1 }}>Phone Number</Typography>
          <TextField fullWidth placeholder="Enter Phone Number" value={formData.phone} onChange={handleChange('phone')} sx={inputSx} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#374151', mb: 1 }}>Role</Typography>
          <CustomSelect
            fullWidth
            placeholder="Select Role"
            value={formData.role}
            onChange={handleChange('role')}
            options={[
              { label: 'Select Role', value: '' },
              { label: 'Super Admin', value: 'super_admin' },
              { label: 'Admin', value: 'admin' },
              { label: 'Manager', value: 'manager' },
              { label: 'Member', value: 'member' },
            ]}
            SelectProps={selectSx}
          />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#374151', mb: 1 }}>Password</Typography>
          <TextField fullWidth placeholder="Enter 8 Digit Password" value={formData.password} onChange={handleChange('password')} sx={inputSx} />
        </Box>
      </Box>
    </CustomModal>
  );
};

export default AddTeamMemberModal;
