import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { opportunityService } from '../../services/opportunities/opportunityService';

const OpportunityManagement = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    timeframe: '30days',
  });

  useEffect(() => {
    loadOpportunities();
  }, [filters]);

  const loadOpportunities = async () => {
    try {
      setLoading(true);
      const data = await opportunityService.getAll(filters);
      setOpportunities(data);
    } catch (error) {
      console.error('Failed to load opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOpportunity = () => {
    setSelectedOpp(null);
    setFormOpen(true);
  };

  const handleEditOpportunity = (opp) => {
    setSelectedOpp(opp);
    setFormOpen(true);
  };

  const handleSaveOpportunity = async (data) => {
    try {
      if (selectedOpp) {
        await opportunityService.update(selectedOpp.id, data);
      } else {
        await opportunityService.create(data);
      }
      loadOpportunities();
      setFormOpen(false);
    } catch (error) {
      console.error('Failed to save opportunity:', error);
    }
  };

  const handleDeleteOpportunity = async (id) => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      try {
        await opportunityService.delete(id);
        loadOpportunities();
      } catch (error) {
        console.error('Failed to delete opportunity:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Sales Opportunities</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddOpportunity}
        >
          New Opportunity
        </Button>
      </Box>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="qualified">Qualified</MenuItem>
              <MenuItem value="proposal">Proposal</MenuItem>
              <MenuItem value="negotiation">Negotiation</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Add more filters */}
      </Grid>

      {/* Opportunities Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell>Probability</TableCell>
              <TableCell>Next Action</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {opportunities.map((opp) => (
              <TableRow key={opp.id}>
                <TableCell>{opp.name}</TableCell>
                <TableCell>{opp.company}</TableCell>
                <TableCell>${opp.value.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={opp.stage}
                    color={getStageColor(opp.stage)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LinearProgress
                      variant="determinate"
                      value={opp.probability}
                      sx={{ flexGrow: 1, mr: 1 }}
                    />
                    {opp.probability}%
                  </Box>
                </TableCell>
                <TableCell>
                  {opp.nextAction}
                  <Typography variant="caption" display="block" color="textSecondary">
                    {new Date(opp.nextActionDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditOpportunity(opp)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDeleteOpportunity(opp.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Opportunity Form Dialog */}
      <OpportunityForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSaveOpportunity}
        opportunity={selectedOpp}
      />
    </Box>
  );
};

export default OpportunityManagement; 