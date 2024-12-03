import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchCampaigns = createAsyncThunk(
  'marketing/fetchCampaigns',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.campaigns.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  campaigns: [],
  loading: false,
  error: null,
  selectedCampaign: null,
  stats: {
    totalSent: 0,
    totalOpened: 0,
    totalClicked: 0,
  },
};

const marketingSlice = createSlice({
  name: 'marketing',
  initialState,
  reducers: {
    setSelectedCampaign: (state, action) => {
      state.selectedCampaign = action.payload;
    },
    addCampaign: (state, action) => {
      state.campaigns.push(action.payload);
    },
    updateCampaign: (state, action) => {
      const index = state.campaigns.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.campaigns[index] = action.payload;
      }
    },
    deleteCampaign: (state, action) => {
      state.campaigns = state.campaigns.filter(c => c.id !== action.payload);
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedCampaign,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  updateStats,
} = marketingSlice.actions;
export default marketingSlice.reducer; 