import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CampaignIcon from '@mui/icons-material/Campaign';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import EmailCampaignForm from './EmailCampaignForm';
import { api } from '../../services/api';

const MarketingPage = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Sale Newsletter',
      status: 'Active',
      progress: 75,
      sent: 1500,
      opened: 720,
      clicked: 250,
    },
    {
      id: 2,
      name: 'New Product Launch',
      status: 'Draft',
      progress: 30,
      sent: 0,
      opened: 0,
      clicked: 0,
    },
    {
      id: 3,
      name: 'Customer Feedback Survey',
      status: 'Completed',
      progress: 100,
      sent: 2000,
      opened: 1200,
      clicked: 800,
    },
  ]);
  
  const [formOpen, setFormOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleNewCampaign = () => {
    setFormOpen(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await api.campaigns.create(values);
      setCampaigns(prev => [...prev, response.data]);
      setSnackbar({ 
        open: true, 
        message: 'Campaign created successfully', 
        severity: 'success' 
      });
      setFormOpen(false);
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: 'Failed to create campaign', 
        severity: 'error' 
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Marketing Campaigns
      </Typography>

      <Grid container spacing={3}>
        {/* Campaign Stats */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Campaign Overview" />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Total Campaigns"
                    secondary={`${campaigns.length} Active`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PeopleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Total Subscribers"
                    secondary="5,234"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUpIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Average Open Rate"
                    secondary="24.8%"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Campaign List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader 
              title="Recent Campaigns"
              action={
                <Button
                  variant="contained"
                  startIcon={<CampaignIcon />}
                  onClick={handleNewCampaign}
                >
                  New Campaign
                </Button>
              }
            />
            <CardContent>
              {campaigns.map((campaign) => (
                <Box key={campaign.id} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1">{campaign.name}</Typography>
                    <Typography color="textSecondary">{campaign.status}</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={campaign.progress} 
                    sx={{ mb: 1 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">
                      Sent: {campaign.sent}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Opened: {campaign.opened}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Clicked: {campaign.clicked}
                    </Typography>
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Campaign Form Dialog */}
      <EmailCampaignForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MarketingPage; 