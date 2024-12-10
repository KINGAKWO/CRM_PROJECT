import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
import { reportingService } from '../../services/reports/reportingService';

const EnhancedAnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('30days');
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    salesData: [],
    pipelineData: {},
    performanceMetrics: {},
  });

  useEffect(() => {
    loadAnalytics();
  }, [timeframe]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const [sales, pipeline, performance] = await Promise.all([
        reportingService.getSalesAnalytics(timeframe),
        reportingService.getPipelineAnalytics(),
        reportingService.getPerformanceMetrics({ timeframe }),
      ]);

      setAnalytics({
        salesData: sales,
        pipelineData: pipeline,
        performanceMetrics: performance,
      });
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const reportData = await reportingService.exportReport('analytics', format);
      // Handle the exported file
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Analytics Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small">
            <Select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <MenuItem value="7days">Last 7 Days</MenuItem>
              <MenuItem value="30days">Last 30 Days</MenuItem>
              <MenuItem value="90days">Last Quarter</MenuItem>
              <MenuItem value="1year">Last Year</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport('excel')}
          >
            Export Report
          </Button>
          <IconButton onClick={loadAnalytics}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {Object.entries(analytics.performanceMetrics).map(([key, value]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {key.replace(/_/g, ' ').toUpperCase()}
                    </Typography>
                    <Typography variant="h4">
                      {typeof value === 'number' ? value.toLocaleString() : value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Sales Trend */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardHeader
              title="Sales Trend"
              action={
                <Tooltip title="Shows sales performance over time">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <CardContent>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer>
                  <AreaChart data={analytics.salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pipeline Distribution */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader title="Pipeline Distribution" />
            <CardContent>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={analytics.pipelineData.distribution}
                      dataKey="value"
                      nameKey="stage"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      label
                    >
                      {analytics.pipelineData.distribution?.map((entry, index) => (
                        <Cell key={index} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Conversion Rates */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Stage Conversion Rates" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={analytics.pipelineData.conversions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <ChartTooltip />
                    <Legend />
                    <Bar dataKey="rate" fill="#8884d8" name="Conversion Rate" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnhancedAnalyticsDashboard; 