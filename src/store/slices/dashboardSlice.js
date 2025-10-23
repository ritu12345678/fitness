import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiClient';

// Initial state
const initialState = {
  dashboardData: null,
  stats: {
    totalUsers: 0,
    totalTrainers: 0,
    totalBatches: 0,
    totalRevenue: 0,
    activeUsers: 0,
    upcomingEvents: 0,
  },
  recentActivities: [],
  upcomingEvents: [],
  topStudios: [],
  packageExpiry: [],
  loading: false,
  error: null,
};

// Single async thunk for fetching all dashboard data
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.get('admin/dashboard', params);
      console.log('Dashboard API Response:', response); // Debug log
      return response;
    } catch (error) {
      console.error('Dashboard API Error:', error); // Debug log
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Dashboard slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearDashboardData: (state) => {
      state.dashboardData = null;
      state.stats = initialState.stats;
      state.recentActivities = [];
      state.upcomingEvents = [];
      state.topStudios = [];
      state.packageExpiry = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Single API call for all dashboard data
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
        
        // Extract all data from single API response
        if (action.payload.stats) {
          state.stats = { ...state.stats, ...action.payload.stats };
        }
        
        if (action.payload.recentActivities) {
          state.recentActivities = action.payload.recentActivities;
        }
        
        if (action.payload.upcomingEvents) {
          state.upcomingEvents = action.payload.upcomingEvents;
        }
        
        if (action.payload.topStudios) {
          state.topStudios = action.payload.topStudios;
        }
        
        if (action.payload.packageExpiry) {
          state.packageExpiry = action.payload.packageExpiry;
        }
        
        console.log('Dashboard data updated:', {
          stats: state.stats,
          recentActivities: state.recentActivities,
          upcomingEvents: state.upcomingEvents,
          topStudios: state.topStudios,
          packageExpiry: state.packageExpiry
        }); // Debug log
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
