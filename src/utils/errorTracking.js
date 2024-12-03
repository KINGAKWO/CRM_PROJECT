import * as Sentry from "@sentry/react";

export const initializeErrorTracking = () => {
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      environment: process.env.REACT_APP_ENVIRONMENT,
    });
  }
}; 