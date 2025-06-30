import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import weatherAPI from '../../api/weatherAPI';

// Async thunks
export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city, { rejectWithValue }) => {
    try {
      const response = await weatherAPI.getWeatherByCity(city);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch weather data');
    }
  }
);

export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchByCoords',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await weatherAPI.getWeatherByCoords(lat, lon);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch weather data');
    }
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (city, { rejectWithValue }) => {
    try {
      const response = await weatherAPI.getForecast(city);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch forecast data');
    }
  }
);

const initialState = {
  currentWeather: null,
  forecast: [],
  searchHistory: [],
  favorites: [],
  loading: false,
  error: null,
  unit: 'metric', // 'metric' or 'imperial'
  lastUpdated: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addToSearchHistory: (state, action) => {
      const city = action.payload;
      state.searchHistory = [
        city,
        ...state.searchHistory.filter(item => item !== city)
      ].slice(0, 10); // Keep only last 10 searches
    },
    addToFavorites: (state, action) => {
      const city = action.payload;
      if (!state.favorites.includes(city)) {
        state.favorites.push(city);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(city => city !== action.payload);
    },
    toggleUnit: (state) => {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    }
  },
  extraReducers: (builder) => {
    // Fetch weather by city
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch weather by coordinates
    builder
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch forecast
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload.list;
        state.error = null;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  addToSearchHistory,
  addToFavorites,
  removeFromFavorites,
  toggleUnit,
  clearError,
  clearSearchHistory
} = weatherSlice.actions;

export default weatherSlice.reducer;