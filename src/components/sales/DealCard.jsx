import React from 'react';
import { Paper, Typography, Box, Chip, IconButton, Tooltip } from '@mui/material';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import { formatDistanceToNow } from 'date-fns';

const priorityColors = {
  high: '#ef5350',
  medium: '#ff9800',
  low: '#4caf50',
};

const DealCard = ({ deal, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const dealAge = formatDistanceToNow(new Date(deal.createdAt), { addSuffix: true });

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      sx={{
        p: 2,
        mb: 1,
        cursor: 'grab',
        '&:hover': { backgroundColor: 'action.hover' },
        borderLeft: `4px solid ${priorityColors[deal.priority || 'low']}`,
      }}
      {...attributes}
      {...listeners}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {deal.name}
        </Typography>
        <Box>
          <Tooltip title={`Priority: ${deal.priority || 'low'}`}>
            <FlagIcon sx={{ color: priorityColors[deal.priority || 'low'], mr: 1 }} />
          </Tooltip>
          <IconButton size="small" onClick={() => onEdit(deal)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => onDelete(deal)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
        {deal.company}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Chip 
          label={`$${deal.value.toLocaleString()}`} 
          size="small" 
          color="primary" 
          sx={{ fontWeight: 500 }} 
        />
        <Tooltip title={`Created ${dealAge}`}>
          <Typography variant="caption" color="textSecondary">
            {dealAge}
          </Typography>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default DealCard; 