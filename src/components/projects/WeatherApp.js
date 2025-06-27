import React, { useState, useEffect } from 'react';
import { BsSearch, BsCloudRain, BsSun, BsCloud, BsSnow, BsWind, BsDroplet, BsEye, BsThermometer } from 'react-icons/bs';

const WeatherApp = () => {
  const [city, setCity] = useState('Malta');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    location: 'Malta',
    temperature: 24,
    condition: 'sunny',
    description: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    feelLike: 26,
    forecast: [
      { day: 'Today', high: 24, low: 18, condition: 'sunny', icon: '☀️' },
      { day: 'Tomorrow', high: 22, low: 16, condition: 'cloudy', icon: '⛅' },
      { day: 'Thursday', high: 20, low: 14, condition: 'rainy', icon: '🌧️' },
      { day: 'Friday', high: 23, low: 17, condition: 'sunny', icon: '☀️' },
      { day: 'Saturday', high: 25, low: 19, condition: 'sunny', icon: '☀️' }
    ]
  });

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return <BsSun className="w-16 h-16 text-yellow-500" />;
      case 'cloudy':
        return <BsCloud className="w-16 h-16 text-gray-500" />;
      case 'rainy':
        return <BsCloudRain className="w-16 h-16 text-blue-500" />;
      case 'snowy':
        return <BsSnow className="w-16 h-16 text-blue-300" />;
      default:
        return <BsSun className="w-16 h-16 text-yellow-500" />;
    }
  };

  const getBackgroundGradient = (condition) => {
    switch (condition) {
      case 'sunny':
        return 'from-blue-400 via-blue-500 to-yellow-400';
      case 'cloudy':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rainy':
        return 'from-gray-600 via-blue-600 to-blue-700';
      case 'snowy':
        return 'from-blue-200 via-blue-300 to-blue-400';
      default:
        return 'from-blue-400 via-blue-500 to-yellow-400';
    }
  };

  const searchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock weather data based on city
    const mockData = {
      'London': {
        location: 'London, UK',
        temperature: 15,
        condition: 'rainy',
        description: 'Light Rain',
        humidity: 85,
        windSpeed: 8,
        visibility: 6,
        feelLike: 13
      },
      'New York': {
        location: 'New York, USA',
        temperature: 18,
        condition: 'cloudy',
        description: 'Partly Cloudy',
        humidity: 70,
        windSpeed: 15,
        visibility: 12,
        feelLike: 20
      },
      'Tokyo': {
        location: 'Tokyo, Japan',
        temperature: 22,
        condition: 'sunny',
        description: 'Clear Sky',
        humidity: 55,
        windSpeed: 10,
        visibility: 15,
        feelLike: 24
      },
      default: {
        location: city,
        temperature: Math.floor(Math.random() * 25) + 10,
        condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
        description: 'Pleasant Weather',
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        visibility: Math.floor(Math.random() * 10) + 5,
        feelLike: Math.floor(Math.random() * 25) + 12
      }
    };

    const newWeather = mockData[city] || mockData.default;
    setWeather({ ...weather, ...newWeather });
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchWeather();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header with Search */}
      <div className={`bg-gradient-to-br ${getBackgroundGradient(weather.condition)} p-6 text-white`}>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name..."
            className="flex-1 px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            onClick={searchWeather}
            disabled={loading}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors flex items-center gap-1 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <BsSearch className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Current Weather */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">{weather.location}</h2>
          <div className="flex items-center justify-center mb-2">
            {getWeatherIcon(weather.condition)}
          </div>
          <div className="text-4xl font-bold mb-1">{weather.temperature}°C</div>
          <div className="text-white/80">{weather.description}</div>
          <div className="text-sm text-white/70 mt-1">
            Feels like {weather.feelLike}°C
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
            <BsDroplet className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-sm text-gray-600 dark:text-gray-400">Humidity</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{weather.humidity}%</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
            <BsWind className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-sm text-gray-600 dark:text-gray-400">Wind</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{weather.windSpeed} km/h</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
            <BsEye className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-sm text-gray-600 dark:text-gray-400">Visibility</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{weather.visibility} km</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
            <BsThermometer className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <div className="text-sm text-gray-600 dark:text-gray-400">Feels Like</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{weather.feelLike}°C</div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">5-Day Forecast</h3>
          <div className="space-y-2">
            {weather.forecast.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{day.icon}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {day.day}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {day.high}°
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {day.low}°
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-100 dark:bg-gray-700 text-center">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Try searching for: London, New York, Tokyo
        </p>
      </div>
    </div>
  );
};

export default WeatherApp;