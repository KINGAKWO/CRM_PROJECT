import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TaskIcon from '@mui/icons-material/Assignment';

const activities = [
  {
    id: 1,
    type: 'sale',
    title: 'New sale',
    description: 'New order #2834 from John Doe',
    time: '5 minutes ago',
    icon: <ShoppingCartIcon />,
    color: '#2196f3',
  },
  {
    id: 2,
    type: 'lead',
    title: 'New lead',
    description: 'Sarah Smith subscribed to newsletter',
    time: '2 hours ago',
    icon: <PersonAddIcon />,
    color: '#4caf50',
  },
  {
    id: 3,
    type: 'email',
    title: 'Email campaign',
    description: 'Monthly newsletter sent',
    time: '1 day ago',
    icon: <EmailIcon />,
    color: '#ff9800',
  },
  {
    id: 4,
    type: 'task',
    title: 'Task completed',
    description: 'Follow-up with clients done',
    time: '2 days ago',
    icon: <TaskIcon />,
    color: '#f44336',
  },
];

const ActivityFeed = () => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {activities.map((activity, index) => (
        <React.Fragment key={activity.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: `${activity.color}15`, color: activity.color }}>
                {activity.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={activity.title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'block' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {activity.description}
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    {activity.time}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {index < activities.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default ActivityFeed; 