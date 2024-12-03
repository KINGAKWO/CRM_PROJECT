import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DealCard from './DealCard';
import DealForm from './DealForm';

const stages = ['Lead', 'Meeting Scheduled', 'Proposal Sent', 'Negotiation', 'Closed Won'];

const initialDeals = {
  'Lead': [
    { id: 1, name: 'Software License Deal', value: 15000, company: 'Tech Corp', stage: 'Lead', updatedAt: new Date() },
    { id: 2, name: 'Consulting Project', value: 8000, company: 'Innovation Inc', stage: 'Lead', updatedAt: new Date() },
  ],
  'Meeting Scheduled': [
    { id: 3, name: 'Enterprise Package', value: 45000, company: 'Big Corp', stage: 'Meeting Scheduled', updatedAt: new Date() },
  ],
  // ... add more deals for other stages
};

const SalesPage = () => {
  const [deals, setDeals] = useState(initialDeals);
  const [formOpen, setFormOpen] = useState(false);
  const [editDeal, setEditDeal] = useState(null);
  const [activeDeal, setActiveDeal] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveDeal(findDeal(active.id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeDeal = findDeal(active.id);
    const overStage = over.id;

    if (activeDeal.stage !== overStage) {
      moveDealToStage(active.id, activeDeal.stage, overStage);
    }
  };

  const findDeal = (id) => {
    for (const [stage, stageDeals] of Object.entries(deals)) {
      const deal = stageDeals.find(d => d.id === id);
      if (deal) return { ...deal, stage };
    }
  };

  const moveDealToStage = (dealId, fromStage, toStage) => {
    setDeals(prev => {
      const deal = prev[fromStage].find(d => d.id === dealId);
      const updatedDeal = { ...deal, stage: toStage, updatedAt: new Date() };
      
      return {
        ...prev,
        [fromStage]: prev[fromStage].filter(d => d.id !== dealId),
        [toStage]: [...prev[toStage], updatedDeal],
      };
    });
  };

  const handleAddDeal = (values) => {
    const newDeal = {
      id: Math.max(0, ...Object.values(deals).flat().map(d => d.id)) + 1,
      ...values,
      updatedAt: new Date(),
    };

    setDeals(prev => ({
      ...prev,
      [values.stage]: [...prev[values.stage], newDeal],
    }));

    showSnackbar('Deal added successfully');
  };

  const handleEditDeal = (deal) => {
    setEditDeal(deal);
    setFormOpen(true);
  };

  const handleDeleteDeal = (deal) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      setDeals(prev => ({
        ...prev,
        [deal.stage]: prev[deal.stage].filter(d => d.id !== deal.id),
      }));
      showSnackbar('Deal deleted successfully');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Sales Pipeline</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditDeal(null);
            setFormOpen(true);
          }}
        >
          Add Deal
        </Button>
      </Box>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Grid container spacing={2}>
          {stages.map((stage) => (
            <Grid item xs={12} sm={6} md={2.4} key={stage}>
              <Card>
                <CardHeader
                  title={stage}
                  titleTypographyProps={{ variant: 'h6' }}
                  sx={{ pb: 1 }}
                  action={
                    <Typography color="textSecondary" variant="caption">
                      {deals[stage]?.length || 0}
                    </Typography>
                  }
                />
                <CardContent sx={{ pt: 1 }}>
                  <SortableContext
                    items={deals[stage]?.map(d => d.id) || []}
                    strategy={verticalListSortingStrategy}
                  >
                    {deals[stage]?.map((deal) => (
                      <DealCard
                        key={deal.id}
                        deal={deal}
                        onEdit={() => handleEditDeal(deal)}
                        onDelete={() => handleDeleteDeal(deal)}
                      />
                    ))}
                  </SortableContext>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <DragOverlay>
          {activeDeal ? <DealCard deal={activeDeal} /> : null}
        </DragOverlay>
      </DndContext>

      <DealForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditDeal(null);
        }}
        onSubmit={handleAddDeal}
        initialValues={editDeal}
        mode={editDeal ? 'edit' : 'add'}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SalesPage; 