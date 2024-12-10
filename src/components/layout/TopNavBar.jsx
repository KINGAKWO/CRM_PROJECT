import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Box,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMediaQuery } from '@mui/material';
import { auth } from '../../services/auth';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const TopNavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      handleMenuClose();
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      flex: 1,
      flexDirection: { xs: 'column', sm: 'row' },
      gap: { xs: 1, sm: 0 }
    }}>
      {!isMobile && (
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      )}
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        ml: { xs: 0, sm: 'auto' },
        width: { xs: '100%', sm: 'auto' }
      }}>
        <Tooltip title="Notifications">
          <IconButton color="inherit" size={isMobile ? "small" : "medium"}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Settings">
          <IconButton color="inherit" size={isMobile ? "small" : "medium"}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Profile">
          <IconButton
            onClick={handleProfileMenuOpen}
            color="inherit"
            size={isMobile ? "small" : "medium"}
          >
            <Avatar sx={{ width: isMobile ? 24 : 32, height: isMobile ? 24 : 32 }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default TopNavBar; 