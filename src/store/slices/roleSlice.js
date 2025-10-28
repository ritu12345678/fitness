import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiClient';

// Fetch all roles on app startup
export const fetchRoles = createAsyncThunk(
  'role/fetchRoles',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await apiService.get('admin/roles', params);
      return res.data || res; // Handle different response structures
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch users by role ID
export const fetchUsersByRole = createAsyncThunk(
  'role/fetchUsersByRole',
  async ({ roleId, params = {} }, { rejectWithValue }) => {
    try {
      console.log('🔍 fetchUsersByRole called with params:', params);
      const res = await apiService.get(`users/role/${roleId}`, params);
      
      // Handle paginated response structure
      return { 
        roleId, 
        users: res?.data || res,
        pagination: res?.pagination || null
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    roles: [], // Array of all roles from API
    users: [], // Users with role_id = 2
    trainers: [], // Users with role_id = 3
    loading: false,
    error: null,
    rolesLoaded: false, // Flag to track if roles are loaded
    pagination: {
      current_page: 1,
      total_pages: 1,
      total_items: 0,
      items_per_page: 10,
      has_next: false,
      has_prev: false,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUsersByRole: (state, action) => {
      const { roleId } = action.payload;
      if (roleId === 2) state.users = [];
      if (roleId === 3) state.trainers = [];
    },
    // Helper to get role ID by name
    getRoleIdByName: (state, action) => {
      const roleName = action.payload;
      const role = state.roles.find(role => role.role_name === roleName);
      return role ? role.role_id : null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
        state.rolesLoaded = true;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.rolesLoaded = false;
      })
      
      // Fetch users by role
      .addCase(fetchUsersByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersByRole.fulfilled, (state, action) => {
        state.loading = false;
        const { roleId, users, pagination } = action.payload;
        
        if (roleId === 2) {
          state.users = Array.isArray(users) ? users : users?.data || [];
          if (pagination) {
            state.pagination = pagination;
          }
        } else if (roleId === 3) {
          state.trainers = Array.isArray(users) ? users : users?.data || [];
          if (pagination) {
            state.pagination = pagination;
          }
        }
      })
      .addCase(fetchUsersByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearUsersByRole, getRoleIdByName } = roleSlice.actions;
export default roleSlice.reducer;

