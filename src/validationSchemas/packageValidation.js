import * as Yup from 'yup';

// Package validation schema
export const packageValidationSchema = Yup.object({
  name: Yup.string()
    .required('Package name is required')
    .min(2, 'Package name must be at least 2 characters')
    .max(100, 'Package name must be less than 100 characters'),
  
  classesCategory: Yup.string()
    .required('Category is required')
    .oneOf(['Group Classes', 'Private Classes', 'Private Dua Classes'], 'Invalid category'),
  
  MaxTrainee: Yup.number()
    .required('Max trainee is required')
    .min(1, 'Max trainee must be at least 1')
    .max(1000, 'Max trainee must be less than 1000')
    .integer('Max trainee must be a whole number'),
  
  session: Yup.string()
    .required('Session is required')
    .matches(/^\d+$/, 'Session must be a number'),
  
  days: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one day must be selected')
    .required('Days are required'),
  
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be positive')
    .max(100000, 'Price must be less than 100,000'),
  
  location: Yup.number()
    .required('Location is required')
    .min(1, 'Invalid location'),
  
  PackageDurectionDay: Yup.number()
    .required('Package duration is required')
    .min(1, 'Duration must be at least 1 day')
    .max(365, 'Duration must be less than 365 days')
    .integer('Duration must be a whole number')
});

// Package update validation schema (nullable fields for updates)
export const packageUpdateValidationSchema = Yup.object({
  name: Yup.string()
    .nullable()
    .min(2, 'Package name must be at least 2 characters')
    .max(100, 'Package name must be less than 100 characters'),
  
  classesCategory: Yup.string()
    .nullable()
    .oneOf(['Group Classes', 'Private Classes', 'Private Dua Classes'], 'Invalid category'),
  
  MaxTrainee: Yup.number()
    .nullable()
    .min(1, 'Max trainee must be at least 1')
    .max(1000, 'Max trainee must be less than 1000')
    .integer('Max trainee must be a whole number'),
  
  session: Yup.string()
    .nullable()
    .matches(/^\d+$/, 'Session must be a number'),
  
  days: Yup.array()
    .of(Yup.string())
    .nullable()
    .min(1, 'At least one day must be selected'),
  
  price: Yup.number()
    .nullable()
    .min(0, 'Price must be positive')
    .max(100000, 'Price must be less than 100,000'),
  
  location: Yup.number()
    .nullable()
    .min(1, 'Invalid location'),
  
  PackageDurectionDay: Yup.number()
    .nullable()
    .min(1, 'Duration must be at least 1 day')
    .max(365, 'Duration must be less than 365 days')
    .integer('Duration must be a whole number')
});
