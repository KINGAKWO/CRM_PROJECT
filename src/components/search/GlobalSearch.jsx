import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
  Popper,
  Fade,
  InputAdornment,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  AttachMoney as DealIcon,
  Campaign as CampaignIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({
    contacts: [],
    deals: [],
    companies: [],
    campaigns: [],
  });
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const performSearch = async (term) => {
    if (!term) {
      setSearchResults({
        contacts: [],
        deals: [],
        companies: [],
        campaigns: [],
      });
      return;
    }

    setLoading(true);
    try {
      // Perform parallel searches across different entities
      const [contacts, deals, companies, campaigns] = await Promise.all([
        searchContacts(term),
        searchDeals(term),
        searchCompanies(term),
        searchCampaigns(term),
      ]);

      setSearchResults({
        contacts,
        deals,
        companies,
        campaigns,
      });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce(performSearch, 300);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setAnchorEl(event.currentTarget);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults({
      contacts: [],
      deals: [],
      companies: [],
      campaigns: [],
    });
  };

  const handleResultClick = (type, item) => {
    switch (type) {
      case 'contact':
        navigate(`/contacts/${item.id}`);
        break;
      case 'deal':
        navigate(`/sales/${item.id}`);
        break;
      case 'company':
        navigate(`/companies/${item.id}`);
        break;
      case 'campaign':
        navigate(`/marketing/campaigns/${item.id}`);
        break;
    }
    handleClear();
  };

  const renderSearchResults = () => {
    const hasResults = Object.values(searchResults).some(arr => arr.length > 0);

    if (!hasResults && searchTerm) {
      return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="textSecondary">No results found</Typography>
        </Box>
      );
    }

    return (
      <>
        {searchResults.contacts.length > 0 && (
          <>
            <Typography variant="subtitle2" sx={{ px: 2, py: 1, bgcolor: 'grey.100' }}>
              Contacts
            </Typography>
            <List dense>
              {searchResults.contacts.map(contact => (
                <ListItem
                  key={contact.id}
                  button
                  onClick={() => handleResultClick('contact', contact)}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={contact.name}
                    secondary={contact.email}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        {searchResults.deals.length > 0 && (
          <>
            <Divider />
            <Typography variant="subtitle2" sx={{ px: 2, py: 1, bgcolor: 'grey.100' }}>
              Deals
            </Typography>
            <List dense>
              {searchResults.deals.map(deal => (
                <ListItem
                  key={deal.id}
                  button
                  onClick={() => handleResultClick('deal', deal)}
                >
                  <ListItemIcon>
                    <DealIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={deal.name}
                    secondary={`$${deal.value.toLocaleString()}`}
                  />
                  <Chip
                    label={deal.stage}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        {/* Similar sections for companies and campaigns */}
      </>
    );
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        fullWidth
        placeholder="Search contacts, deals, companies..."
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                searchTerm && (
                  <IconButton size="small" onClick={handleClear}>
                    <ClearIcon />
                  </IconButton>
                )
              )}
            </InputAdornment>
          ),
        }}
      />

      <Popper
        open={Boolean(searchTerm && anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        style={{ width: anchorEl?.offsetWidth }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={3}
              sx={{
                mt: 1,
                maxHeight: '60vh',
                overflow: 'auto',
              }}
            >
              {renderSearchResults()}
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default GlobalSearch; 