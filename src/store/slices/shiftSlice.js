import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiClient';

// Initial state
const initialState = {
  shifts: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchShifts = createAsyncThunk(
  'shift/fetchShifts',
  async (params = {}, { rejectWithValue }) => {
    try {
      console.log('🔍 Fetching shifts with params:', params);
      const response = await apiService.get('admin/shifts', params);
      console.log('✅ Shifts response:', response);
      return response;
    } catch (error) {
      console.error('❌ Error fetching shifts:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearShifts: (state) => {
      state.shifts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch shifts
      .addCase(fetchShifts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response structures
        const shiftsData = action.payload||[];
        console.log('📋 Setting shifts in state:', shiftsData);
        state.shifts = Array.isArray(shiftsData) ? shiftsData : [];
      })
      .addCase(fetchShifts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearShifts } = shiftSlice.actions;
export default shiftSlice.reducer;
