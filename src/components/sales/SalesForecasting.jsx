import React from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SalesForecasting = () => {
  // Mock historical data
  const historicalData = [
    { month: 'Jan', actual: 45000, forecast: 42000 },
    { month: 'Feb', actual: 52000, forecast: 48000 },
    { month: 'Mar', actual: 49000, forecast: 51000 },
    { month: 'Apr', actual: 58000, forecast: 55000 },
    { month: 'May', actual: 63000, forecast: 60000 },
    { month: 'Jun', actual: 59000, forecast: 62000 },
    // Future months only have forecast
    { month: 'Jul', forecast: 65000 },
    { month: 'Aug', forecast: 68000 },
    { month: 'Sep', forecast: 71000 },
  ];

  // Calculate metrics
  const calculateMetrics = () => {
    const completedMonths = historicalData.filter(d => d.actual);
    const totalActual = completedMonths.reduce((sum, d) => sum + d.actual, 0);
    const totalForecast = completedMonths.reduce((sum, d) => sum + d.forecast, 0);
    const accuracy = (totalActual / totalForecast) * 100;

    return {
      accuracy,
      trend: totalActual > totalForecast ? 'up' : 'down',
      averageMonthly: totalActual / completedMonths.length,
    };
  };

  const metrics = calculateMetrics();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sales Forecasting
      </Typography>

      <Grid container spacing={3}>
        {/* Forecast Controls */}
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Forecast Period</InputLabel>
              <Select defaultValue="3">
                <MenuItem value="3">3 Months</MenuItem>
                <MenuItem value="6">6 Months</MenuItem>
                <MenuItem value="12">12 Months</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Forecast Model</InputLabel>
              <Select defaultValue="linear">
                <MenuItem value="linear">Linear Regression</MenuItem>
                <MenuItem value="moving">Moving Average</MenuItem>
                <MenuItem value="weighted">Weighted Average</MenuItem>
              </Select>
            </FormControl>
          </Card>
        </Grid>

        {/* Forecast Metrics */}
        <Grid item xs={12} md={9}>
          <Card sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography color="textSecondary">Forecast Accuracy</Typography>
                <Typography variant="h4">
                  {metrics.accuracy.toFixed(1)}%
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="textSecondary">Monthly Average</Typography>
                <Typography variant="h4">
                  ${Math.round(metrics.averageMonthly).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="textSecondary">Trend</Typography>
                <Typography variant="h4" color={metrics.trend === 'up' ? 'success.main' : 'error.main'}>
                  {metrics.trend === 'up' ? '↑' : '↓'}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Forecast Chart */}
        <Grid item xs={12}>
          <Card sx={{ p: 2, height: 400 }}>
            <ResponsiveContainer>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesForecasting; 