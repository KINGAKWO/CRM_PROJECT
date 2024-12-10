import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Badge,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachIcon,
  EmojiEmotions as EmojiIcon,
  Notifications as NotifyIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';

const CollaborationHub = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      content: 'Just updated the sales report for Q1',
      timestamp: new Date('2024-01-15T10:30:00'),
      type: 'message',
      attachments: [],
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      content: 'Great work! I'll review it this afternoon',
      timestamp: new Date('2024-01-15T10:32:00'),
      type: 'message',
      attachments: [],
    },
    {
      id: 3,
      sender: 'System',
      content: 'New deal created: Enterprise Package - Big Corp',
      timestamp: new Date('2024-01-15T11:00:00'),
      type: 'notification',
    },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Review Q1 Sales Report',
      assignedTo: 'Sarah Wilson',
      dueDate: new Date('2024-01-20'),
      status: 'in_progress',
      priority: 'high',
    },
    // Add more tasks
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'Current User',
      content: newMessage,
      timestamp: new Date(),
      type: 'message',
      attachments: [],
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Main Chat and Activity Feed */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={currentTab}
                onChange={(e, newValue) => setCurrentTab(newValue)}
              >
                <Tab label="Team Chat" />
                <Tab label="Activity Feed" />
                <Tab 
                  label={
                    <Badge badgeContent={4} color="error">
                      Notifications
                    </Badge>
                  } 
                />
              </Tabs>
            </Box>

            {/* Messages List */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              <List>
                {messages.map((message) => (
                  <ListItem
                    key={message.id}
                    alignItems="flex-start"
                    sx={{
                      flexDirection: 
                        message.sender === 'Current User' ? 'row-reverse' : 'row',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>{message.sender[0]}</Avatar>
                    </ListItemAvatar>
                    <Box
                      sx={{
                        maxWidth: '70%',
                        bgcolor: message.type === 'notification' ? 'grey.100' : 
                          message.sender === 'Current User' ? 'primary.light' : 'grey.200',
                        borderRadius: 2,
                        p: 2,
                        ml: message.sender === 'Current User' ? 0 : 1,
                        mr: message.sender === 'Current User' ? 1 : 0,
                      }}
                    >
                      <Typography variant="subtitle2" color="textSecondary">
                        {message.sender}
                      </Typography>
                      <Typography>{message.content}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <IconButton>
                    <AttachIcon />
                  </IconButton>
                  <IconButton>
                    <EmojiIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        {/* Tasks and Team Members */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Team Tasks</Typography>
              <IconButton>
                <FilterIcon />
              </IconButton>
            </Box>
            <List>
              {tasks.map((task) => (
                <ListItem
                  key={task.id}
                  secondaryAction={
                    <IconButton edge="end">
                      <MoreIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={task.title}
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Chip
                          label={task.priority}
                          size="small"
                          color={task.priority === 'high' ? 'error' : 'default'}
                        />
                        <Typography variant="caption">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Add Task
            </Button>
          </Card>

          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Online Team Members
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color="success"
                  >
                    <Avatar>JD</Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary="John Doe"
                  secondary="Sales Manager"
                />
              </ListItem>
              {/* Add more team members */}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CollaborationHub; 