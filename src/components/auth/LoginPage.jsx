import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Tab,
  Tabs,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/auth';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// HubSpot password validation schema
const passwordValidation = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: passwordValidation,
  confirmPassword: Yup.string()
    .when('tab', {
      is: 1,
      then: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
    }),
  name: Yup.string()
    .when('tab', {
      is: 1,
      then: Yup.string()
        .required('Full name is required')
        .min(2, 'Name must be at least 2 characters'),
    }),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      tab,
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        if (tab === 1) {
          await auth.signup(values);
        } else {
          await auth.login(values.email, values.password);
        }
        navigate('/');
      } catch (error) {
        setError(error.message);
      }
    },
  });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    formik.setFieldValue('tab', newValue);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Paper sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to CRM
          </Typography>
          
          <Tabs 
            value={tab} 
            onChange={handleTabChange}
            centered
            sx={{ mb: 3 }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            {tab === 1 && (
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin="normal"
              />
            )}
            
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />

            {tab === 1 && (
              <>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  margin="normal"
                />

                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Password must contain:
                  </Typography>
                  <ul style={{ margin: '8px 0', paddingLeft: '20px', color: 'text.secondary' }}>
                    <li>At least 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one lowercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                </Box>
              </>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
              disabled={formik.isSubmitting}
            >
              {tab === 0 ? 'Login' : 'Sign Up'}
            </Button>

            <Divider sx={{ my: 3 }}>OR</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ mb: 2 }}
            >
              Continue with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHubIcon />}
            >
              Continue with GitHub
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage; 