import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:8080/api';

// Thunk asincrónico para obtener itinerarios por ID de ciudad
export const getItinerariesByCityIdAsync = createAsyncThunk(
  'cityDetail/getItinerariesByCity',
  async (cityId) => {
    try {
      const response = await fetch(`${BASE_URL}/itineraries/city/${cityId}`); // Realiza la petición para obtener itinerarios por ID de ciudad
      if (!response.ok) throw new Error('Failed to fetch itineraries'); // Manejo de error si la respuesta no es válida

      const data = await response.json(); // Convierte la respuesta a JSON
      return data.response; // Retorna los datos de la respuesta
    } catch (error) {
      console.error('Error fetching itineraries:', error); // Muestra el error en la consola
      throw error; // Lanza el error para que sea manejado por el flujo de Redux
    }
  }
);

// Definición del slice para gestionar el detalle de la ciudad
const cityDetailSlice = createSlice({
  name: 'cityDetail',
  initialState: {
    currentItineraries: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Acción para limpiar el detalle de la ciudad
    clearCityDetail: (state) => {
      state.currentItineraries = []; // Vacía el arreglo de itinerarios actuales
      state.error = null; // Reinicia el error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItinerariesByCityIdAsync.pending, (state) => {
        state.loading = true; // Indica que la carga está en curso
        state.error = null; // Reinicia el error
      })
      .addCase(getItinerariesByCityIdAsync.fulfilled, (state, action) => {
        state.loading = false; // Indica que la carga ha terminado
        state.currentItineraries = action.payload; // Establece los itinerarios actuales obtenidos
      })
      .addCase(getItinerariesByCityIdAsync.rejected, (state, action) => {
        state.loading = false; // Indica que la carga ha terminado
        state.error = action.error.message; // Establece el mensaje de error
      });
  },
});

export const { clearCityDetail } = cityDetailSlice.actions; // Exporta la acción para limpiar el detalle de la ciudad
export default cityDetailSlice.reducer; // Exporta el reducer del slice