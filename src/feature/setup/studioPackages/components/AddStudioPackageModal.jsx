import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import CustomModal from '../../../../components/CustomModal';
import CustomSelect from '../../../../components/CustomSelect';
import CustomMultiSelect from '../../../../components/CustomMultiSelect';
import { Box, TextField, Typography, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import { apiService } from '../../../../services/apiClient';
import { useToast } from '../../../../hooks/useToast';
import { packageValidationSchema, packageUpdateValidationSchema } from '../../../../validationSchemas/packageValidation';
import { SubmitButton, CancelButton } from '../../../../components/ModalButtons';
const AddStudioPackageModal = ({ open, onClose, onSave, packageId, isEdit = false }) => {
  const { showSuccess, showError } = useToast();
  const [fetchingData, setFetchingData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial values
  const initialValues = {
    name: '',
    classesCategory: 'Group Classes',
    MaxTrainee: '',
    session: '',
    days: [],
    price: '',
    location: '',
    PackageDurectionDay: ''
  };

  // Validation schema
  const validationSchema = isEdit ? packageUpdateValidationSchema : packageValidationSchema;

  // Days options
  const daysOptions = [
    { label: 'Sunday', value: 'Sun' },
    { label: 'Monday', value: 'Mon' },
    { label: 'Tuesday', value: 'Tue' },
    { label: 'Wednesday', value: 'Wed' },
    { label: 'Thursday', value: 'Thu' },
    { label: 'Friday', value: 'Fri' },
    { label: 'Saturday', value: 'Sat' }
  ];

  // Location options
  const locationOptions = [
    { label: 'Chennai', value: 1 },
    { label: 'Mumbai', value: 2 },
    { label: 'Delhi', value: 3 },
    { label: 'Bangalore', value: 4 }
  ];

  // Fetch package data for edit mode
  const fetchPackageData = async (setFieldValue) => {
    if (!isEdit || !packageId) return;
    
    setFetchingData(true);
    try {
      const response = await apiService.get(`admin/packages/${packageId}`);
      const packageData = response.data || response;
      
      // Set form values
      setFieldValue('name', packageData.name || '');
      setFieldValue('classesCategory', packageData.classesCategory || 'Group Classes');
      setFieldValue('MaxTrainee', packageData.MaxTrainee || '');
      setFieldValue('session', packageData.session || '');
      setFieldValue('days', packageData.days ? (Array.isArray(packageData.days) ? packageData.days : packageData.days.split(',')) : []);
      setFieldValue('price', packageData.price || '');
      setFieldValue('location', packageData.location || '');
      setFieldValue('PackageDurectionDay', packageData.PackageDurectionDay || '');
    } catch (error) {
      showError('Failed to fetch package data. Please try again.');
      console.error('Package fetch error:', error);
    } finally {
      setFetchingData(false);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    try {
      // Prepare payload
      const payload = {
        name: values.name,
        classesCategory: values.classesCategory,
        MaxTrainee: parseInt(values.MaxTrainee) || 0,
        session: values.session,
        days: values.days, // Keep as array instead of converting to string
        price: parseInt(values.price) || 0,
        location: parseInt(values.location) || 1,
        PackageDurectionDay: parseInt(values.PackageDurectionDay) || 30
      };

      if (isEdit) {
        // Update package
        await apiService.put('admin/packages/update', {
          id: packageId,
          ...payload
        });
        showSuccess('Package updated successfully!');
      } else {
        // Add package
        await apiService.post('admin/packages', payload);
        showSuccess('Package added successfully!');
      }

      // Close modal and refresh data
      resetForm();
      onClose();
      onSave?.();
    } catch (error) {
      showError(error?.response?.data?.message || error?.message || 'Failed to save package. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Package" : "Add Studio Package"}
      maxWidth="sm"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting, resetForm }) => {
          // Fetch data when modal opens in edit mode
          React.useEffect(() => {
            if (open && isEdit && packageId) {
              fetchPackageData(setFieldValue);
            }
          }, [open, isEdit, packageId]);

          return (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(values, { setSubmitting: () => {}, resetForm });
            }}>
              {fetchingData ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                  <CircularProgress />
                  <Typography sx={{ ml: 2 }}>Loading package data...</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Package Name */}
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Package Name</Typography>
                    <TextField 
                      fullWidth 
                      placeholder="Enter package name" 
                      name="name"
                      value={values.name} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      disabled={isSubmitting}
                    />
                  </Box>

                  {/* Category */}
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                      Category<span style={{ color: '#d32f2f' }}>*</span>
                    </Typography>
                    <RadioGroup 
                      row 
                      name="classesCategory"
                      value={values.classesCategory} 
                      onChange={handleChange}
                    >
                      <FormControlLabel 
                        value="Group Classes" 
                        control={<Radio size="small" />} 
                        label="Group Classes" 
                        disabled={isSubmitting}
                      />
                      <FormControlLabel 
                        value="Private Classes" 
                        control={<Radio size="small" />} 
                        label="Private Classes" 
                        disabled={isSubmitting}
                      />
                      <FormControlLabel 
                        value="Private Dua Classes" 
                        control={<Radio size="small" />} 
                        label="Private Duo Classes" 
                        disabled={isSubmitting}
                      />
                    </RadioGroup>
                    {touched.classesCategory && errors.classesCategory && (
                      <Typography sx={{ fontSize: 12, color: '#d32f2f', mt: 0.5 }}>
                        {errors.classesCategory}
                      </Typography>
                    )}
                  </Box>

                  {/* Max Trainee */}
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Max Trainee</Typography>
                    <TextField 
                      fullWidth 
                      placeholder="Enter max trainee" 
                      name="MaxTrainee"
                      value={values.MaxTrainee} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      error={touched.MaxTrainee && Boolean(errors.MaxTrainee)}
                      helperText={touched.MaxTrainee && errors.MaxTrainee}
                      disabled={isSubmitting}
                    />
                  </Box>

                  {/* Session */}
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Session</Typography>
                    <TextField 
                      fullWidth 
                      placeholder="Enter number of sessions" 
                      name="session"
                      value={values.session} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      error={touched.session && Boolean(errors.session)}
                      helperText={touched.session && errors.session}
                      disabled={isSubmitting}
                    />
                  </Box>

                  {/* Days */}
                  <Box>
                    <CustomMultiSelect
                      label="Days"
                      required
                      value={values.days}
                      onChange={(value) => setFieldValue('days', value)}
                      options={daysOptions}
                      placeholder="Select Days"
                      disabled={isSubmitting}
                      error={touched.days && Boolean(errors.days)}
                      helperText={touched.days && errors.days}
                    />
                  </Box>

                  {/* Price */}
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Price</Typography>
                    <TextField 
                      fullWidth 
                      placeholder="Enter price" 
                      name="price"
                      value={values.price} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      error={touched.price && Boolean(errors.price)}
                      helperText={touched.price && errors.price}
                      disabled={isSubmitting}
                    />
                  </Box>

                  {/* Location */}
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Location</Typography>
                    <CustomSelect 
                      name="location"
                      value={values.location} 
                      onChange={handleChange} 
                      placeholder="Select Location" 
                      options={locationOptions}
                      disabled={isSubmitting}
                    />
                    {touched.location && errors.location && (
                      <Typography sx={{ fontSize: 12, color: '#d32f2f', mt: 0.5 }}>
                        {errors.location}
                      </Typography>
                    )}
                  </Box>

                  {/* Package Duration Days */}
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Package Duration (Days)</Typography>
                    <TextField 
                      fullWidth 
                      placeholder="Enter duration in days" 
                      name="PackageDurectionDay"
                      value={values.PackageDurectionDay} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      error={touched.PackageDurectionDay && Boolean(errors.PackageDurectionDay)}
                      helperText={touched.PackageDurectionDay && errors.PackageDurectionDay}
                      disabled={isSubmitting}
                    />
                  </Box>
                </Box>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-3 mt-6">
                <CancelButton 
                  type="button" 
                  onClick={onClose} 
                  isSubmitting={isSubmitting || fetchingData} 
                />
                <SubmitButton
                  type="submit"
                  isSubmitting={isSubmitting || fetchingData}
                  loadingText={isEdit ? "Updating..." : "Creating..."}
                >
                  {isEdit ? "Update Package" : "Create Package"}
                </SubmitButton>
              </div>
            </form>
          );
        }}
      </Formik>
    </CustomModal>
  );
};

export default AddStudioPackageModal;


