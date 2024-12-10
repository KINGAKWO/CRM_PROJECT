import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  CloudDownload as DownloadIcon,
  Description as FileIcon,
  Schedule as ScheduleIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { dataManagementService } from '../../services/dataManagement';

const DataManagement = () => {
  const [exportType, setExportType] = useState('contacts');
  const [exportFormat, setExportFormat] = useState('excel');
  const [importType, setImportType] = useState('contacts');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [scheduledExports, setScheduledExports] = useState([
    { id: 1, type: 'contacts', format: 'excel', frequency: 'weekly' },
    { id: 2, type: 'deals', format: 'csv', frequency: 'monthly' },
  ]);

  const handleExport = async () => {
    try {
      setError(null);
      const data = await api.get(`/${exportType}`);
      
      switch (exportFormat) {
        case 'excel':
          await dataManagementService.export.toExcel(data.data, exportType);
          break;
        case 'csv':
          await dataManagementService.export.toCSV(data.data, exportType);
          break;
        case 'pdf':
          await dataManagementService.export.toPDF(data.data, exportType);
          break;
      }
      
      setSuccess('Export completed successfully');
    } catch (error) {
      setError('Export failed: ' + error.message);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop().toLowerCase();
      let importedData;

      if (fileExt === 'xlsx' || fileExt === 'xls') {
        importedData = await dataManagementService.import.fromExcel(file, importType);
      } else if (fileExt === 'csv') {
        importedData = await dataManagementService.import.fromCSV(file, importType);
      } else {
        throw new Error('Unsupported file format');
      }

      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Send to API
      await api.post(`/${importType}/bulk`, importedData);
      
      setSuccess(`Successfully imported ${importedData.length} records`);
    } catch (error) {
      setError('Import failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Management
      </Typography>

      <Grid container spacing={3}>
        {/* Export Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Export Data
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Data Type</InputLabel>
                  <Select
                    value={exportType}
                    onChange={(e) => setExportType(e.target.value)}
                  >
                    <MenuItem value="contacts">Contacts</MenuItem>
                    <MenuItem value="deals">Deals</MenuItem>
                    <MenuItem value="companies">Companies</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Format</InputLabel>
                  <Select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                  >
                    <MenuItem value="excel">Excel</MenuItem>
                    <MenuItem value="csv">CSV</MenuItem>
                    <MenuItem value="pdf">PDF</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleExport}
              sx={{ mt: 2 }}
              fullWidth
            >
              Export
            </Button>
          </Card>
        </Grid>

        {/* Import Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Import Data
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Data Type</InputLabel>
              <Select
                value={importType}
                onChange={(e) => setImportType(e.target.value)}
              >
                <MenuItem value="contacts">Contacts</MenuItem>
                <MenuItem value="deals">Deals</MenuItem>
                <MenuItem value="companies">Companies</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              component="label"
              startIcon={<UploadIcon />}
              fullWidth
              disabled={uploading}
            >
              Upload File
              <input
                type="file"
                hidden
                accept=".xlsx,.xls,.csv"
                onChange={handleImport}
              />
            </Button>

            {uploading && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="caption" sx={{ mt: 1 }}>
                  Uploading... {progress}%
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>

        {/* Scheduled Exports */}
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Scheduled Exports
            </Typography>
            
            <List>
              {scheduledExports.map((export) => (
                <ListItem
                  key={export.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${export.type} - ${export.format.toUpperCase()}`}
                    secondary={`Frequency: ${export.frequency}`}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Notifications */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </Box>
  );
};

export default DataManagement; 