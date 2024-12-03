import ReactGA from 'react-ga4';

export const initializeAnalytics = () => {
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    ReactGA.initialize(process.env.REACT_APP_GA_ID);
  }
}; 