import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Typography,
  Box,
  Divider,
  SwipeableDrawer,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';

const MobileContactList = ({ contacts }) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {contacts.map((contact) => (
        <React.Fragment key={contact.id}>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <IconButton edge="end">
                <MoreIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar alt={contact.name}>{contact.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={contact.name}
              secondary={
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {contact.company}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton size="small" color="primary">
                      <PhoneIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <EmailIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default MobileContactList; 