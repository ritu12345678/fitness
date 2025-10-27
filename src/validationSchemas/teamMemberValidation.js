import * as Yup from 'yup';

// Team member validation schema
export const teamMemberValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  mobile: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  
  role_id: Yup.string()
    .required('Role is required'),
  
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be less than 20 characters'),
  
  gender: Yup.string()
    .oneOf(['male', 'female'], 'Gender must be male or female')
    .required('Gender is required')
});

// Team member update validation schema (nullable fields for updates)
export const teamMemberUpdateValidationSchema = Yup.object({
  name: Yup.string()
    .nullable()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: Yup.string()
    .nullable()
    .email('Invalid email format'),
  
  mobile: Yup.string()
    .nullable()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  
  role_id: Yup.string()
    .nullable(),
  
  password: Yup.string()
    .nullable()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be less than 20 characters'),
  
  gender: Yup.string()
    .nullable()
    .oneOf(['male', 'female'], 'Gender must be male or female')
});

