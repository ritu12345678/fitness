import React, { useState } from 'react';
import { Formik } from 'formik';
import CustomModal from '../../../components/CustomModal';
import CustomSelect from '../../../components/CustomSelect';
import { Box, TextField, Typography } from '@mui/material';
import { apiService } from '../../../services/apiClient';
import { useToast } from '../../../hooks/useToast';
import { roleValidationSchema, roleUpdateValidationSchema } from '../../../validationSchemas/roleValidation';
import { SubmitButton, CancelButton } from '../../../components/ModalButtons';

const AddRoleModal = ({ open, onClose, onSave, role = null, isEdit = false }) => {
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial values
  const initialValues = {
    role_name: role?.role_name || '',
    Edit: role?.Edit ,
    View: role?.View 
  };

  // Validation schema
  const validationSchema = isEdit ? roleUpdateValidationSchema : roleValidationSchema;

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    try {
      // Prepare payload
      const payload = {
        role_name: values.role_name,
        Edit: values.Edit,
        View: values.View
      };

      if (isEdit) {
        // Update role - include role_id in payload
        await apiService.put('admin/roles', {
          ...payload,
          role_id: role.role_id
        });
        showSuccess('Role updated successfully!');
      } else {
        // Add role
        await apiService.post('admin/roles', payload);
        showSuccess('Role added successfully!');
      }

      // Close modal and refresh data
      resetForm();
      onClose();
      onSave?.();
    } catch (error) {
      showError(error?.response?.data?.message || error?.message || 'Failed to save role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Role" : "Add Role"}
      maxWidth="sm"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(values, { resetForm: () => {} });
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Role Name */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  Role Name<span style={{ color: '#d32f2f' }}>*</span>
                </Typography>
                <TextField 
                  fullWidth 
                  placeholder="Enter Role Name" 
                  name="role_name"
                  value={values.role_name} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.role_name && Boolean(errors.role_name)}
                  helperText={touched.role_name && errors.role_name}
                  disabled={isSubmitting}
                />
              </Box>

              {/* Edit Access */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  Allow Edit Access<span style={{ color: '#d32f2f' }}>*</span>
                </Typography>
                <CustomSelect
                  name="Edit"
                  value={values.Edit} 
                  onChange={handleChange} 
                  placeholder="Select Edit Access" 
                  options={[
                    { label: 'True', value: true },
                    { label: 'False', value: false }
                  ]}
                  disabled={isSubmitting}
                />
                {touched.Edit && errors.Edit && (
                  <Typography sx={{ fontSize: 12, color: '#d32f2f', mt: 0.5 }}>
                    {errors.Edit}
                  </Typography>
                )}
              </Box>

              {/* View Access */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  Allow View Access<span style={{ color: '#d32f2f' }}>*</span>
                </Typography>
                <CustomSelect
                  name="View"
                  value={values.View} 
                  onChange={handleChange} 
                  placeholder="Select View Access" 
                  options={[
                    { label: 'True', value: true },
                    { label: 'False', value: false }
                  ]}
                  disabled={isSubmitting}
                />
                {touched.View && errors.View && (
                  <Typography sx={{ fontSize: 12, color: '#d32f2f', mt: 0.5 }}>
                    {errors.View}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mt-6">
              <CancelButton 
                type="button" 
                onClick={onClose} 
                isSubmitting={isSubmitting} 
              />
              <SubmitButton
                type="submit"
                isSubmitting={isSubmitting}
                loadingText={isEdit ? "Updating..." : "Creating..."}
              >
                {isEdit ? "Update Role" : "Create Role"}
              </SubmitButton>
            </div>
          </form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddRoleModal;
