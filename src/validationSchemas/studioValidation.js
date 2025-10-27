import * as Yup from 'yup';

// Studio validation schema
export const studioValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Studio name is required')
    .min(2, 'Studio name must be at least 2 characters')
    .max(100, 'Studio name must be less than 100 characters'),
  
  address1: Yup.string()
    .required('Address line 1 is required')
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters'),
  
  address2: Yup.string()
    .max(200, 'Address line 2 must be less than 200 characters'),
  
  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters'),
  
  state: Yup.string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be less than 50 characters'),
  
  from: Yup.string()
    .required('Opening time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)'),
  
  to: Yup.string()
    .required('Closing time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)')
    .test('is-after-from', 'Closing time must be after opening time', function(value) {
      const { from } = this.parent;
      if (!from || !value) return true;
      
      const fromTime = new Date(`2000-01-01T${from}:00`);
      const toTime = new Date(`2000-01-01T${value}:00`);
      
      return toTime > fromTime;
    }),
  
  amount: Yup.number()
    .required('Starting amount is required')
    .min(0, 'Amount must be positive')
    .max(999999, 'Amount must be less than 999,999'),
  
  image: Yup.mixed()
    .required('Feature image is required')
    .test('fileType', 'Please select a valid image file', (value) => {
      if (!value) return false;
      return value && value.type && value.type.startsWith('image/');
    }),
  
  video: Yup.mixed()
    .nullable()
    .test('fileType', 'Please select a valid video file', (value) => {
      if (!value) return true; // Allow null/empty
      return value && value.type && value.type.startsWith('video/');
    }),
});

// Studio update validation schema (some fields optional for updates)
export const studioUpdateValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Studio name must be at least 2 characters')
    .max(100, 'Studio name must be less than 100 characters')
    .nullable(),
  
  address1: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters')
    .nullable(),
  
  address2: Yup.string()
    .max(200, 'Address line 2 must be less than 200 characters')
    .nullable(),
  
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .nullable(),
  
  state: Yup.string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be less than 50 characters')
    .nullable(),
  
  from: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)')
    .nullable(),
  
  to: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)')
    .test('is-after-from', 'Closing time must be after opening time', function(value) {
      const { from } = this.parent;
      if (!from || !value) return true;
      
      const fromTime = new Date(`2000-01-01T${from}:00`);
      const toTime = new Date(`2000-01-01T${value}:00`);
      
      return toTime > fromTime;
    })
    .nullable(),
  
  amount: Yup.number()
    .min(0, 'Amount must be positive')
    .max(999999, 'Amount must be less than 999,999')
    .nullable(),
  
  image: Yup.string()
    .url('Please enter a valid image URL')
    .nullable(),
  
  video: Yup.string()
    .url('Please enter a valid video URL')
    .nullable(),
});

export default {
  studioValidationSchema,
  studioUpdateValidationSchema,
};
