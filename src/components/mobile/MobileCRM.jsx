import React, { useState } from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Fab,
  Badge,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as ContactsIcon,
  ShowChart as SalesIcon,
  Campaign as MarketingIcon,
  Add as AddIcon,
  Menu as MenuIcon,
  Notifications as NotifyIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileCRM = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { label: 'Contacts', icon: <ContactsIcon />, path: '/contacts' },
    { label: 'Sales', icon: <SalesIcon />, path: '/sales' },
    { label: 'Marketing', icon: <MarketingIcon />, path: '/marketing' },
  ];

  return (
    <Box sx={{ pb: 7 }}>
      {/* Mobile App Bar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CRM Mobile
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotifyIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ mt: 8, mb: 7, p: 2 }}>
        {children}
      </Box>

      {/* Quick Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>

      {/* Bottom Navigation */}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(menuItems[newValue].path);
        }}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {menuItems.map((item, index) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>

      {/* Side Menu */}
      <SwipeableDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </Box>
  );
};

export default MobileCRM; 