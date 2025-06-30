const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';

// Cache implementation
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Weather code to condition mapping
const weatherCodeMap = {
  0: { condition: 'clear', description: 'Clear sky' },
  1: { condition: 'clear', description: 'Mainly clear' },
  2: { condition: 'clouds', description: 'Partly cloudy' },
  3: { condition: 'clouds', description: 'Overcast' },
  45: { condition: 'mist', description: 'Foggy' },
  48: { condition: 'mist', description: 'Depositing rime fog' },
  51: { condition: 'rain', description: 'Light drizzle' },
  53: { condition: 'rain', description: 'Moderate drizzle' },
  55: { condition: 'rain', description: 'Dense drizzle' },
  61: { condition: 'rain', description: 'Slight rain' },
  63: { condition: 'rain', description: 'Moderate rain' },
  65: { condition: 'rain', description: 'Heavy rain' },
  71: { condition: 'snow', description: 'Slight snow fall' },
  73: { condition: 'snow', description: 'Moderate snow fall' },
  75: { condition: 'snow', description: 'Heavy snow fall' },
  77: { condition: 'snow', description: 'Snow grains' },
  80: { condition: 'rain', description: 'Slight rain showers' },
  81: { condition: 'rain', description: 'Moderate rain showers' },
  82: { condition: 'rain', description: 'Violent rain showers' },
  85: { condition: 'snow', description: 'Slight snow showers' },
  86: { condition: 'snow', description: 'Heavy snow showers' },
  95: { condition: 'thunderstorm', description: 'Thunderstorm' },
  96: { condition: 'thunderstorm', description: 'Thunderstorm with slight hail' },
  99: { condition: 'thunderstorm', description: 'Thunderstorm with heavy hail' }
};

// GET current weather
router.get('/current', async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    let latitude, longitude, locationName, country;

    if (city) {
      const cacheKey = `geo_${city}`;
      const cachedGeo = getCachedData(cacheKey);
      
      if (cachedGeo) {
        ({ latitude, longitude, locationName, country } = cachedGeo);
      } else {
        const geoResponse = await axios.get(`${GEOCODING_URL}/search`, {
          params: { name: city, count: 1, language: 'en', format: 'json' }
        });
        
        if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
          return res.status(404).json({ message: 'City not found' });
        }
        
        const location = geoResponse.data.results[0];
        latitude = location.latitude;
        longitude = location.longitude;
        locationName = location.name;
        country = location.country || '';
        
        setCachedData(cacheKey, { latitude, longitude, locationName, country });
      }
    } else if (lat && lon) {
      latitude = parseFloat(lat);
      longitude = parseFloat(lon);
      
      // Reverse geocoding to get location name
      try {
        const reverseGeoResponse = await axios.get(`${GEOCODING_URL}/reverse`, {
          params: { latitude, longitude, language: 'en', format: 'json' }
        });
        
        if (reverseGeoResponse.data.results && reverseGeoResponse.data.results.length > 0) {
          locationName = reverseGeoResponse.data.results[0].name;
          country = reverseGeoResponse.data.results[0].country || '';
        } else {
          locationName = 'Current Location';
          country = '';
        }
      } catch {
        locationName = 'Current Location';
        country = '';
      }
    } else {
      return res.status(400).json({ message: 'City name or coordinates required' });
    }

    const weatherCacheKey = `weather_${latitude}_${longitude}`;
    const cachedWeather = getCachedData(weatherCacheKey);
    
    if (cachedWeather) {
      return res.json(cachedWeather);
    }

    const weatherResponse = await axios.get(`${OPEN_METEO_BASE_URL}/forecast`, {
      params: {
        latitude,
        longitude,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl',
        hourly: 'temperature_2m,relative_humidity_2m,visibility',
        daily: 'sunrise,sunset',
        timezone: 'auto',
        forecast_days: 1
      }
    });

    const { current, hourly, daily, timezone_abbreviation } = weatherResponse.data;
    const weatherInfo = weatherCodeMap[current.weather_code] || { condition: 'clear', description: 'Unknown' };

    // Get current hour for hourly data
    const currentTime = new Date(current.time);
    const currentHour = currentTime.getHours();

    const weatherData = {
      location: locationName,
      country: country,
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      pressure: Math.round(current.pressure_msl),
      windSpeed: Math.round(current.wind_speed_10m),
      windDeg: current.wind_direction_10m,
      visibility: hourly.visibility ? hourly.visibility[currentHour] / 1000 : 10, // Convert to km
      description: weatherInfo.description,
      condition: weatherInfo.condition,
      sunrise: new Date(daily.sunrise[0]).getTime() / 1000,
      sunset: new Date(daily.sunset[0]).getTime() / 1000,
      timezone: 0, // Open-Meteo handles timezone automatically
      coord: { lat: latitude, lon: longitude }
    };

    setCachedData(weatherCacheKey, weatherData);
    res.json(weatherData);

  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
});

