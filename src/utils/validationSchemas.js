import * as Yup from 'yup';

export const contactSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-() ]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits'),
  company: Yup.string()
    .required('Company name is required'),
  type: Yup.string()
    .oneOf(['lead', 'customer', 'partner'], 'Invalid contact type')
    .required('Contact type is required'),
}); 