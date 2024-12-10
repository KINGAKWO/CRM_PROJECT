import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as TaskIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';

const OpportunityManagement = () => {
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      name: 'Enterprise Software Deal',
      company: 'Tech Corp',
      value: 50000,
      stage: 'Negotiation',
      probability: 75,
      expectedCloseDate: new Date('2024-03-15'),
      nextAction: 'Follow-up meeting',
      nextActionDate: new Date('2024-02-01'),
      activities: [
        {
          type: 'email',
          description: 'Sent proposal',
          date: new Date('2024-01-15'),
        },
        {
          type: 'call',
          description: 'Discovery call',
          date: new Date('2024-01-10'),
        },
      ],
    },
    // Add more opportunities
  ]);

  const [selectedOpp, setSelectedOpp] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [activityFormOpen, setActivityFormOpen] = useState(false);

  const handleAddActivity = (oppId, activity) => {
    setOpportunities(opportunities.map(opp => {
      if (opp.id === oppId) {
        return {
          ...opp,
          activities: [...opp.activities, activity],
        };
      }
      return opp;
    }));
  };

  const calculateHealth = (opp) => {
    const today = new Date();
    const daysSinceLastActivity = Math.floor(
      (today - new Date(opp.activities[0]?.date)) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceLastActivity > 14) return 'at_risk';
    if (daysSinceLastActivity > 7) return 'warning';
    return 'healthy';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Sales Opportunities</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setSelectedOpp(null);
                setFormOpen(true);
              }}
            >
              New Opportunity
            </Button>
          </Box>
        </Grid>

        {/* Opportunity List */}
        <Grid item xs={12} md={8}>
          <Card>
            <List>
              {opportunities.map((opp) => (
                <ListItem
                  key={opp.id}
                  divider
                  button
                  onClick={() => setSelectedOpp(opp)}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {opp.name}
                        <Chip
                          label={opp.stage}
                          size="small"
                          color="primary"
                        />
                        <Chip
                          label={`$${opp.value.toLocaleString()}`}
                          size="small"
                          color="secondary"
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          {opp.company} • {opp.probability}% Probability
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Next Action: {opp.nextAction} ({new Date(opp.nextActionDate).toLocaleDateString()})
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOpp(opp);
                        setFormOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Opportunity Details */}
        <Grid item xs={12} md={4}>
          {selectedOpp && (
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Activity Timeline
              </Typography>
              <Timeline>
                {selectedOpp.activities.map((activity, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color={
                        activity.type === 'email' ? 'primary' :
                        activity.type === 'call' ? 'secondary' : 'grey'
                      }>
                        {activity.type === 'email' ? <EmailIcon /> :
                         activity.type === 'call' ? <PhoneIcon /> : <TaskIcon />}
                      </TimelineDot>
                      {index < selectedOpp.activities.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body2">
                        {activity.description}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(activity.date).toLocaleString()}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setActivityFormOpen(true)}
              >
                Add Activity
              </Button>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Forms */}
      {/* Add Opportunity Form Dialog */}
      {/* Add Activity Form Dialog */}
    </Box>
  );
};

export default OpportunityManagement; 