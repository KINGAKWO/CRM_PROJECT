import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import {
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { integrationService } from '../../services/integrations';

const IntegrationsManager = () => {
  const [integrations, setIntegrations] = useState({
    email: {
      gmail: false,
      outlook: false,
      smtp: false,
    },
    calendar: {
      googleCalendar: false,
      outlookCalendar: false,
    },
    communication: {
      slack: false,
      teams: false,
    },
  });

  const [configDialog, setConfigDialog] = useState({
    open: false,
    type: null,
    service: null,
  });

  const [smtpConfig, setSmtpConfig] = useState({
    host: '',
    port: '',
    username: '',
    password: '',
  });

  const handleConnect = async (type, service) => {
    try {
      let response;
      switch (type) {
        case 'email':
          if (service === 'gmail') {
            response = await integrationService.email.connectGmail();
          } else if (service === 'outlook') {
            response = await integrationService.email.connectOutlook();
          } else if (service === 'smtp') {
            setConfigDialog({ open: true, type, service });
            return;
          }
          break;
        case 'calendar':
          if (service === 'googleCalendar') {
            response = await integrationService.calendar.connectGoogleCalendar();
          } else if (service === 'outlookCalendar') {
            response = await integrationService.calendar.connectOutlookCalendar();
          }
          break;
        case 'communication':
          if (service === 'slack') {
            response = await integrationService.communication.connectSlack();
          } else if (service === 'teams') {
            response = await integrationService.communication.connectTeams();
          }
          break;
      }

      if (response?.success) {
        setIntegrations(prev => ({
          ...prev,
          [type]: {
            ...prev[type],
            [service]: true,
          },
        }));
      }
    } catch (error) {
      console.error('Integration connection failed:', error);
    }
  };

  const handleSMTPConfig = async () => {
    try {
      const response = await integrationService.email.configureSMTP(smtpConfig);
      if (response.success) {
        setIntegrations(prev => ({
          ...prev,
          email: {
            ...prev.email,
            smtp: true,
          },
        }));
        setConfigDialog({ open: false, type: null, service: null });
      }
    } catch (error) {
      console.error('SMTP configuration failed:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Integrations
      </Typography>

      <Grid container spacing={3}>
        {/* Email Integrations */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={<EmailIcon />}
              title="Email Integrations"
              subheader="Connect your email services"
            />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="Gmail" />
                  <ListItemSecondaryAction>
                    <Button
                      variant={integrations.email.gmail ? "outlined" : "contained"}
                      onClick={() => handleConnect('email', 'gmail')}
                    >
                      {integrations.email.gmail ? 'Connected' : 'Connect'}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                {/* Add other email integration options */}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Calendar Integrations */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={<CalendarIcon />}
              title="Calendar Integrations"
              subheader="Connect your calendars"
            />
            <CardContent>
              <List>
                {/* Add calendar integration options */}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Communication Integrations */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={<ChatIcon />}
              title="Communication Integrations"
              subheader="Connect your communication tools"
            />
            <CardContent>
              <List>
                {/* Add communication integration options */}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* SMTP Configuration Dialog */}
      <Dialog
        open={configDialog.open}
        onClose={() => setConfigDialog({ open: false, type: null, service: null })}
      >
        <DialogTitle>Configure SMTP</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="SMTP Host"
                value={smtpConfig.host}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
              />
            </Grid>
            {/* Add other SMTP configuration fields */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfigDialog({ open: false, type: null, service: null })}>
            Cancel
          </Button>
          <Button onClick={handleSMTPConfig} variant="contained" color="primary">
            Save Configuration
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IntegrationsManager; 