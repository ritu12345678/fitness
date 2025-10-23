import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiClient';

// Initial state
const initialState = {
  locations: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchLocations = createAsyncThunk(
  'location/fetchLocations',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.get('admin/locations', params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearLocations: (state) => {
      state.locations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch locations
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response structures
        // Since apiService.get returns response.data, action.payload is already the data
        const locationsData = action.payload?.locations || action.payload?.data || action.payload || [];
        state.locations = Array.isArray(locationsData) ? locationsData : [];
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearLocations } = locationSlice.actions;
export default locationSlice.reducer;

