import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Menu,
  MenuItem,
  LinearProgress,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Folder as FolderIcon,
  Description as FileIcon,
  MoreVert as MoreIcon,
  Share as ShareIcon,
  GetApp as DownloadIcon,
  History as HistoryIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import documentService from '../../services/documents/documentService';

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [shareDialog, setShareDialog] = useState(false);
  const [versionDialog, setVersionDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFolder, setCurrentFolder] = useState('root');

  useEffect(() => {
    loadDocuments();
  }, [currentFolder, searchTerm]);

  const loadDocuments = async () => {
    try {
      const response = await documentService.search({
        folder: currentFolder,
        query: searchTerm,
      });
      setDocuments(response);
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const handleUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    try {
      const uploadPromises = Array.from(files).map(file => {
        const metadata = {
          name: file.name,
          type: file.type,
          size: file.size,
          folder: currentFolder,
        };
        return documentService.upload(file, metadata);
      });

      await Promise.all(uploadPromises);
      loadDocuments();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleDownload = async (document) => {
    try {
      await documentService.download(document.id);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async (users, permissions) => {
    try {
      await documentService.sharing.share(selectedDoc.id, users, permissions);
      setShareDialog(false);
    } catch (error) {
      console.error('Sharing failed:', error);
    }
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
              component="label"
            >
              Upload Files
              <input
                type="file"
                hidden
                multiple
                onChange={handleUpload}
              />
            </Button>
          </Box>
        </Grid>

        {/* Folder Navigation */}
        <Grid item xs={12} md={3}>
          <Card>
            <List>
              <ListItem button selected={currentFolder === 'root'}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="All Documents" />
              </ListItem>
              {/* Add more folders */}
            </List>
          </Card>
        </Grid>

        {/* Document List */}
        <Grid item xs={12} md={9}>
          <Card>
            <List>
              {documents.map((doc) => (
                <ListItem
                  key={doc.id}
                  button
                  onClick={() => setSelectedDoc(doc)}
                >
                  <ListItemIcon>
                    <FileIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.name}
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography variant="caption">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption">
                          {(doc.size / 1024).toFixed(2)} KB
                        </Typography>
                        {doc.tags.map(tag => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ mr: 0.5 }}
                          />
                        ))}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        setSelectedDoc(doc);
                        setMenuAnchor(e.currentTarget);
                      }}
                    >
                      <MoreIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Document Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => handleDownload(selectedDoc)}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          Download
        </MenuItem>
        <MenuItem onClick={() => setShareDialog(true)}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          Share
        </MenuItem>
        <MenuItem onClick={() => setVersionDialog(true)}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          Versions
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      {/* Share Dialog */}
      {/* Version History Dialog */}
      {/* Upload Progress */}
      {uploadProgress > 0 && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 300,
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Uploading...
          </Typography>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{ mb: 1 }}
          />
          <Typography variant="caption">
            {uploadProgress}% Complete
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DocumentManager; 