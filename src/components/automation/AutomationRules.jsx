import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const AutomationRules = () => {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: 'New Lead Follow-up',
      trigger: 'new_lead',
      actions: ['send_email', 'create_task'],
      conditions: { leadScore: 'above_50' },
      active: true,
    },
    {
      id: 2,
      name: 'Deal Stage Update',
      trigger: 'deal_stage_change',
      actions: ['notify_team', 'schedule_meeting'],
      conditions: { stage: 'negotiation' },
      active: true,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  const triggers = [
    { value: 'new_lead', label: 'New Lead Created' },
    { value: 'deal_stage_change', label: 'Deal Stage Changed' },
    { value: 'task_completed', label: 'Task Completed' },
    { value: 'email_opened', label: 'Email Opened' },
  ];

  const actions = [
    { value: 'send_email', label: 'Send Email' },
    { value: 'create_task', label: 'Create Task' },
    { value: 'notify_team', label: 'Notify Team' },
    { value: 'schedule_meeting', label: 'Schedule Meeting' },
  ];

  const handleAddRule = () => {
    setSelectedRule(null);
    setOpenDialog(true);
  };

  const handleEditRule = (rule) => {
    setSelectedRule(rule);
    setOpenDialog(true);
  };

  const handleSaveRule = (rule) => {
    if (selectedRule) {
      setRules(rules.map(r => r.id === selectedRule.id ? rule : r));
    } else {
      setRules([...rules, { ...rule, id: rules.length + 1 }]);
    }
    setOpenDialog(false);
  };

  const handleToggleRule = (ruleId) => {
    setRules(rules.map(rule =>
      rule.id === ruleId ? { ...rule, active: !rule.active } : rule
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Automation Rules</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRule}
        >
          Add Rule
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <List>
              {rules.map((rule) => (
                <ListItem key={rule.id} divider>
                  <ListItemText
                    primary={rule.name}
                    secondary={`Trigger: ${rule.trigger} | Actions: ${rule.actions.join(', ')}`}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={rule.active}
                      onChange={() => handleToggleRule(rule.id)}
                    />
                    <IconButton onClick={() => handleEditRule(rule)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Automation Statistics
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Active Rules"
                  secondary={rules.filter(r => r.active).length}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Total Automations Run"
                  secondary="1,234"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Success Rate"
                  secondary="98.5%"
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedRule ? 'Edit Automation Rule' : 'New Automation Rule'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Rule Name"
                defaultValue={selectedRule?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Trigger</InputLabel>
                <Select defaultValue={selectedRule?.trigger || ''}>
                  {triggers.map(trigger => (
                    <MenuItem key={trigger.value} value={trigger.value}>
                      {trigger.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Actions</InputLabel>
                <Select
                  multiple
                  defaultValue={selectedRule?.actions || []}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {actions.map(action => (
                    <MenuItem key={action.value} value={action.value}>
                      {action.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Save Rule
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AutomationRules; 