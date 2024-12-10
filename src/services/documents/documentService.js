import axios from 'axios';
import { saveAs } from 'file-saver';
import securityService from '../security/securityService';

export const documentService = {
  // Document Upload
  upload: async (file, metadata) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('metadata', JSON.stringify(metadata));

      const response = await axios.post('/api/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // Update progress if needed
        },
      });

      return response.data;
    } catch (error) {
      console.error('Document upload failed:', error);
      throw error;
    }
  },

  // Document Retrieval
  get: async (documentId) => {
    try {
      const response = await axios.get(`/api/documents/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('Document retrieval failed:', error);
      throw error;
    }
  },

  // Document Search
  search: async (params) => {
    try {
      const response = await axios.get('/api/documents/search', { params });
      return response.data;
    } catch (error) {
      console.error('Document search failed:', error);
      throw error;
    }
  },

  // Document Download
  download: async (documentId) => {
    try {
      const response = await axios.get(`/api/documents/${documentId}/download`, {
        responseType: 'blob',
      });
      
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'document';
      
      saveAs(response.data, filename);
    } catch (error) {
      console.error('Document download failed:', error);
      throw error;
    }
  },

  // Document Versioning
  versions: {
    create: async (documentId, file) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await axios.post(
          `/api/documents/${documentId}/versions`,
          formData
        );
        return response.data;
      } catch (error) {
        console.error('Version creation failed:', error);
        throw error;
      }
    },

    list: async (documentId) => {
      try {
        const response = await axios.get(`/api/documents/${documentId}/versions`);
        return response.data;
      } catch (error) {
        console.error('Version listing failed:', error);
        throw error;
      }
    },

    restore: async (documentId, versionId) => {
      try {
        const response = await axios.post(
          `/api/documents/${documentId}/versions/${versionId}/restore`
        );
        return response.data;
      } catch (error) {
        console.error('Version restoration failed:', error);
        throw error;
      }
    },
  },

  // Document Sharing
  sharing: {
    share: async (documentId, users, permissions) => {
      try {
        const response = await axios.post(`/api/documents/${documentId}/share`, {
          users,
          permissions,
        });
        return response.data;
      } catch (error) {
        console.error('Document sharing failed:', error);
        throw error;
      }
    },

    getSharedUsers: async (documentId) => {
      try {
        const response = await axios.get(`/api/documents/${documentId}/shared`);
        return response.data;
      } catch (error) {
        console.error('Failed to get shared users:', error);
        throw error;
      }
    },

    revokeAccess: async (documentId, userId) => {
      try {
        await axios.delete(`/api/documents/${documentId}/shared/${userId}`);
      } catch (error) {
        console.error('Failed to revoke access:', error);
        throw error;
      }
    },
  },

  // Document Categories
  categories: {
    list: async () => {
      try {
        const response = await axios.get('/api/documents/categories');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
      }
    },

    create: async (category) => {
      try {
        const response = await axios.post('/api/documents/categories', category);
        return response.data;
      } catch (error) {
        console.error('Category creation failed:', error);
        throw error;
      }
    },
  },

  // Document Tags
  tags: {
    add: async (documentId, tags) => {
      try {
        const response = await axios.post(
          `/api/documents/${documentId}/tags`,
          { tags }
        );
        return response.data;
      } catch (error) {
        console.error('Failed to add tags:', error);
        throw error;
      }
    },

    remove: async (documentId, tag) => {
      try {
        await axios.delete(`/api/documents/${documentId}/tags/${tag}`);
      } catch (error) {
        console.error('Failed to remove tag:', error);
        throw error;
      }
    },
  },

  // Document Preview
  preview: {
    generate: async (documentId) => {
      try {
        const response = await axios.get(
          `/api/documents/${documentId}/preview`,
          { responseType: 'blob' }
        );
        return URL.createObjectURL(response.data);
      } catch (error) {
        console.error('Preview generation failed:', error);
        throw error;
      }
    },
  },
};

export default documentService; 