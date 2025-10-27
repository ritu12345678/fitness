import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  isLoading: false,
  loadingText: 'Loading...',
  loadingType: 'page', // 'page', 'inline', 'fullscreen', 'button'
};

// Loader slice
const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    // Show loader
    showLoader: (state, action) => {
      state.isLoading = true;
      state.loadingText = action.payload?.text || 'Loading...';
      state.loadingType = action.payload?.type || 'page';
    },
    
    // Hide loader
    hideLoader: (state) => {
      state.isLoading = false;
      state.loadingText = 'Loading...';
      state.loadingType = 'page';
    },
    
    // Set loading text
    setLoadingText: (state, action) => {
      state.loadingText = action.payload;
    },
    
    // Set loading type
    setLoadingType: (state, action) => {
      state.loadingType = action.payload;
    },
  },
});

export const { showLoader, hideLoader, setLoadingText, setLoadingType } = loaderSlice.actions;

// Selectors
export const selectLoader = (state) => state.loader;
export const selectIsLoading = (state) => state.loader.isLoading;
export const selectLoadingText = (state) => state.loader.loadingText;
export const selectLoadingType = (state) => state.loader.loadingType;

export default loaderSlice.reducer;






