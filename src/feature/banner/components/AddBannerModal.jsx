import React from 'react';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomModal from '../../../components/CustomModal';
import { SubmitButton, CancelButton } from '../../../components/ModalButtons';
import { apiService } from '../../../services/apiClient';
import { useToast } from '../../../hooks/useToast';
import { bannerValidationSchema, bannerEditValidationSchema } from '../../../validationSchemas';

function AddBannerModal({ open, onClose, onSave, banner = null, isEdit = false }) {
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const initialValues = {
    content: banner?.content || '',
    from: banner?.from ? banner.from.split('T')[0] : '', // Convert ISO date to YYYY-MM-DD format
    to: banner?.to ? banner.to.split('T')[0] : '', // Convert ISO date to YYYY-MM-DD format
    image: null, // Don't pre-fill image for security
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);

    try {
      let requestData;

      if (isEdit) {
        // Edit mode - PUT request with banner_id in payload
        // Try to find a numeric ID field


        requestData = {
          banner_id: Number(banner?.banner_id),
          // numericId || banner._id, // Use numeric ID if found, fallback to _id
          title: banner.title || `Banner ${banner._id || banner.id}`,
          content: values.content,
          from: values.from,
          to: values.to
        };

        // Add image if provided (only if it's a valid file)
        if (values.image && values.image instanceof File) {
          requestData.image = values.image;
        }



        const response = await apiService.put('admin/bannermanagements', requestData);
        showSuccess('Banner updated successfully!');
        resetForm();
        onClose();
        onSave?.(response);
      } else {
        // Create mode - POST request
        requestData = {
          title: `Banner ${new Date().getTime()}`,
          content: values.content,
          from: values.from,
          to: values.to
        };

        // Add image only if it's a valid file
        if (values.image && values.image instanceof File) {
          requestData.image = values.image;
        }

        console.log('Create Banner Request Data:', requestData);

        const response = await apiService.post('admin/bannermanagements', requestData);
        showSuccess('Banner created successfully!');
        resetForm();
        onClose();
        onSave?.(response);
      }
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} banner:`, error);
      showError(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} banner. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal open={open} onClose={onClose} title={isEdit ? "Edit Banner" : "Add Banner"} maxWidth="sm" actionsAlign="center">
      <Formik
        initialValues={initialValues}
        validationSchema={isEdit ? bannerEditValidationSchema : bannerValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} // Important for edit mode to re-initialize form with new banner data
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* From Date */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">From *</label>
                <TextField
                  fullWidth
                  type="date"
                  name="from"
                  value={values.from}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.from && Boolean(errors.from)}
                  helperText={touched.from && errors.from}
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">To *</label>
                <TextField
                  fullWidth
                  type="date"
                  name="to"
                  value={values.to}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.to && Boolean(errors.to)}
                  helperText={touched.to && errors.to}
                />
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Content *</label>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter banner content"
                  error={touched.content && Boolean(errors.content)}
                  helperText={touched.content && errors.content}
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Feature Image {isEdit ? '' : '*'}</label>
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
                    <span>Select</span>
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
                loadingText={isEdit ? "Updating..." : "Creating..."}
              >
                {isEdit ? "Update" : "Save"}
              </SubmitButton>
            </div>
          </form>
        )}
      </Formik>
    </CustomModal>
  );
}

export default AddBannerModal;










