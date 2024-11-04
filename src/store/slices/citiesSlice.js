import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:8080/api';

// Thunk para fetchCities
export const fetchCitiesAsync = createAsyncThunk(
    'cities/fetchCities',
    async (searchTerm = '') => {
        try {
            const url = searchTerm
                ? `${BASE_URL}/cities?name=${encodeURIComponent(searchTerm)}`
                : `${BASE_URL}/cities`;

            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            return data?.success && Array.isArray(data?.response) ? data.response : [];
        } catch (error) {
            throw error;
        }
    }
);

// Thunk para getCityById
export const getCityByIdAsync = createAsyncThunk(
    'cities/getCityById',
    async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            if (!response.ok) throw new Error('City not found');

            const data = await response.json();
            if (!data?.response) throw new Error('Invalid data format received');

            return data.response;
        } catch (error) {
            throw error;
        }
    }
);

// Thunk para obtener itinerarios por ciudad
export const getItinerariesByCityAsync = createAsyncThunk(
    'cities/getItinerariesByCity',
    async (cityId) => {
        try {
            const response = await fetch(`${BASE_URL}/itineraries/${cityId}`);
            if (!response.ok) throw new Error('Failed to fetch itineraries');
            const data = await response.json();
            return data.response;
        } catch (error) {
            throw error;
        }
    }
);

// Definición del slice para gestionar el estado de las ciudades
const citiesSlice = createSlice({
    name: 'cities',
    initialState: {
        cities: [],
        currentCity: null,
        currentItineraries: [],
        filterText: '',
        loading: false,
        error: null,
    },
    reducers: {
        setFilterText: (state, action) => {
            state.filterText = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Casos para fetchCities
            .addCase(fetchCitiesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCitiesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(fetchCitiesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Casos para getCityById
            .addCase(getCityByIdAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCityByIdAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCity = action.payload;
            })
            .addCase(getCityByIdAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Casos para getItinerariesByCity
            .addCase(getItinerariesByCityAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getItinerariesByCityAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.currentItineraries = action.payload;
            })
            .addCase(getItinerariesByCityAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setFilterText } = citiesSlice.actions;
export default citiesSlice.reducer;