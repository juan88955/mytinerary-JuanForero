import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './slices/citiesSlice';
import cityDetailReducer from './slices/cityDetailSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    cityDetail: cityDetailReducer, 
    auth: authSlice 
  },
});