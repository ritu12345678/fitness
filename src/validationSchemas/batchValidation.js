import * as Yup from 'yup';

// Batch Create/Edit Validation Schema
export const batchValidationSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .required('Title is required'),
  studio_id: Yup.string()
    .required('Studio is required'),
  address_1: Yup.string()
    .min(5, 'Address 1 must be at least 5 characters')
    .required('Address 1 is required'),
  address_2: Yup.string()
    .min(3, 'Address 2 must be at least 3 characters')
    .required('Address 2 is required'),
  city: Yup.string()
    .required('City is required'),
  state: Yup.string()
    .required('State is required'),
  from: Yup.string()
    .required('Opening time is required'),
  to: Yup.string()
    .required('Closing time is required')
    .test('is-after-from', 'Closing time must be after opening time', function(value) {
      const { from } = this.parent;
      if (!from || !value) return true;
      return value > from;
    }),
  starting_amount: Yup.number()
    .min(1, 'Starting amount must be greater than 0')
    .required('Starting amount is required'),
  feature_image: Yup.mixed()
    .required('Feature image is required'),
  video: Yup.mixed(), // Video is optional
});

export default {
  batchValidationSchema,
};

