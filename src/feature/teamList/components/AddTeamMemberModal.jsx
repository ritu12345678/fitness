import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { TextField, Typography, Box } from '@mui/material';
import CustomModal from '../../../components/CustomModal';
import CustomSelect from '../../../components/CustomSelect';
import { SubmitButton, CancelButton } from '../../../components/ModalButtons';
import { apiService } from '../../../services/apiClient';
import { useToast } from '../../../hooks/useToast';
import { teamMemberValidationSchema, teamMemberUpdateValidationSchema } from '../../../validationSchemas/teamMemberValidation';

const AddTeamMemberModal = ({ open, onClose, onSave, member, isEdit = false }) => {
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles, setRoles] = useState([]);

  // Fetch roles for the dropdown
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiService.get('admin/roles');
        setRoles(response.data || response);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    
    if (open) {
      fetchRoles();
    }
  }, [open]);

  const initialValues = {
    name: member?.name || '',
    email: member?.email || '',
    mobile: member?.mobile || '',
    role_id: member?.role_id || '',
    password: member?.password || '',
    gender: member?.gender || 'male'
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    try {
      const payload = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        role_id: values.role_id,
        password: values.password,
        gender: values.gender
      };

      if (isEdit) {
        // Update team member - include user_id in payload
        await apiService.put('admin/team-members/update', {
          ...payload,
          user_id: member.user_id
        });
        showSuccess('Team member updated successfully!');
      } else {
        // Add team member
        await apiService.post('admin/team-members', payload);
        showSuccess('Team member added successfully!');
      }

      resetForm();
      onSave?.();
      onClose();
    } catch (error) {
      console.error('Team member save error:', error);
      showError(error.response?.data?.message || 'Failed to save team member. Please try again.');
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const validationSchema = isEdit ? teamMemberUpdateValidationSchema : teamMemberValidationSchema;

  return (
    <CustomModal open={open} onClose={onClose} title="Add Team Member">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Name Field */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1, color: '#374151' }}>
                  Name
                </Typography>
                <TextField
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Name"
                  fullWidth
                  size="small"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  disabled={isSubmitting}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ef4444',
                      },
                    },
                  }}
                />
              </Box>

              {/* Email Field */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1, color: '#374151' }}>
                  Email
                </Typography>
                <TextField
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Email Address"
                  fullWidth
                  size="small"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  disabled={isSubmitting}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ef4444',
                      },
                    },
                  }}
                />
              </Box>

              {/* Phone Number Field */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1, color: '#374151' }}>
                  Phone Number
                </Typography>
                <TextField
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Phone Number"
                  fullWidth
                  size="small"
                  error={touched.mobile && Boolean(errors.mobile)}
                  helperText={touched.mobile && errors.mobile}
                  disabled={isSubmitting}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ef4444',
                      },
                    },
                  }}
                />
              </Box>

              {/* Role Field */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1, color: '#374151' }}>
                  Role
                </Typography>
                <CustomSelect
                  name="role_id"
                  value={values.role_id}
                  onChange={handleChange}
                  placeholder="Select Role"
                  disabled={isSubmitting}
                  options={roles.map(role => ({
                    label: role.role_name,
                    value: role.role_id
                  }))}
                />
                {touched.role_id && errors.role_id && (
                  <Typography sx={{ fontSize: 12, color: '#d32f2f', mt: 0.5 }}>
                    {errors.role_id}
                  </Typography>
                )}
              </Box>

              {/* Password Field */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1, color: '#374151' }}>
                  Password
                </Typography>
                <TextField
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter 8 Digit Password"
                  fullWidth
                  size="small"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  disabled={isSubmitting}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ef4444',
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mt-6">
              <CancelButton onClick={onClose} disabled={isSubmitting} />
              <SubmitButton type="submit" disabled={isSubmitting} isSubmitting={isSubmitting}>
                {isEdit ? 'Update' : 'Save'}
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddTeamMemberModal;



