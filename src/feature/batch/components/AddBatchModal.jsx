import React from 'react';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomModal from '../../../components/CustomModal';
import CustomSelect from '../../../components/CustomSelect';
import { SubmitButton, CancelButton } from '../../../components/ModalButtons';
import { apiService } from '../../../services/apiClient';
import { useToast } from '../../../hooks/useToast';
import { batchValidationSchema } from '../../../validationSchemas';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudios } from '../../../store/slices/studioSlice';

function AddBatchModal({ open, onClose, onSave, batch = null }) {
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const dispatch = useDispatch();
  
  // Get studios from Redux store
  const { studios, loading: studiosLoading } = useSelector(state => state.studio);
  
  const isEdit = Boolean(batch);

  // Fetch studios when modal opens
  React.useEffect(() => {
    if (open && studios.length === 0) {
      dispatch(fetchStudios());
    }
  }, [open, dispatch, studios.length]);

  const initialValues = {
    title: batch?.title || '',
    studio_id: batch?.studio_id || '',
    address_1: batch?.address_1 || '',
    address_2: batch?.address_2 || '',
    city: batch?.city || '',
    state: batch?.state || '',
    from: batch?.from || '', // Time format: HH:MM
    to: batch?.to || '', // Time format: HH:MM
    starting_amount: batch?.starting_amount || '',
    feature_image: null,
    video: null,
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);

    try {
      // Get current date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Combine current date with time values
      const fromDateTime = values.from ? `${today}T${values.from}:00.000Z` : '';
      const toDateTime = values.to ? `${today}T${values.to}:00.000Z` : '';

      const requestData = {
        title: values.title,
        studio_id: parseInt(values.studio_id),
        address_1: values.address_1,
        address_2: values.address_2,
        city: values.city,
        state: values.state,
        from: fromDateTime,
        to: toDateTime,
        starting_amount: parseInt(values.starting_amount),
        feature_image: values.feature_image?.name || 'default.jpg',
        video: values.video?.name || 'default.mp4'
      };

      console.log(`${isEdit ? 'Update' : 'Create'} Batch Request Data:`, requestData);

      let response;
      if (isEdit) {
        response = await apiService.put('admin/batches', requestData);
        showSuccess('Batch updated successfully!');
      } else {
        response = await apiService.post('admin/batches', requestData);
        showSuccess('Batch created successfully!');
      }
      
      resetForm();
      onClose();
      onSave?.(response);
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} batch:`, error);
      showError(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} batch. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal open={open} onClose={onClose} title={isEdit ? "Edit Batch" : "Add Batch"} maxWidth="sm" actionsAlign="center">
      <Formik
        initialValues={initialValues}
        validationSchema={batchValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              {/* Batch Title - Full Row */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Batch Title</label>
                <TextField
                  fullWidth
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Batch Title"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              </div>

              {/* Studio - Full Row */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Studio*</label>
                <CustomSelect
                  name="studio_id"
                  value={values.studio_id}
                  onChange={handleChange}
                  placeholder={studiosLoading ? "Loading studios..." : "Select Studio"}
                  options={[
                    { label: 'Select Studio', value: '' },
                    ...studios.map(studio => ({
                      label: studio.name || studio.studio_name || `Studio ${studio.id}`,
                      value: studio.id || studio.studio_id
                    }))
                  ]}
                />
                {touched.studio_id && errors.studio_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.studio_id}</p>
                )}
              </div>

              {/* Address Line 1 - Full Row */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Address Line 1</label>
                <TextField
                  fullWidth
                  name="address_1"
                  value={values.address_1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Address Line 1"
                  error={touched.address_1 && Boolean(errors.address_1)}
                  helperText={touched.address_1 && errors.address_1}
                />
              </div>

              {/* Address Line 2 - Full Row */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Address Line 2</label>
                <TextField
                  fullWidth
                  name="address_2"
                  value={values.address_2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Address Line 2"
                  error={touched.address_2 && Boolean(errors.address_2)}
                  helperText={touched.address_2 && errors.address_2}
                />
              </div>

              {/* City and State - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">City*</label>
                  <CustomSelect
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    placeholder="Select City"
                    options={[
                      { label: 'Select City', value: '' },
                      { label: 'Mumbai', value: 'mumbai' },
                      { label: 'Delhi', value: 'delhi' },
                      { label: 'Bangalore', value: 'bangalore' },
                      { label: 'Chennai', value: 'chennai' },
                      { label: 'Kolkata', value: 'kolkata' },
                    ]}
                  />
                  {touched.city && errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">State*</label>
                  <CustomSelect
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    placeholder="Select State"
                    options={[
                      { label: 'Select State', value: '' },
                      { label: 'Maharashtra', value: 'maharashtra' },
                      { label: 'Delhi', value: 'delhi' },
                      { label: 'Karnataka', value: 'karnataka' },
                      { label: 'Tamil Nadu', value: 'tamil_nadu' },
                      { label: 'West Bengal', value: 'west_bengal' },
                    ]}
                  />
                  {touched.state && errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              {/* From and To Time - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">From*</label>
                  <TextField
                    fullWidth
                    type="time"
                    name="from"
                    value={values.from}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Opening Time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.from && Boolean(errors.from)}
                    helperText={touched.from && errors.from}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">To*</label>
                  <TextField
                    fullWidth
                    type="time"
                    name="to"
                    value={values.to}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Closing Time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.to && Boolean(errors.to)}
                    helperText={touched.to && errors.to}
                  />
                </div>
              </div>

              {/* Starting Amount - Full Row */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Starting Amount</label>
                <TextField
                  fullWidth
                  type="number"
                  name="starting_amount"
                  value={values.starting_amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter amount"
                  InputProps={{
                    startAdornment: <span className="text-gray-500 mr-2">₹</span>,
                    inputProps: {
                      style: { 
                        MozAppearance: 'textfield',
                        WebkitAppearance: 'none',
                        appearance: 'none'
                      }
                    }
                  }}
                  error={touched.starting_amount && Boolean(errors.starting_amount)}
                  helperText={touched.starting_amount && errors.starting_amount}
                />
              </div>

              {/* Feature Image Upload - Full Row */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Feature Image*</label>
                <div className="flex items-center gap-3">
                  <TextField
                    fullWidth
                    value={values.feature_image?.name || ''}
                    placeholder="No file selected"
                    InputProps={{ readOnly: true }}
                    error={touched.feature_image && Boolean(errors.feature_image)}
                    helperText={touched.feature_image && errors.feature_image}
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
                        setFieldValue('feature_image', file);
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Video Upload - Full Row */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Video</label>
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
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 mt-6">
              <CancelButton
                type="button"
                onClick={onClose}
                isSubmitting={isSubmitting}
              />
              <SubmitButton
                type="submit"
                isSubmitting={isSubmitting}
                loadingText="Creating..."
              >
                Save
              </SubmitButton>
            </div>
          </form>
        )}
      </Formik>
    </CustomModal>
  );
}

export default AddBatchModal;


