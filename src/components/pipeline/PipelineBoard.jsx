import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Grid,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@dnd-kit/core';
import {
  MoreVert as MoreIcon,
  Add as AddIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import pipelineService from '../../services/pipeline/pipelineService';

const PipelineBoard = () => {
  const [stages, setStages] = useState([]);
  const [deals, setDeals] = useState({});
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);

  useEffect(() => {
    loadPipelineData();
  }, []);

  const loadPipelineData = async () => {
    try {
      setLoading(true);
      const [stagesData, statsData] = await Promise.all([
        pipelineService.getStages(),
        pipelineService.getStatistics(),
      ]);

      setStages(stagesData);
      setStatistics(statsData);

      // Load deals for each stage
      const dealsData = {};
      await Promise.all(
        stagesData.map(async (stage) => {
          const stageDeals = await pipelineService.getDealsByStage(stage.id);
          dealsData[stage.id] = stageDeals;
        })
      );
      setDeals(dealsData);
    } catch (error) {
      console.error('Failed to load pipeline data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, source, destination } = result;
    const dealId = draggableId;
    const newStageId = destination.droppableId;
    const newPosition = destination.index;

    // Optimistically update UI
    const updatedDeals = { ...deals };
    const deal = updatedDeals[source.droppableId].find(d => d.id === dealId);
    updatedDeals[source.droppableId] = updatedDeals[source.droppableId]
      .filter(d => d.id !== dealId);
    updatedDeals[destination.droppableId] = [
      ...updatedDeals[destination.droppableId].slice(0, newPosition),
      deal,
      ...updatedDeals[destination.droppableId].slice(newPosition),
    ];
    setDeals(updatedDeals);

    try {
      await pipelineService.updateDealStage(dealId, newStageId, newPosition);
    } catch (error) {
      console.error('Failed to update deal stage:', error);
      // Revert changes on error
      loadPipelineData();
    }
  };

  const calculateStageValue = (stageDeals) => {
    return stageDeals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const getStageProgress = (stageId) => {
    const stageDeals = deals[stageId] || [];
    const totalDeals = Object.values(deals).flat().length;
    return totalDeals ? (stageDeals.length / totalDeals) * 100 : 0;
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Pipeline Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Sales Pipeline
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Pipeline Value
                </Typography>
                <Typography variant="h4">
                  ${statistics?.totalValue.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Average Deal Size
                </Typography>
                <Typography variant="h4">
                  ${statistics?.avgDealSize.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Win Rate
                </Typography>
                <Typography variant="h4">
                  {statistics?.winRate}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Pipeline Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
          {stages.map((stage) => (
            <Box
              key={stage.id}
              sx={{ minWidth: 300, maxWidth: 300 }}
            >
              <Card sx={{ mb: 2 }}>
                <Box sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <Typography variant="h6">
                    {stage.name}
                  </Typography>
                  <Typography variant="caption" display="block">
                    {deals[stage.id]?.length || 0} Deals • $
                    {calculateStageValue(deals[stage.id] || []).toLocaleString()}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={getStageProgress(stage.id)}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Card>

              <Droppable droppableId={stage.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ minHeight: 500 }}
                  >
                    {deals[stage.id]?.map((deal, index) => (
                      <Draggable
                        key={deal.id}
                        draggableId={deal.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ mb: 2 }}
                          >
                            <CardContent>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1">
                                  {deal.name}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    setSelectedDeal(deal);
                                    setMenuAnchor(e.currentTarget);
                                  }}
                                >
                                  <MoreIcon />
                                </IconButton>
                              </Box>
                              <Box sx={{ mt: 1 }}>
                                <Chip
                                  icon={<MoneyIcon />}
                                  label={`$${deal.value.toLocaleString()}`}
                                  size="small"
                                  sx={{ mr: 1 }}
                                />
                                <Chip
                                  icon={<TimeIcon />}
                                  label={new Date(deal.expectedCloseDate).toLocaleDateString()}
                                  size="small"
                                />
                              </Box>
                              <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" color="textSecondary">
                                  {deal.company}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          ))}
        </Box>
      </DragDropContext>

      {/* Deal Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem>View Details</MenuItem>
        <MenuItem>Edit Deal</MenuItem>
        <MenuItem>Add Note</MenuItem>
        <MenuItem>Schedule Follow-up</MenuItem>
        <MenuItem sx={{ color: 'error.main' }}>Delete Deal</MenuItem>
      </Menu>
    </Box>
  );
};

export default PipelineBoard; 