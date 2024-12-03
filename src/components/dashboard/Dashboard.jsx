import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  CardHeader,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import TaskIcon from '@mui/icons-material/Assignment';
import SalesChart from './charts/SalesChart';
import ConversionChart from './charts/ConversionChart';
import ActivityFeed from './ActivityFeed';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiCardHeader-root': {
    paddingBottom: 0,
  },
  '& .MuiCardContent-root': {
    paddingTop: theme.spacing(1),
  },
}));

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      height: '100%',
    }}
  >
    <Box
      sx={{
        p: 1.5,
        borderRadius: 2,
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h6">
        {value}
      </Typography>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Sales',
      value: '$24,780',
      icon: <TrendingUpIcon />,
      color: '#2196f3',
    },
    {
      title: 'Active Customers',
      value: '573',
      icon: <PeopleIcon />,
      color: '#4caf50',
    },
    {
      title: 'Email Campaigns',
      value: '12',
      icon: <EmailIcon />,
      color: '#ff9800',
    },
    {
      title: 'Pending Tasks',
      value: '8',
      icon: <TaskIcon />,
      color: '#f44336',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Charts and Tables */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardHeader
              title="Sales Overview"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <SalesChart />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardHeader
              title="Conversion Rates"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ConversionChart />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardHeader
              title="Recent Activities"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <ActivityFeed />
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 