import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchDeals = createAsyncThunk(
  'deals/fetchDeals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.deals.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  deals: {},
  loading: false,
  error: null,
  filters: {
    search: '',
    priority: 'all',
    valueRange: 'all',
  },
};

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    updateDeal: (state, action) => {
      const { id, stage, ...deal } = action.payload;
      const oldStage = Object.keys(state.deals).find(s => 
        state.deals[s].some(d => d.id === id)
      );
      
      if (oldStage) {
        state.deals[oldStage] = state.deals[oldStage].filter(d => d.id !== id);
      }
      
      if (!state.deals[stage]) {
        state.deals[stage] = [];
      }
      state.deals[stage].push({ id, stage, ...deal });
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateDeal, setFilters, resetFilters } = dealsSlice.actions;
export default dealsSlice.reducer; 