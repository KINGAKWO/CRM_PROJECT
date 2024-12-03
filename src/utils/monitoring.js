import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initializeMonitoring = () => {
  if (process.env.REACT_APP_ENVIRONMENT === 'production' || 
      process.env.REACT_APP_ENVIRONMENT === 'staging') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      environment: process.env.REACT_APP_ENVIRONMENT,
      tracesSampleRate: 1.0,
      beforeSend(event) {
        // Sanitize sensitive data if needed
        if (event.request && event.request.headers) {
          delete event.request.headers.Authorization;
        }
        return event;
      },
    });
  }
}; 