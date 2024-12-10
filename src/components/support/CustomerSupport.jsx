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
  ListItemAvatar,
  Avatar,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Badge,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Assignment as TicketIcon,
  PriorityHigh as PriorityIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const CustomerSupport = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      customer: 'John Doe',
      subject: 'Login Issues',
      status: 'open',
      priority: 'high',
      type: 'technical',
      assignedTo: 'Sarah Wilson',
      createdAt: new Date('2024-01-15'),
      lastUpdated: new Date('2024-01-16'),
      messages: [
        {
          sender: 'John Doe',
          message: 'Unable to login to the system',
          timestamp: new Date('2024-01-15'),
        },
      ],
    },
    // Add more mock tickets
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const handleNewTicket = () => {
    setSelectedTicket(null);
    setOpenDialog(true);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'success',
    };
    return colors[priority] || 'default';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Customer Support</Typography>
            <Button
              variant="contained"
              startIcon={<TicketIcon />}
              onClick={handleNewTicket}
            >
              New Ticket
            </Button>
          </Box>
        </Grid>

        {/* Support Stats */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Support Overview</Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <TicketIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Open Tickets"
                  secondary={tickets.filter(t => t.status === 'open').length}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'error.main' }}>
                    <PriorityIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="High Priority"
                  secondary={tickets.filter(t => t.priority === 'high').length}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <ScheduleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Average Response Time"
                  secondary="2.5 hours"
                />
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* Ticket List */}
        <Grid item xs={12} md={8}>
          <Card>
            <Tabs
              value={currentTab}
              onChange={(e, newValue) => setCurrentTab(newValue)}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="All Tickets" />
              <Tab label="Open" />
              <Tab label="Closed" />
            </Tabs>
            <List>
              {tickets.map((ticket) => (
                <ListItem
                  key={ticket.id}
                  button
                  onClick={() => handleTicketClick(ticket)}
                  divider
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {ticket.subject}
                        <Chip
                          size="small"
                          label={ticket.priority}
                          color={getPriorityColor(ticket.priority)}
                        />
                      </Box>
                    }
                    secondary={`${ticket.customer} - ${new Date(ticket.createdAt).toLocaleDateString()}`}
                  />
                  <Chip label={ticket.status} size="small" />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Ticket Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedTicket ? 'View Ticket' : 'New Support Ticket'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subject"
                defaultValue={selectedTicket?.subject}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select defaultValue={selectedTicket?.priority || 'medium'}>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                defaultValue={selectedTicket?.messages[0]?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            {selectedTicket ? 'Update Ticket' : 'Create Ticket'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerSupport; 