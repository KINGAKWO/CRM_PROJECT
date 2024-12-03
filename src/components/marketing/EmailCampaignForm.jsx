import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  FormControlLabel,
  Switch,
  Chip,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  subject: Yup.string().required('Subject is required'),
  template: Yup.string().required('Template is required'),
  scheduledFor: Yup.date().min(new Date(), 'Schedule time must be in the future'),
  targetAudience: Yup.array().min(1, 'Select at least one audience segment'),
});

const templates = [
  'Welcome Email',
  'Newsletter',
  'Product Update',
  'Promotional Offer',
  'Event Invitation',
];

const audiences = [
  'All Customers',
  'New Customers',
  'Active Users',
  'Inactive Users',
  'Premium Customers',
];

const EmailCampaignForm = ({ open, onClose, onSubmit, initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      subject: '',
      template: '',
      content: '',
      scheduledFor: new Date(),
      sendNow: false,
      targetAudience: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
      onClose();
    },
  });

  const handleAudienceToggle = (audience) => {
    const currentAudience = formik.values.targetAudience;
    const newAudience = currentAudience.includes(audience)
      ? currentAudience.filter(a => a !== audience)
      : [...currentAudience, audience];
    formik.setFieldValue('targetAudience', newAudience);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Schedule Email Campaign</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="subject"
                label="Email Subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                name="template"
                label="Email Template"
                value={formik.values.template}
                onChange={formik.handleChange}
                error={formik.touched.template && Boolean(formik.errors.template)}
                helperText={formik.touched.template && formik.errors.template}
              >
                {templates.map((template) => (
                  <MenuItem key={template} value={template}>
                    {template}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="content"
                label="Email Content"
                value={formik.values.content}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <div>Target Audience</div>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {audiences.map((audience) => (
                  <Chip
                    key={audience}
                    label={audience}
                    onClick={() => handleAudienceToggle(audience)}
                    color={formik.values.targetAudience.includes(audience) ? 'primary' : 'default'}
                  />
                ))}
              </Box>
              {formik.touched.targetAudience && formik.errors.targetAudience && (
                <Typography color="error" variant="caption">
                  {formik.errors.targetAudience}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.sendNow}
                    onChange={(e) => formik.setFieldValue('sendNow', e.target.checked)}
                  />
                }
                label="Send Immediately"
              />
            </Grid>

            {!formik.values.sendNow && (
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Schedule For"
                    value={formik.values.scheduledFor}
                    onChange={(value) => formik.setFieldValue('scheduledFor', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={formik.touched.scheduledFor && Boolean(formik.errors.scheduledFor)}
                        helperText={formik.touched.scheduledFor && formik.errors.scheduledFor}
                      />
                    )}
                    minDateTime={new Date()}
                  />
                </LocalizationProvider>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Schedule Campaign
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmailCampaignForm; 