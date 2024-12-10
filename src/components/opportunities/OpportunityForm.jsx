import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  company: Yup.string().required('Company is required'),
  value: Yup.number()
    .required('Value is required')
    .min(0, 'Value must be positive'),
  stage: Yup.string().required('Stage is required'),
  probability: Yup.number()
    .required('Probability is required')
    .min(0, 'Must be between 0 and 100')
    .max(100, 'Must be between 0 and 100'),
  nextAction: Yup.string().required('Next action is required'),
  nextActionDate: Yup.date().required('Next action date is required'),
});

const OpportunityForm = ({ open, onClose, onSubmit, opportunity }) => {
  const formik = useFormik({
    initialValues: opportunity || {
      name: '',
      company: '',
      value: '',
      stage: 'new',
      probability: 0,
      nextAction: '',
      nextActionDate: new Date().toISOString().split('T')[0],
      description: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {opportunity ? 'Edit Opportunity' : 'New Opportunity'}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label="Opportunity Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="company"
                label="Company"
                value={formik.values.company}
                onChange={formik.handleChange}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="value"
                label="Value"
                type="number"
                value={formik.values.value}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                error={formik.touched.value && Boolean(formik.errors.value)}
                helperText={formik.touched.value && formik.errors.value}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Stage</InputLabel>
                <Select
                  name="stage"
                  value={formik.values.stage}
                  onChange={formik.handleChange}
                  error={formik.touched.stage && Boolean(formik.errors.stage)}
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="qualified">Qualified</MenuItem>
                  <MenuItem value="proposal">Proposal</MenuItem>
                  <MenuItem value="negotiation">Negotiation</MenuItem>
                  <MenuItem value="closed">Closed Won</MenuItem>
                  <MenuItem value="lost">Closed Lost</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Add more fields */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {opportunity ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default OpportunityForm; 