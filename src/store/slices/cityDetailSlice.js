import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:8080/api';

export const getItinerariesByCityIdAsync = createAsyncThunk(
  'cityDetail/getItinerariesByCity',
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/itineraries/city/${cityId}`);
      if (!response.ok) throw new Error('Failed to fetch itineraries');

      const data = await response.json();

      if (!data.response || !Array.isArray(data.response)) {
        throw new Error('Invalid data format from API');
      }

      return data.response;
    } catch (error) {
      console.error('Error fetching itineraries:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const cityDetailSlice = createSlice({
  name: 'cityDetail',
  initialState: {
    currentItineraries: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCityDetail: (state) => {
      state.currentItineraries = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItinerariesByCityIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItinerariesByCityIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItineraries = action.payload;
      })
      .addCase(getItinerariesByCityIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load itineraries';
      });
  },
});

export const { clearCityDetail } = cityDetailSlice.actions;
export default cityDetailSlice.reducer;
