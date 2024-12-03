import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { initializeMonitoring } from './utils/monitoring';
import App from './App';
import './index.css';

// Initialize monitoring before rendering
initializeMonitoring();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);