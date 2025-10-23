import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import dashboardSlice from './slices/dashboardSlice';
import userSlice from './slices/userSlice';
import loaderSlice from './slices/loaderSlice';
import locationSlice from './slices/locationSlice';
import categorySlice from './slices/categorySlice';
import bannerSlice from './slices/bannerSlice';
import packageSlice from './slices/packageSlice';
import studioSlice from './slices/studioSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: dashboardSlice,
    user: userSlice,
    loader: loaderSlice,
    location: locationSlice,
    category: categorySlice,
    banner: bannerSlice,
    package: packageSlice,
    studio: studioSlice,
  },
});
