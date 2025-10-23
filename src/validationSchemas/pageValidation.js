import * as Yup from 'yup';

export const pageCreateValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title is too long')
    .required('Title is required'),
  content: Yup.string()
    .trim()
    .min(10, 'Content must be at least 10 characters')
    .required('Content is required'),
});

export default {
  pageCreateValidationSchema,
};




