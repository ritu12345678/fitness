import React, { useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import CustomSelect from '../../../components/CustomSelect';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddRoleModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    roleName: '',
    editAccess: '',
    viewAccess: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSave = () => {
    // Add validation logic here
    console.log('Saving role:', formData);
    onSave?.(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      roleName: '',
      editAccess: '',
      viewAccess: ''
    });
    onClose();
  };

  return (
    <CustomModal
      open={open}
      onClose={handleCancel}
      title="Add Role"
      maxWidth="sm"
      actions={
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            sx={{
              borderColor: '#d1d5db',
              color: '#374151',
              backgroundColor: '#f9fafb',
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#f3f4f6',
                borderColor: '#9ca3af'
              }
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
              '&:hover': {
                backgroundColor: '#f4a0a0',
                borderColor: '#f4a0a0'
              }
            }}
          >
            Save
          </Button>
        </Box>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Role Name Field */}
        <Box>
          <Typography sx={{ 
            fontSize: '14px', 
            fontWeight: 500, 
            color: '#374151', 
            mb: 1 
          }}>
            Role Name
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              placeholder="Enter Role Name"
              value={formData.roleName}
              onChange={handleInputChange('roleName')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#ffffff',
                  borderColor: '#d1d5db',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '12px 40px 12px 12px',
                  fontSize: '14px',
                  color: '#374151',
                  '&::placeholder': {
                    color: '#9ca3af',
                    opacity: 1,
                  },
                },
              }}
            />
            {/* <KeyboardArrowDownIcon 
              sx={{ 
                position: 'absolute', 
                right: 12, 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#6b7280',
                fontSize: 20,
                pointerEvents: 'none'
              }} 
            /> */}
          </Box>
        </Box>

        {/* Allow Edit Access To Field */}
        <Box>
          <Typography sx={{ 
            fontSize: '14px', 
            fontWeight: 500, 
            color: '#374151', 
            mb: 1 
          }}>
            Allow Edit Access To
          </Typography>
          <CustomSelect
            fullWidth
            placeholder="Enter Phone Number"
            value={formData.editAccess}
            onChange={handleInputChange('editAccess')}
            options={[
              { label: 'Enter Phone Number', value: '' },
              { label: 'All Users', value: 'all_users' },
              { label: 'Admin Only', value: 'admin_only' },
              { label: 'Manager Only', value: 'manager_only' },
              { label: 'Custom Selection', value: 'custom' }
            ]}
            SelectProps={{
              sx: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2, // match TextField radius locally
                  backgroundColor: '#ffffff',
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#9ca3af' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                },
                '& .MuiInputBase-input': {
                  padding: '12px 40px 12px 12px',
                  fontSize: '14px',
                  color: '#374151',
                },
              },
            }}
          />
        </Box>

        {/* Allow View Access To Field */}
        <Box>
          <Typography sx={{ 
            fontSize: '14px', 
            fontWeight: 500, 
            color: '#374151', 
            mb: 1 
          }}>
            Allow View Access To
          </Typography>
          <CustomSelect
            fullWidth
            placeholder="Select Role"
            value={formData.viewAccess}
            onChange={handleInputChange('viewAccess')}
            options={[
              { label: 'Select Role', value: '' },
              { label: 'Super Admin', value: 'super_admin' },
              { label: 'Admin', value: 'admin' },
              { label: 'Manager', value: 'manager' },
              { label: 'User', value: 'user' },
              { label: 'Guest', value: 'guest' }
            ]}
            SelectProps={{
              sx: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2, // match TextField radius locally
                  backgroundColor: '#ffffff',
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#9ca3af' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                },
                '& .MuiInputBase-input': {
                  padding: '12px 40px 12px 12px',
                  fontSize: '14px',
                  color: '#374151',
                },
              },
            }}
          />
        </Box>
      </Box>
    </CustomModal>
  );
};

export default AddRoleModal;
