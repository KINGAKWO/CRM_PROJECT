import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { SecurityMiddleware } from './utils/security/SecurityMiddleware';
import IntegrationsManager from './components/settings/IntegrationsManager';
import { useMobileDetection } from './hooks/useMobileDetection';
import MobileLayout from './components/mobile/MobileLayout';

function App() {
  const { isMobile } = useMobileDetection();

  // Protect sensitive routes
  const ProtectedDashboard = SecurityMiddleware.withAuth(Dashboard, 'read');
  const ProtectedSalesPage = SecurityMiddleware.withAuth(SalesPage, 'write');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isMobile ? (
          <MobileLayout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<MainLayout />}>
                <Route index element={
                  <ProtectedRoute>
                    <ProtectedDashboard />
                  </ProtectedRoute>
                } />
                <Route path="contacts" element={
                  <ProtectedRoute>
                    <ContactsPage />
                  </ProtectedRoute>
                } />
                <Route path="marketing" element={
                  <ProtectedRoute>
                    <MarketingPage />
                  </ProtectedRoute>
                } />
                <Route path="sales" element={
                  <ProtectedRoute>
                    <ProtectedSalesPage />
                  </ProtectedRoute>
                } />
                <Route path="settings/integrations" element={
                  <ProtectedRoute>
                    <IntegrationsManager />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </MobileLayout>
        ) : (
          <MainLayout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<MainLayout />}>
                <Route index element={
                  <ProtectedRoute>
                    <ProtectedDashboard />
                  </ProtectedRoute>
                } />
                <Route path="contacts" element={
                  <ProtectedRoute>
                    <ContactsPage />
                  </ProtectedRoute>
                } />
                <Route path="marketing" element={
                  <ProtectedRoute>
                    <MarketingPage />
                  </ProtectedRoute>
                } />
                <Route path="sales" element={
                  <ProtectedRoute>
                    <ProtectedSalesPage />
                  </ProtectedRoute>
                } />
                <Route path="settings/integrations" element={
                  <ProtectedRoute>
                    <IntegrationsManager />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </MainLayout>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App; 