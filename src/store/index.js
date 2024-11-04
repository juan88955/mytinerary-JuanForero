import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './slices/citiesSlice';
import cityDetailReducer from './slices/cityDetailSlice';

// Configuración de la tienda (store) de Redux
export const store = configureStore({
  reducer: {
    cities: citiesReducer, // Asocia el reductor de 'cities' con el estado 'cities'
    cityDetail: cityDetailReducer, // Asocia el reductor de 'cityDetail' con el estado 'cityDetail'
  },
});