import * as Yup from 'yup';

// Role validation schema
export const roleValidationSchema = Yup.object({
  role_name: Yup.string()
    .required('Role name is required')
    .min(2, 'Role name must be at least 2 characters')
    .max(50, 'Role name must be less than 50 characters'),
  
  Edit: Yup.boolean()
    .required('Edit access is required'),
  
  View: Yup.boolean()
    .required('View access is required')
});

// Role update validation schema (nullable fields for updates)
export const roleUpdateValidationSchema = Yup.object({
  role_name: Yup.string()
    .nullable()
    .min(2, 'Role name must be at least 2 characters')
    .max(50, 'Role name must be less than 50 characters'),
  
  Edit: Yup.boolean()
    .nullable(),
  
  View: Yup.boolean()
    .nullable()
});



