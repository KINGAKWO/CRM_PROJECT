import React, { useState } from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  SwipeableDrawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as ContactsIcon,
  Business as CompanyIcon,
  AttachMoney as DealsIcon,
  Campaign as MarketingIcon,
  Add as AddIcon,
  Notifications as NotifyIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigationItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { label: 'Contacts', icon: <ContactsIcon />, path: '/contacts' },
    { label: 'Companies', icon: <CompanyIcon />, path: '/companies' },
    { label: 'Deals', icon: <DealsIcon />, path: '/deals' },
    { label: 'Marketing', icon: <MarketingIcon />, path: '/marketing' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleQuickAction = () => {
    // Implement quick action menu
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: 7,
          mb: 7,
          overflowY: 'auto',
          height: '100%',
        }}
      >
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
        onClick={handleQuickAction}
      >
        <AddIcon />
      </Fab>

      {/* Bottom Navigation */}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(navigationItems[newValue].path);
        }}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {navigationItems.slice(0, 5).map((item, index) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>

      {/* Side Menu */}
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
        <List sx={{ width: 250 }}>
          {navigationItems.map((item) => (
            <ListItem
              button
              key={item.label}
              onClick={() => handleNavigation(item.path)}
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

export default MobileLayout; 