import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Rating,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LeadForm from './LeadForm';
import { useSelector, useDispatch } from 'react-redux';

const LeadManagement = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Lead scoring criteria
  const calculateLeadScore = (lead) => {
    let score = 0;
    
    // Company size score (0-20)
    score += lead.companySize * 4;
    
    // Budget score (0-30)
    score += (lead.budget / 10000) * 3;
    
    // Engagement score (0-25)
    score += lead.engagementLevel * 5;
    
    // Need score (0-25)
    score += lead.needLevel * 5;
    
    return Math.min(score, 100);
  };

  const leads = [
    {
      id: 1,
      name: 'John Smith',
      company: 'Tech Corp',
      email: 'john@techcorp.com',
      phone: '+1 234-567-8900',
      status: 'New',
      assignedTo: 'Sarah Wilson',
      companySize: 4, // 1-5 scale
      budget: 50000,
      engagementLevel: 4, // 1-5 scale
      needLevel: 5, // 1-5 scale
      lastContact: new Date('2024-01-15'),
      notes: 'Interested in enterprise solution',
    },
    // Add more mock leads
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Lead Overview */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Lead Management</Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSelectedLead(null);
                setFormOpen(true);
              }}
            >
              Add New Lead
            </Button>
          </Box>
        </Grid>

        {/* Lead Statistics */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Lead Statistics</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="textSecondary">Total Leads</Typography>
                <Typography variant="h4">{leads.length}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="textSecondary">Hot Leads</Typography>
                <Typography variant="h4">
                  {leads.filter(lead => calculateLeadScore(lead) >= 80).length}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Lead Table */}
        <Grid item xs={12}>
          <TableContainer component={Card}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Lead Score</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Last Contact</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leads.map((lead) => {
                  const leadScore = calculateLeadScore(lead);
                  return (
                    <TableRow key={lead.id}>
                      <TableCell>{lead.name}</TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>
                        <Chip
                          label={lead.status}
                          color={lead.status === 'New' ? 'primary' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating
                            value={leadScore / 20}
                            readOnly
                            precision={0.5}
                            size="small"
                          />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            ({leadScore})
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{lead.assignedTo}</TableCell>
                      <TableCell>
                        {new Date(lead.lastContact).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedLead(lead);
                            setFormOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <AssignmentIndIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <LeadForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        lead={selectedLead}
      />
    </Box>
  );
};

export default LeadManagement; 