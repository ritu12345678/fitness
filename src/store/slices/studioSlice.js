import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiClient';

// Initial state
const initialState = {
  studios: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchStudios = createAsyncThunk(
  'studio/fetchStudios',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.get('admin/studios', params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const studioSlice = createSlice({
  name: 'studio',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearStudios: (state) => {
      state.studios = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch studios
      .addCase(fetchStudios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudios.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response structures
        const studiosData = action.payload?.studios || action.payload?.data || action.payload || [];
        state.studios = Array.isArray(studiosData) ? studiosData : [];
      })
      .addCase(fetchStudios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearStudios } = studioSlice.actions;
export default studioSlice.reducer;
