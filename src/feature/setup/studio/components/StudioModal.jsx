import React from 'react';
import { Formik, Form, Field } from 'formik';
import CustomModal from '../../../../components/CustomModal';
import CustomSelect from '../../../../components/CustomSelect';
import { Box, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { apiService } from '../../../../services/apiClient';
import { useToast } from '../../../../hooks/useToast';
import { studioValidationSchema, studioUpdateValidationSchema } from '../../../../validationSchemas/studioValidation';
import { SubmitButton, CancelButton } from '../../../../components/ModalButtons';

const StudioModal = ({ open, onClose, onSave, studio, isEdit = false }) => {
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  console.log(studio)
  // Initial values
  const initialValues = {
    name: studio?.name || '',
    address1: studio?.address_1 || '',
    address2: studio?.address_2 || '',
    city: studio?.city || '',
    state: studio?.state || '',
    from: studio?.from || '',
    to: studio?.to || '',
    amount: studio?.starting_amount || '',
    image: null,
    video: null,
  };

  // Validation schema
  const validationSchema = isEdit ? studioUpdateValidationSchema : studioValidationSchema;

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    try {
      // Prepare payload
      const payload = {
        name: values.name,
        address_1: values.address1,
        address_2: values.address2,
        city: values.city,
        state: values.state,
        from: values.from,
        to: values.to,
        starting_amount: parseFloat(values.amount) || 0,
        image: values.image?.name || 'default.jpg',
        video: values.video?.name || 'default.mp4',
      };

      if (isEdit) {
        const response = await apiService.put('admin/studios/update', {
          id: studio?.studio_id,
          ...payload
        });
        showSuccess('Studio updated successfully!');
      } else {
        // Add studio
        const response = await apiService.post('admin/studios', payload);
        showSuccess('Studio added successfully!');
      }

      // Close modal and refresh data
      resetForm();
      onClose();
      onSave?.();
    } catch (error) {
      showError(error?.response?.data?.message || error?.message || 'Failed to save studio. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Studio" : "Add Studio"}
      maxWidth="md"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {/* Studio Name */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  Studio Name *
                </Typography>
                <Field
                  as={TextField}
                  name="name"
                  fullWidth
                  placeholder="Enter Studio Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Box>
              <Box />

              {/* Address Line 1 */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  Address Line 1 *
                </Typography>
                <Field
                  as={TextField}
                  name="address1"
                  fullWidth
                  placeholder="Enter Address Line 1"
                  value={values.address1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address1 && Boolean(errors.address1)}
                  helperText={touched.address1 && errors.address1}
                />
              </Box>

              {/* Address Line 2 */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  Address Line 2
                </Typography>
                <Field
                  as={TextField}
                  name="address2"
                  fullWidth
                  placeholder="Enter Address Line 2"
                  value={values.address2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address2 && Boolean(errors.address2)}
                  helperText={touched.address2 && errors.address2}
                />
              </Box>

              {/* City */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  City *
                </Typography>
                <CustomSelect
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  placeholder="Select City"
                  options={[
                    { label: 'Bangalore', value: 'Bangalore' },
                    { label: 'Mumbai', value: 'Mumbai' },
                    { label: 'Delhi', value: 'Delhi' },
                    { label: 'Chennai', value: 'Chennai' },
                    { label: 'Kolkata', value: 'Kolkata' },
                    { label: 'Hyderabad', value: 'Hyderabad' },
                    { label: 'Pune', value: 'Pune' },
                    { label: 'Ahmedabad', value: 'Ahmedabad' },
                  ]}
                />
                {touched.city && errors.city && (
                  <Typography sx={{ color: 'error.main', fontSize: 12, mt: 0.5 }}>
                    {errors.city}
                  </Typography>
                )}
              </Box>

              {/* State */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  State *
                </Typography>
                <CustomSelect
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  placeholder="Select State"
                  options={[
                    { label: 'Karnataka', value: 'Karnataka' },
                    { label: 'Maharashtra', value: 'Maharashtra' },
                    { label: 'Delhi', value: 'Delhi' },
                    { label: 'Tamil Nadu', value: 'Tamil Nadu' },
                    { label: 'West Bengal', value: 'West Bengal' },
                    { label: 'Telangana', value: 'Telangana' },
                    { label: 'Gujarat', value: 'Gujarat' },
                    { label: 'Rajasthan', value: 'Rajasthan' },
                  ]}
                />
                {touched.state && errors.state && (
                  <Typography sx={{ color: 'error.main', fontSize: 12, mt: 0.5 }}>
                    {errors.state}
                  </Typography>
                )}
              </Box>

              {/* From Time */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  Opening Time *
                </Typography>
                <Field
                  as={TextField}
                  name="from"
                  type="time"
                  fullWidth
                  value={values.from}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.from && Boolean(errors.from)}
                  helperText={touched.from && errors.from}
                />
              </Box>

              {/* To Time */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  Closing Time *
                </Typography>
                <Field
                  as={TextField}
                  name="to"
                  type="time"
                  fullWidth
                  value={values.to}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.to && Boolean(errors.to)}
                  helperText={touched.to && errors.to}
                />
              </Box>

              {/* Starting Amount */}
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  Starting Amount *
                </Typography>
                <Field
                  as={TextField}
                  name="amount"
                  type="number"
                  fullWidth
                  placeholder="₹"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                />
              </Box>

              {/* Feature Image Upload - Full Row */}
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  Feature Image *
                </Typography>
                <div className="flex items-center gap-3">
                  <TextField
                    fullWidth
                    value={values.image?.name || ''}
                    placeholder="No file selected"
                    InputProps={{ readOnly: true }}
                    error={touched.image && Boolean(errors.image)}
                    helperText={touched.image && errors.image}
                  />
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white cursor-pointer">
                    <CloudUploadIcon sx={{ fontSize: 18 }} />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setFieldValue('image', file);
                      }}
                    />
                  </label>
                </div>
              </Box>

              {/* Video Upload - Full Row */}
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>
                  Video
                </Typography>
                <div className="flex items-center gap-3">
                  <TextField
                    fullWidth
                    value={values.video?.name || ''}
                    placeholder="No file selected"
                    InputProps={{ readOnly: true }}
                    error={touched.video && Boolean(errors.video)}
                    helperText={touched.video && errors.video}
                  />
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white cursor-pointer">
                    <CloudUploadIcon sx={{ fontSize: 18 }} />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setFieldValue('video', file);
                      }}
                    />
                  </label>
                </div>
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
                {isEdit ? "Update Studio" : "Add Studio"}
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default StudioModal;













