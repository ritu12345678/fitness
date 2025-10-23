import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiClient';

// Initial state
const initialState = {
  packages: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchPackages = createAsyncThunk(
  'package/fetchPackages',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.get('admin/packages', params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPackages: (state) => {
      state.packages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch packages
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response structures
        const packagesData = action.payload?.packages || action.payload?.data || action.payload || [];
        state.packages = Array.isArray(packagesData) ? packagesData : [];
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearPackages } = packageSlice.actions;
export default packageSlice.reducer;
