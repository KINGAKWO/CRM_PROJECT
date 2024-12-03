import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const priorities = ['all', 'high', 'medium', 'low'];

const SalesFilters = ({ filters, onFilterChange }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="search"
            placeholder="Search deals..."
            value={filters.search}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            select
            name="priority"
            label="Priority"
            value={filters.priority}
            onChange={handleChange}
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            select
            name="valueRange"
            label="Deal Value"
            value={filters.valueRange}
            onChange={handleChange}
          >
            <MenuItem value="all">All Values</MenuItem>
            <MenuItem value="0-10000">$0 - $10,000</MenuItem>
            <MenuItem value="10000-50000">$10,000 - $50,000</MenuItem>
            <MenuItem value="50000+">$50,000+</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesFilters; 