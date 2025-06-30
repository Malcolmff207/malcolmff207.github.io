// src/api/weatherAPI.js - Open-Meteo API Integration (No API Key Required!)
import axios from 'axios';

// Open-Meteo API endpoints
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// Weather code mappings (Open-Meteo uses WMO weather codes)
const getWeatherCondition = (weatherCode) => {
  if (weatherCode === 0) return { condition: 'clear', description: 'clear sky' };
  if ([1, 2, 3].includes(weatherCode)) return { condition: 'clouds', description: 'partly cloudy' };
  if ([45, 48].includes(weatherCode)) return { condition: 'fog', description: 'foggy' };
  if ([51, 53, 55].includes(weatherCode)) return { condition: 'drizzle', description: 'drizzle' };
  if ([56, 57].includes(weatherCode)) return { condition: 'drizzle', description: 'freezing drizzle' };
  if ([61, 63, 65].includes(weatherCode)) return { condition: 'rain', description: 'rain' };
  if ([66, 67].includes(weatherCode)) return { condition: 'rain', description: 'freezing rain' };
  if ([71, 73, 75].includes(weatherCode)) return { condition: 'snow', description: 'snow' };
  if ([77].includes(weatherCode)) return { condition: 'snow', description: 'snow grains' };
  if ([80, 81, 82].includes(weatherCode)) return { condition: 'rain', description: 'rain showers' };
  if ([85, 86].includes(weatherCode)) return { condition: 'snow', description: 'snow showers' };
  if ([95].includes(weatherCode)) return { condition: 'thunderstorm', description: 'thunderstorm' };
  if ([96, 99].includes(weatherCode)) return { condition: 'thunderstorm', description: 'thunderstorm with hail' };
  
  return { condition: 'clouds', description: 'cloudy' };
};

// Geocoding function to get coordinates from city name
const geocodeCity = async (cityName) => {
  try {
    const response = await axios.get(GEOCODING_URL, {
      params: {
        name: cityName,
        count: 1,
        language: 'en',
        format: 'json'
      }
    });

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error(`City "${cityName}" not found`);
    }

    const city = response.data.results[0];
    return {
      latitude: city.latitude,
      longitude: city.longitude,
      name: city.name,
      country: city.country_code?.toUpperCase() || city.country || 'Unknown',
      timezone: city.timezone || 'UTC'
    };
  } catch (error) {
    throw new Error(`Failed to find location for "${cityName}": ${error.message}`);
  }
};

const weatherAPI = {
  // Get current weather by city name
  getWeatherByCity: async (city) => {
    try {
      // First, get coordinates for the city
      const location = await geocodeCity(city);
      
      // Then get weather data using coordinates
      const response = await axios.get(WEATHER_URL, {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          current: [
            'temperature_2m',
            'relative_humidity_2m', 
            'apparent_temperature',
            'precipitation',
            'weather_code',
            'cloud_cover',
            'pressure_msl',
            'wind_speed_10m',
            'wind_direction_10m'
          ].join(','),
          daily: [
            'sunrise',
            'sunset'
          ].join(','),
          timezone: 'auto'
        }
      });

      const data = response.data;
      const current = data.current;
      const daily = data.daily;
      
      // Get weather condition from weather code
      const { condition, description } = getWeatherCondition(current.weather_code);

      // Transform to match your app's expected format
      const transformedData = {
        location: location.name,
        country: location.country,
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        description: description,
        condition: condition,
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m * 10) / 10, // Round to 1 decimal
        visibility: 10, // Open-Meteo doesn't provide visibility, using default
        pressure: Math.round(current.pressure_msl),
        sunrise: new Date(daily.sunrise[0]).getTime() / 1000,
        sunset: new Date(daily.sunset[0]).getTime() / 1000,
        timezone: 0 // Simplified for now
      };

      return { data: transformedData };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch weather data');
    }
  },

  // Get current weather by coordinates
  getWeatherByCoords: async (lat, lon) => {
    try {
      const response = await axios.get(WEATHER_URL, {
        params: {
          latitude: lat,
          longitude: lon,
          current: [
            'temperature_2m',
            'relative_humidity_2m', 
            'apparent_temperature',
            'precipitation',
            'weather_code',
            'cloud_cover',
            'pressure_msl',
            'wind_speed_10m',
            'wind_direction_10m'
          ].join(','),
          daily: [
            'sunrise',
            'sunset'
          ].join(','),
          timezone: 'auto'
        }
      });

      const data = response.data;
      const current = data.current;
      const daily = data.daily;
      
      // Get weather condition from weather code
      const { condition, description } = getWeatherCondition(current.weather_code);

      // Transform to match your app's expected format
      const transformedData = {
        location: 'Current Location',
        country: 'Unknown',
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        description: description,
        condition: condition,
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
        visibility: 10,
        pressure: Math.round(current.pressure_msl),
        sunrise: new Date(daily.sunrise[0]).getTime() / 1000,
        sunset: new Date(daily.sunset[0]).getTime() / 1000,
        timezone: 0
      };

      return { data: transformedData };
    } catch (error) {
      throw new Error('Failed to fetch weather data for your location');
    }
  },

  // Get 5-day forecast
  getForecast: async (city) => {
    try {
      // First, get coordinates for the city
      const location = await geocodeCity(city);
      
      // Then get forecast data
      const response = await axios.get(WEATHER_URL, {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min'
          ].join(','),
          timezone: 'auto'
        }
      });

      const data = response.data;
      const daily = data.daily;
      
      // Transform forecast data (take first 5 days)
      const forecastList = [];
      for (let i = 0; i < Math.min(5, daily.time.length); i++) {
        const { condition, description } = getWeatherCondition(daily.weather_code[i]);
        
        forecastList.push({
          date: new Date(daily.time[i]).getTime() / 1000,
          high: Math.round(daily.temperature_2m_max[i]),
          low: Math.round(daily.temperature_2m_min[i]),
          description: description,
          condition: condition
        });
      }

      return { 
        data: { 
          list: forecastList 
        } 
      };
    } catch (error) {
      throw new Error('Failed to fetch forecast data');
    }
  },

  // Search cities (autocomplete)
  searchCities: async (query) => {
    try {
      const response = await axios.get(GEOCODING_URL, {
        params: {
          name: query,
          count: 10,
          language: 'en',
          format: 'json'
        }
      });

      if (!response.data.results) {
        return { data: [] };
      }

      const cities = response.data.results.map(city => ({
        name: city.name,
        displayName: `${city.name}${city.admin1 ? ', ' + city.admin1 : ''}${city.country ? ', ' + city.country : ''}`
      }));

      return { data: cities };
    } catch (error) {
      console.error('Failed to search cities:', error);
      return { data: [] };
    }
  }
};

// Add request interceptor for debugging (optional)
axios.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.url, config.params);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default weatherAPI;