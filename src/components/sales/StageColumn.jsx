import React from 'react';
import { Card, CardHeader, CardContent, Typography, Box } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const stageColors = {
  'Lead': '#e3f2fd',
  'Meeting Scheduled': '#f3e5f5',
  'Proposal Sent': '#e8f5e9',
  'Negotiation': '#fff3e0',
  'Closed Won': '#e8eaf6',
};

const StageColumn = ({ stage, deals = [], children }) => {
  const totalValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0);
  const avgDealSize = deals.length ? totalValue / deals.length : 0;

  return (
    <Card sx={{ backgroundColor: stageColors[stage] }}>
      <CardHeader
        title={stage}
        titleTypographyProps={{ variant: 'h6' }}
        sx={{ pb: 1 }}
        action={
          <Typography color="textSecondary" variant="caption">
            {deals.length} deals
          </Typography>
        }
      />
      <Box sx={{ px: 2, pb: 1 }}>
        <Typography variant="caption" color="textSecondary">
          Total Value: ${totalValue.toLocaleString()}
        </Typography>
        <br />
        <Typography variant="caption" color="textSecondary">
          Avg Deal: ${avgDealSize.toLocaleString()}
        </Typography>
      </Box>
      <CardContent sx={{ pt: 1 }}>
        <SortableContext
          items={deals.map(d => d.id)}
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>
      </CardContent>
    </Card>
  );
};

export default StageColumn; 