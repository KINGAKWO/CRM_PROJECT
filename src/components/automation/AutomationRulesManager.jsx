import React, { useState, useEffect } from 'react';
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
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as RunIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { automationService } from '../../services/automation/automationService';

const AutomationRulesManager = () => {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [triggers, setTriggers] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [rulesData, triggersData, actionsData] = await Promise.all([
        automationService.rules.getAll(),
        automationService.triggers.getAvailable(),
        automationService.actions.getAvailable(),
      ]);
      setRules(rulesData);
      setTriggers(triggersData);
      setActions(actionsData);
    } catch (error) {
      setError('Failed to load automation data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRule = async (ruleId, enabled) => {
    try {
      await automationService.rules.toggle(ruleId, enabled);
      setRules(rules.map(rule =>
        rule.id === ruleId ? { ...rule, enabled } : rule
      ));
    } catch (error) {
      setError('Failed to toggle rule');
    }
  };

  const handleSaveRule = async (ruleData) => {
    try {
      if (selectedRule) {
        await automationService.rules.update(selectedRule.id, ruleData);
      } else {
        await automationService.rules.create(ruleData);
      }
      loadData();
      setFormOpen(false);
    } catch (error) {
      setError('Failed to save rule');
    }
  };

  const handleDeleteRule = async (ruleId) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      try {
        await automationService.rules.delete(ruleId);
        setRules(rules.filter(rule => rule.id !== ruleId));
      } catch (error) {
        setError('Failed to delete rule');
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Automation Rules</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedRule(null);
            setFormOpen(true);
          }}
        >
          Create Rule
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Active Rules */}
        <Grid item xs={12} md={8}>
          <Card>
            <List>
              {rules.map((rule) => (
                <ListItem key={rule.id}>
                  <ListItemText
                    primary={rule.name}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Trigger: {rule.trigger}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Actions: {rule.actions.join(', ')}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={rule.enabled}
                      onChange={(e) => handleToggleRule(rule.id, e.target.checked)}
                    />
                    <IconButton onClick={() => {
                      setSelectedRule(rule);
                      setFormOpen(true);
                    }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Rule Statistics */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Automation Statistics
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Active Rules"
                  secondary={rules.filter(r => r.enabled).length}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Total Executions"
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

      {/* Rule Form Dialog */}
      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedRule ? 'Edit Automation Rule' : 'Create Automation Rule'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
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
                      <MenuItem key={trigger.id} value={trigger.id}>
                        {trigger.name}
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
                  >
                    {actions.map(action => (
                      <MenuItem key={action.id} value={action.id}>
                        {action.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Conditions (JSON)"
                  defaultValue={selectedRule?.conditions ? JSON.stringify(selectedRule.conditions, null, 2) : ''}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            {selectedRule ? 'Update Rule' : 'Create Rule'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AutomationRulesManager; 