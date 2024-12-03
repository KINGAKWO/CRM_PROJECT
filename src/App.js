import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/dashboard/Dashboard';
import ContactsPage from './components/contacts/ContactsPage';
import MarketingPage from './components/marketing/MarketingPage';
import SalesPage from './components/sales/SalesPage';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ReportsDashboard from './components/reports/ReportsDashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/marketing" element={<MarketingPage />} />
                    <Route path="/sales" element={<SalesPage />} />
                    <Route path="/reports" element={<ReportsDashboard />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 