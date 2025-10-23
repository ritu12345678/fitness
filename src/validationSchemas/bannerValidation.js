import * as Yup from 'yup';

// Banner Create Validation Schema
export const bannerValidationSchema = Yup.object({
  content: Yup.string()
    .min(10, 'Content must be at least 10 characters')
    .required('Content is required'),
  from: Yup.string()
    .required('From date is required'),
  to: Yup.string()
    .required('To date is required')
    .test('is-after-from', 'To date must be after from date', function(value) {
      const { from } = this.parent;
      if (!from || !value) return true;
      return new Date(value) > new Date(from);
    }),
  image: Yup.mixed()
    .required('Image is required'),
});

// Banner Edit Validation Schema (image not required for edit)
export const bannerEditValidationSchema = Yup.object({
  content: Yup.string()
    .min(10, 'Content must be at least 10 characters')
    .required('Content is required'),
  from: Yup.string()
    .required('From date is required'),
  to: Yup.string()
    .required('To date is required')
    .test('is-after-from', 'To date must be after from date', function(value) {
      const { from } = this.parent;
      if (!from || !value) return true;
      return new Date(value) > new Date(from);
    }),
  image: Yup.mixed(), // Image not required for edit
});

export default {
  bannerValidationSchema,
  bannerEditValidationSchema,
};



