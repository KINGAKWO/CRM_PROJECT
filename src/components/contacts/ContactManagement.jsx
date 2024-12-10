import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  Paper,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  ImportExport as ImportExportIcon,
  Label as TagIcon,
  History as HistoryIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { api } from '../../services/api';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    tags: [],
  });

  // Contact history tracking
  const [contactHistory] = useState([
    {
      contactId: 1,
      type: 'email',
      description: 'Sent follow-up email',
      timestamp: new Date('2024-01-15'),
      user: 'John Doe',
    },
    // Add more history items
  ]);

  // Tags management
  const [tags] = useState([
    'VIP',
    'New Lead',
    'Hot Prospect',
    'Key Account',
    'Follow Up',
  ]);

  const handleAddContact = () => {
    setSelectedContact(null);
    setFormOpen(true);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setFormOpen(true);
  };

  const handleSaveContact = async (contactData) => {
    try {
      if (selectedContact) {
        await api.contacts.update(selectedContact.id, contactData);
      } else {
        await api.contacts.create(contactData);
      }
      fetchContacts();
      setFormOpen(false);
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await api.contacts.delete(contactId);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await api.contacts.getAll();
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'all' || contact.type === filters.type;
    const matchesStatus = filters.status === 'all' || contact.status === filters.status;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Contact Management</Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={<ImportExportIcon />}
                sx={{ mr: 1 }}
              >
                Import/Export
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddContact}
              >
                Add Contact
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Search and Filters */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                      label="Type"
                    >
                      <MenuItem value="all">All Types</MenuItem>
                      <MenuItem value="lead">Lead</MenuItem>
                      <MenuItem value="customer">Customer</MenuItem>
                      <MenuItem value="partner">Partner</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      label="Status"
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Contact List */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>
                      <Chip
                        label={contact.type}
                        color={contact.type === 'customer' ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={contact.status}
                        color={contact.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {contact.tags?.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ mr: 0.5 }}
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEditContact(contact)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                      >
                        <HistoryIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Contact Form Dialog */}
      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedContact ? 'Edit Contact' : 'Add New Contact'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                defaultValue={selectedContact?.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                defaultValue={selectedContact?.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                defaultValue={selectedContact?.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                defaultValue={selectedContact?.company}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select defaultValue={selectedContact?.type || 'lead'}>
                  <MenuItem value="lead">Lead</MenuItem>
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="partner">Partner</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select defaultValue={selectedContact?.status || 'active'}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tags</InputLabel>
                <Select
                  multiple
                  defaultValue={selectedContact?.tags || []}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notes"
                defaultValue={selectedContact?.notes}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            {selectedContact ? 'Update Contact' : 'Add Contact'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactManagement; 