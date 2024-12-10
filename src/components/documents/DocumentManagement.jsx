import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Breadcrumbs,
  Link,
  Chip,
} from '@mui/material';
import {
  Description as DocIcon,
  Folder as FolderIcon,
  Upload as UploadIcon,
  MoreVert as MoreIcon,
  Share as ShareIcon,
  GetApp as DownloadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Contract_2024.pdf',
      type: 'pdf',
      size: '2.5MB',
      folder: 'Contracts',
      uploadedBy: 'John Doe',
      uploadedAt: new Date('2024-01-15'),
      tags: ['contract', 'legal'],
      shared: ['Sarah Wilson', 'Mike Johnson'],
    },
    // Add more mock documents
  ]);

  const [currentFolder, setCurrentFolder] = useState('Root');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);

  const handleDocumentMenu = (event, doc) => {
    setSelectedDoc(doc);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpload = () => {
    setUploadDialog(true);
  };

  const handleShare = () => {
    setShareDialog(true);
    handleMenuClose();
  };

  const handleDownload = () => {
    // Implement download logic
    console.log('Downloading:', selectedDoc.name);
    handleMenuClose();
  };

  const getFileIcon = (type) => {
    // Add more file type icons as needed
    const icons = {
      pdf: '📄',
      doc: '📝',
      xls: '📊',
      jpg: '🖼️',
      folder: '📁',
    };
    return icons[type] || '📄';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Document Management</Typography>
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              onClick={handleUpload}
            >
              Upload Document
            </Button>
          </Box>
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link
              component="button"
              variant="body1"
              onClick={() => setCurrentFolder('Root')}
            >
              Documents
            </Link>
            {currentFolder !== 'Root' && (
              <Typography color="text.primary">{currentFolder}</Typography>
            )}
          </Breadcrumbs>
        </Grid>

        {/* Folders and Files */}
        <Grid item xs={12} md={9}>
          <Card>
            <List>
              {documents.map((doc) => (
                <ListItem
                  key={doc.id}
                  secondaryAction={
                    <IconButton onClick={(e) => handleDocumentMenu(e, doc)}>
                      <MoreIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>{getFileIcon(doc.type)}</ListItemIcon>
                  <ListItemText
                    primary={doc.name}
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Typography variant="caption">{doc.size}</Typography>
                        •
                        <Typography variant="caption">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </Typography>
                        {doc.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        ))}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Document Info */}
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Storage Overview
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Total Documents"
                  secondary={documents.length}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Total Size" secondary="125MB" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Folders" secondary="8" />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Document Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleShare}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          Share
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          Download
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Rename
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      {/* Upload Dialog */}
      <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Button variant="outlined" component="label" fullWidth>
              Choose File
              <input type="file" hidden />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialog} onClose={() => setShareDialog(false)}>
        <DialogTitle>Share Document</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email addresses"
            placeholder="Enter email addresses separated by commas"
            multiline
            rows={3}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentManagement;
