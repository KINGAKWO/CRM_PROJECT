import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Download as DownloadIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [dataType, setDataType] = useState('revenue');

  // Mock data - would come from API in real app
  const salesTrends = [
    { month: 'Jan', revenue: 45000, deals: 12, conversion: 68 },
    { month: 'Feb', revenue: 52000, deals: 15, conversion: 72 },
    { month: 'Mar', revenue: 49000, deals: 14, conversion: 65 },
    { month: 'Apr', revenue: 58000, deals: 18, conversion: 75 },
    { month: 'May', revenue: 63000, deals: 20, conversion: 78 },
    { month: 'Jun', revenue: 59000, deals: 17, conversion: 70 },
  ];

  const leadSources = [
    { name: 'Website', value: 35 },
    { name: 'Referral', value: 25 },
    { name: 'Social Media', value: 20 },
    { name: 'Email', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const salesMetrics = {
    totalRevenue: '₹326,000',
    averageDealSize: '₹19,176',
    conversionRate: '71.3%',
    salesCycle: '18 days',
    pipelineValue: '₹845,000',
    activeDeals: 42,
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Analytics Dashboard</Typography>
        <Box>
          <FormControl sx={{ minWidth: 120, mr: 2 }}>
            <Select
              size="small"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="quarter">Last Quarter</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {Object.entries(salesMetrics).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
            <Card sx={{ p: 2 }}>
              <Typography color="textSecondary" variant="caption" sx={{ textTransform: 'uppercase' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Sales Trends */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Sales Trends</Typography>
              <FormControl size="small">
                <Select
                  value={dataType}
                  onChange={(e) => setDataType(e.target.value)}
                >
                  <MenuItem value="revenue">Revenue</MenuItem>
                  <MenuItem value="deals">Deals</MenuItem>
                  <MenuItem value="conversion">Conversion Rate</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={dataType}
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Lead Sources */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Lead Sources
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Sales Pipeline Analysis */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sales Pipeline Analysis
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { stage: 'Lead', count: 100, value: 250000 },
                { stage: 'Meeting', count: 75, value: 200000 },
                { stage: 'Proposal', count: 50, value: 175000 },
                { stage: 'Negotiation', count: 30, value: 150000 },
                { stage: 'Closed', count: 20, value: 70000 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <ChartTooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Number of Deals" />
                <Bar yAxisId="right" dataKey="value" fill="#82ca9d" name="Value (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard; 