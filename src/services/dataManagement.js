import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { api } from './api';

export const dataManagementService = {
  export: {
    // Export to Excel
    toExcel: async (data, type) => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(type);

      // Define columns based on data type
      switch (type) {
        case 'contacts':
          worksheet.columns = [
            { header: 'Name', key: 'name' },
            { header: 'Email', key: 'email' },
            { header: 'Phone', key: 'phone' },
            { header: 'Company', key: 'company' },
            { header: 'Status', key: 'status' },
            { header: 'Created Date', key: 'createdAt' },
          ];
          break;
        case 'deals':
          worksheet.columns = [
            { header: 'Deal Name', key: 'name' },
            { header: 'Value', key: 'value' },
            { header: 'Stage', key: 'stage' },
            { header: 'Owner', key: 'owner' },
            { header: 'Expected Close Date', key: 'closeDate' },
          ];
          break;
        // Add more cases for other data types
      }

      // Add data rows
      worksheet.addRows(data);

      // Generate buffer
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      saveAs(blob, `${type}_export_${new Date().toISOString()}.xlsx`);
    },

    // Export to CSV
    toCSV: async (data, type) => {
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(item => Object.values(item).join(','));
      const csv = [headers, ...rows].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${type}_export_${new Date().toISOString()}.csv`);
    },

    // Export to PDF
    toPDF: async (data, type) => {
      // Implement PDF export logic
      const response = await api.post('/export/pdf', { data, type });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, `${type}_export_${new Date().toISOString()}.pdf`);
    },
  },

  import: {
    // Import from Excel
    fromExcel: async (file, type) => {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file);
      const worksheet = workbook.getWorksheet(1);
      const data = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          rowData[worksheet.getRow(1).getCell(colNumber).value] = cell.value;
        });
        data.push(rowData);
      });

      return await validateAndProcessImport(data, type);
    },

    // Import from CSV
    fromCSV: async (file, type) => {
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].split(',');
      const data = rows.slice(1).map(row => {
        const values = row.split(',');
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header.trim()] = values[index]?.trim();
        });
        return rowData;
      });

      return await validateAndProcessImport(data, type);
    },
  },

  // Validation and deduplication
  validateAndProcessImport: async (data, type) => {
    // Validate data structure
    const validationErrors = [];
    const requiredFields = getRequiredFields(type);
    
    data.forEach((item, index) => {
      requiredFields.forEach(field => {
        if (!item[field]) {
          validationErrors.push(`Row ${index + 1}: Missing ${field}`);
        }
      });
    });

    if (validationErrors.length > 0) {
      throw new Error('Validation failed:\n' + validationErrors.join('\n'));
    }

    // Deduplicate data
    const existingData = await api.get(`/${type}`);
    const uniqueData = data.filter(item => {
      return !existingData.data.some(existing => 
        existing.email === item.email || existing.phone === item.phone
      );
    });

    return uniqueData;
  },

  // Helper functions
  getRequiredFields: (type) => {
    switch (type) {
      case 'contacts':
        return ['name', 'email'];
      case 'deals':
        return ['name', 'value', 'stage'];
      default:
        return [];
    }
  },
}; 