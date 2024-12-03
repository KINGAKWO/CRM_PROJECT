import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
} from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const salesData = [
  { month: 'Jan', sales: 4000, leads: 2400 },
  { month: 'Feb', sales: 3000, leads: 1398 },
  { month: 'Mar', sales: 2000, leads: 9800 },
  { month: 'Apr', sales: 2780, leads: 3908 },
  { month: 'May', sales: 1890, leads: 4800 },
  { month: 'Jun', sales: 2390, leads: 3800 },
];

const leadSourceData = [
  { name: 'Website', value: 400 },
  { name: 'Referral', value: 300 },
  { name: 'Social', value: 300 },
  { name: 'Direct', value: 200 },
];

const conversionData = [
  { stage: 'Lead', count: 100 },
  { stage: 'Meeting', count: 75 },
  { stage: 'Proposal', count: 50 },
  { stage: 'Negotiation', count: 30 },
  { stage: 'Closed', count: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportsDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Sales & Leads Trend */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Sales & Leads Trend" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Lead Sources */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Lead Sources" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Pipeline Conversion */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Sales Pipeline Conversion" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
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

export default ReportsDashboard; 