import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Box, Typography } from '@mui/material';
import CustomModal from '../../../../components/CustomModal';
import { SubmitButton, CancelButton } from '../../../../components/ModalButtons';
import { apiService } from '../../../../services/apiClient';
import { useToast } from '../../../../hooks/useToast';

const faqValidationSchema = Yup.object({
  description: Yup.string()
    .required('Question is required')
    .min(5, 'Question must be at least 5 characters')
    .max(500, 'Question must be less than 500 characters'),
  reply: Yup.string()
    .required('Answer is required')
    .min(5, 'Answer must be at least 5 characters')
    .max(1000, 'Answer must be less than 1000 characters'),
});

const faqUpdateValidationSchema = Yup.object({
  description: Yup.string()
    .nullable()
    .min(5, 'Question must be at least 5 characters')
    .max(500, 'Question must be less than 500 characters'),
  reply: Yup.string()
    .nullable()
    .min(5, 'Answer must be at least 5 characters')
    .max(1000, 'Answer must be less than 1000 characters'),
});

function AddFaqModal({ open, onClose, onSave, faq = null, isEdit = false }) {
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const initialValues = {
    description: faq?.description || '',
    reply: faq?.reply || '',
  };

  const validationSchema = isEdit ? faqUpdateValidationSchema : faqValidationSchema;

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);

    try {
      if (isEdit) {
        // Update FAQ - PUT to admin/faqs/update
        const payload = {
          faq_id: faq.faq_id || faq.id,
          description: values.description,
          reply: values.reply,
        };
        
        await apiService.put('admin/faqs/update', payload);
        showSuccess('FAQ updated successfully!');
      } else {
        // Add FAQ - POST to admin/faqs
        const payload = {
          user_id: 7, // Static user_id as per requirement
          description: values.description,
          reply: values.reply || '',
        };
        
        await apiService.post('admin/faqs', payload);
        showSuccess('FAQ added successfully!');
      }

      resetForm();
      onClose();
      onSave?.();
    } catch (err) {
      console.error('❌ ERROR SAVING FAQ:', err);
      showError(err?.response?.data?.message || 'Failed to save FAQ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit FAQ' : 'Add FAQ'}
      maxWidth="md"
      actionsAlign="center"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleSubmit: formikSubmit, errors, touched }) => (
          <form onSubmit={formikSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Question Field */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1, color: '#374151' }}>
                  Question
                </Typography>
                <TextField
                  fullWidth
                  name="description"
                  placeholder="Enter your question"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
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

              {/* Answer Field */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1, color: '#374151' }}>
                  Answer
                </Typography>
                <TextField
                  fullWidth
                  name="reply"
                  multiline
                  rows={4}
                  placeholder="Enter your answer"
                  value={values.reply}
                  onChange={handleChange}
                  error={touched.reply && Boolean(errors.reply)}
                  helperText={touched.reply && errors.reply}
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
              <CancelButton type="button" onClick={onClose} isSubmitting={isSubmitting} />
              <SubmitButton
                type="submit"
                isSubmitting={isSubmitting}
                loadingText={isEdit ? 'Updating...' : 'Creating...'}
                sx={{
                  backgroundColor: '#f6a5a5',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#f5a0a0',
                  },
                }}
              >
                {isEdit ? 'Update FAQ' : 'Save FAQ'}
              </SubmitButton>
            </div>
          </form>
        )}
      </Formik>
    </CustomModal>
  );
}

export default AddFaqModal;