// GET 5-day forecast
router.get('/forecast', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ message: 'City name required' });
    }

    // Get coordinates first
    const geoResponse = await axios.get(`${GEOCODING_URL}/search`, {
      params: { name: city, count: 1, language: 'en', format: 'json' }
    });
    
    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
      return res.status(404).json({ message: 'City not found' });
    }
    
    const location = geoResponse.data.results[0];
    const { latitude, longitude } = location;

    const forecastResponse = await axios.get(`${OPEN_METEO_BASE_URL}/forecast`, {
      params: {
        latitude,
        longitude,
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
        forecast_days: 5
      }
    });

    const { daily } = forecastResponse.data;

    const forecast = daily.time.map((date, index) => {
      const weatherInfo = weatherCodeMap[daily.weather_code[index]] || { condition: 'clear', description: 'Unknown' };
      
      return {
        date: new Date(date).getTime() / 1000,
        high: Math.round(daily.temperature_2m_max[index]),
        low: Math.round(daily.temperature_2m_min[index]),
        condition: weatherInfo.condition,
        description: weatherInfo.description,
        icon: daily.weather_code[index].toString()
      };
    });

    res.json({
      city: location.name,
      country: location.country || '',
      list: forecast
    });

  } catch (error) {
    console.error('Forecast API Error:', error);
    res.status(500).json({ message: 'Failed to fetch forecast data' });
  }
});

// GET search cities
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json([]);
    }

    const response = await axios.get(`${GEOCODING_URL}/search`, {
      params: { 
        name: q, 
        count: 8,
        language: 'en',
        format: 'json'
      }
    });

    const cities = (response.data.results || []).map(city => ({
      name: city.name,
      country: city.country || '',
      state: city.admin1 || '',
      lat: city.latitude,
      lon: city.longitude,
      displayName: `${city.name}${city.admin1 ? ', ' + city.admin1 : ''}${city.country ? ', ' + city.country : ''}`
    }));

    res.json(cities);

  } catch (error) {
    console.error('City search API Error:', error);
    res.status(500).json({ message: 'Failed to search cities' });
  }
});

// POST weather for multiple cities (favorites)
router.post('/multiple', async (req, res) => {
  try {
    const { cities } = req.body;
    
    if (!cities || !Array.isArray(cities) || cities.length === 0) {
      return res.status(400).json({ message: 'Cities array required' });
    }

    const weatherPromises = cities.map(async (city) => {
      try {
        // Reuse the current weather endpoint logic
        const geoResponse = await axios.get(`${GEOCODING_URL}/search`, {
          params: { name: city, count: 1 }
        });
        
        if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
          return { city, error: 'City not found' };
        }
        
        const location = geoResponse.data.results[0];
        
        const weatherResponse = await axios.get(`${OPEN_METEO_BASE_URL}/forecast`, {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            current: 'temperature_2m,weather_code',
            timezone: 'auto'
          }
        });

        const { current } = weatherResponse.data;
        const weatherInfo = weatherCodeMap[current.weather_code] || { condition: 'clear', description: 'Unknown' };

        return {
          city,
          data: {
            location: location.name,
            country: location.country || '',
            temperature: Math.round(current.temperature_2m),
            description: weatherInfo.description,
            condition: weatherInfo.condition
          }
        };
      } catch (error) {
        return { city, error: 'Failed to fetch' };
      }
    });

    const results = await Promise.all(weatherPromises);
    res.json(results);

  } catch (error) {
    console.error('Multiple cities API Error:', error);
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
});

module.exports = router;