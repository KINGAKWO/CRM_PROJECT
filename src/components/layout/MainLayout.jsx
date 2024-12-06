import React, { useState, useEffect } from 'react';
import { Box, Drawer, AppBar, Toolbar, Typography, List, IconButton, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SidebarItem from './SidebarItem';
import TopNavBar from './TopNavBar';
import Footer from './Footer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;
const collapsedWidth = 73;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  ...(open && {
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Contacts', icon: <PeopleIcon />, path: '/contacts' },
    { text: 'Marketing', icon: <CampaignIcon />, path: '/marketing' },
    { text: 'Sales', icon: <ShowChartIcon />, path: '/sales' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: open && !isMobile ? `calc(100% - ${drawerWidth}px)` : '100%',
          ml: open && !isMobile ? `${drawerWidth}px` : 0,
          transition: theme => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            CRM Dashboard
          </Typography>
          <TopNavBar />
        </Toolbar>
      </AppBar>
      
      {isMobile ? (
        <SwipeableDrawer
          variant="temporary"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <List>
            {menuItems.map((item) => (
              <SidebarItem
                key={item.text}
                icon={item.icon}
                text={item.text}
                path={item.path}
                open={true}
                onClick={() => isMobile && setOpen(false)}
              />
            ))}
          </List>
        </SwipeableDrawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : collapsedWidth,
              boxSizing: 'border-box',
              overflowX: 'hidden',
              transition: theme => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          <Toolbar />
          <List>
            {menuItems.map((item) => (
              <SidebarItem
                key={item.text}
                icon={item.icon}
                text={item.text}
                path={item.path}
                open={open}
              />
            ))}
          </List>
        </Drawer>
      )}
      
      <Main open={open && !isMobile}>
        <Toolbar />
        <Outlet />
        <Footer />
      </Main>
    </Box>
  );
};

export default MainLayout; 