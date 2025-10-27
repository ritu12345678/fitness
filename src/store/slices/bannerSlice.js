import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiClient';

// Initial state
const initialState = {
  banners: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pageSize: 9,
    totalResults: 0,
    totalPages: 0,
  },
};

// Async thunks
export const fetchBanners = createAsyncThunk(
  'banner/fetchBanners',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.get('admin/bannermanagements', params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const toggleBannerStatus = createAsyncThunk(
  'banner/toggleBannerStatus',
  async ({ id, active }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(`admin/bannermanagements/${id}`, { active });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearBanners: (state) => {
      state.banners = [];
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch banners
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        const bannersData = action.payload?.data?.banners || action.payload?.banners || action.payload || [];
        state.banners = Array.isArray(bannersData) ? bannersData : [];
        
        // Update pagination if provided
        if (action.payload?.pagination) {
          state.pagination = { ...state.pagination, ...action.payload.pagination };
        }
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle banner status
      .addCase(toggleBannerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBannerStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBanner = action.payload;
        const index = state.banners.findIndex(banner => banner.id === updatedBanner.id);
        if (index !== -1) {
          state.banners[index] = { ...state.banners[index], ...updatedBanner };
        }
      })
      .addCase(toggleBannerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearBanners, setPagination } = bannerSlice.actions;
export default bannerSlice.reducer;





