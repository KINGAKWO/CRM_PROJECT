import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dealsReducer from './slices/dealsSlice';
import contactsReducer from './slices/contactsSlice';
import marketingReducer from './slices/marketingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deals: dealsReducer,
    contacts: contactsReducer,
    marketing: marketingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;