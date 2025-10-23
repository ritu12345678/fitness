import React from 'react';
import TextField from '@mui/material/TextField';
import CustomModal from '../../../components/CustomModal';
import { Formik } from 'formik';
import { SubmitButton, CancelButton } from '../../../components/ModalButtons';
import { apiService } from '../../../services/apiClient';
import { pageCreateValidationSchema } from '../../../validationSchemas';
import { useToast } from '../../../hooks/useToast';

function PageModal({ open, onClose, onSave, page = null }) {
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const isEdit = Boolean(page);
  const initialValues = { 
    title: page?.title || '', 
    content: page?.content || '' 
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      if (isEdit) {
        // Edit existing page
        const payload = { 
          page_id: page.id || page.page_id,
          title: values.title, 
          content: values.content 
        };
        console.log('🔄 Updating page:', payload);
        const response = await apiService.put('admin/pagemanagements', payload);
        showSuccess('Page updated successfully!');
      } else {
        // Create new page
        const payload = { title: values.title, content: values.content };
        console.log('🔄 Creating page:', payload);
        const response = await apiService.post('admin/pagemanagements', payload);
        showSuccess('Page created successfully!');
      }
      
      resetForm();
      onClose();
      onSave?.();
    } catch (error) {
      console.error(`${isEdit ? 'Update' : 'Create'} page failed:`, error);
      showError(`Failed to ${isEdit ? 'update' : 'create'} page. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal 
      open={open} 
      onClose={onClose} 
      title={isEdit ? "Edit Page" : "Add Page Management"} 
      maxWidth="md" 
      actionsAlign="center"
    >
      <Formik 
        initialValues={initialValues} 
        validationSchema={pageCreateValidationSchema} 
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
                <TextField
                  fullWidth
                  placeholder="Enter Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Content *</label>
                <TextField
                  fullWidth
                  multiline
                  minRows={10}
                  placeholder="Enter page content"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.content && Boolean(errors.content)}
                  helperText={touched.content && errors.content}
                />
              </div>

              <div className="flex justify-center gap-3 mt-4">
                <CancelButton type="button" onClick={onClose} isSubmitting={isSubmitting} />
                <SubmitButton type="submit" isSubmitting={isSubmitting} loadingText={isEdit ? "Updating..." : "Creating..."}>
                  {isEdit ? "Update" : "Save"}
                </SubmitButton>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </CustomModal>
  );
}

export default PageModal;


