import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Info as InfoIcon,
  GetApp as ExportIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { analyticsService } from '../../services/analytics/analyticsService';

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    trends: [],
    predictions: [],
    insights: [],
  });

  // Fetch analytics data
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // API calls would go here
      const trends = await fetchTrendData(timeRange);
      const predictions = await generatePredictions(trends);
      const insights = await analyzePatterns(trends);
      
      setAnalyticsData({ trends, predictions, insights });
    } catch (error) {
      console.error('Analytics fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  // Key Performance Indicators
  const kpis = [
    {
      label: 'Revenue Growth',
      value: '+15.8%',
      trend: 'up',
      insight: 'Consistent growth over last 3 months',
    },
    {
      label: 'Customer Acquisition Cost',
      value: '-12.3%',
      trend: 'down',
      insight: 'Improved marketing efficiency',
    },
    {
      label: 'Customer Lifetime Value',
      value: '+23.5%',
      trend: 'up',
      insight: 'Higher customer retention',
    },
    {
      label: 'Conversion Rate',
      value: '+8.7%',
      trend: 'up',
      insight: 'Better qualified leads',
    },
  ];

  // Pattern Analysis
  const patterns = [
    {
      type: 'Seasonal Trend',
      description: 'Sales peak during end of quarters',
      confidence: 89,
      impact: 'High',
    },
    {
      type: 'Customer Behavior',
      description: 'Higher engagement on Wednesdays',
      confidence: 75,
      impact: 'Medium',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Advanced Analytics</Typography>
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
            startIcon={<ExportIcon />}
          >
            Export Analysis
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        {kpis.map((kpi) => (
          <Grid item xs={12} sm={6} md={3} key={kpi.label}>
            <Card sx={{ p: 2 }}>
              <Typography color="textSecondary" variant="subtitle2">
                {kpi.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="h4" sx={{ mr: 1 }}>
                  {kpi.value}
                </Typography>
                {kpi.trend === 'up' ? (
                  <TrendingUp color="success" />
                ) : (
                  <TrendingDown color="error" />
                )}
              </Box>
              <Typography variant="caption" color="textSecondary">
                {kpi.insight}
              </Typography>
            </Card>
          </Grid>
        ))}

        {/* Trend Analysis */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Trend Analysis
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={analyticsData.trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Pattern Recognition */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Pattern Recognition
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pattern</TableCell>
                  <TableCell align="right">Confidence</TableCell>
                  <TableCell align="right">Impact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patterns.map((pattern) => (
                  <TableRow key={pattern.type}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {pattern.type}
                        <Tooltip title={pattern.description}>
                          <IconButton size="small">
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{pattern.confidence}%</TableCell>
                    <TableCell align="right">{pattern.impact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvancedAnalytics; 