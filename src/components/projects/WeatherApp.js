import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  BsSearch, 
  BsGeoAlt, 
  BsBookmark, 
  BsBookmarkFill,
  BsWind, 
  BsDroplet, 
  BsEye, 
  BsThermometer,
  BsSunrise,
  BsSunset,
  BsCloudRain,
  BsSun,
  BsCloud,
  BsSnow,
  BsCloudFog,
  BsCloudLightningRain,
  BsX,
  BsClock
} from 'react-icons/bs';
import { 
  fetchWeatherByCity, 
  fetchWeatherByCoords, 
  fetchForecast,
  addToSearchHistory,
  addToFavorites,
  removeFromFavorites,
  toggleUnit,
  clearError
} from '../../store/slices/weatherSlice';
import { useDebouncedSearch } from '../../hooks/useDebounce';
import weatherAPI from '../../api/weatherAPI';

const WeatherApp = () => {
  const dispatch = useDispatch();
  const { 
    currentWeather, 
    forecast, 
    loading, 
    error, 
    unit,
    favorites,
    searchHistory 
  } = useSelector(state => state.weather);

  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  
  const { debouncedTerm: debouncedSearch } = useDebouncedSearch(searchInput, 300, 2);

  // Fetch city suggestions using Open-Meteo geocoding API
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearch && debouncedSearch.length >= 2) {
        try {
          const response = await weatherAPI.searchCities(debouncedSearch);
          setSuggestions(response.data);
          setShowSuggestions(true);
        } catch (err) {
          console.error('Failed to fetch suggestions:', err);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  // Get weather icon component
  const getWeatherIcon = (condition, size = 'w-16 h-16') => {
    const iconClass = `${size} text-white drop-shadow-lg`;
    
    switch (condition) {
      case 'clear':
        return <BsSun className={iconClass} />;
      case 'clouds':
        return <BsCloud className={iconClass} />;
      case 'rain':
      case 'drizzle':
        return <BsCloudRain className={iconClass} />;
      case 'snow':
        return <BsSnow className={iconClass} />;
      case 'thunderstorm':
        return <BsCloudLightningRain className={iconClass} />;
      case 'fog':
      case 'mist':
      case 'haze':
        return <BsCloudFog className={iconClass} />;
      default:
        return <BsSun className={iconClass} />;
    }
  };

  // Get background gradient based on weather condition
  const getBackgroundGradient = (condition) => {
    switch (condition) {
      case 'clear':
        return 'from-blue-400 via-blue-500 to-blue-600';
      case 'clouds':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
      case 'drizzle':
        return 'from-gray-600 via-blue-600 to-blue-700';
      case 'snow':
        return 'from-blue-200 via-blue-300 to-blue-400';
      case 'thunderstorm':
        return 'from-gray-700 via-purple-700 to-gray-800';
      case 'fog':
        return 'from-gray-300 via-gray-400 to-gray-500';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  // Handle search
  const handleSearch = (city) => {
    if (city && city.trim()) {
      dispatch(fetchWeatherByCity(city));
      dispatch(fetchForecast(city));
      dispatch(addToSearchHistory(city));
      setSearchInput('');
      setShowSuggestions(false);
    }
  };

  // Handle geolocation
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(fetchWeatherByCoords({ lat: latitude, lon: longitude }));
        setGeoLoading(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to get your location. ';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'Please search for a city instead.';
            break;
        }
        
        alert(errorMessage);
        setGeoLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Toggle favorite
  const toggleFavorite = (city) => {
    if (favorites.includes(city)) {
      dispatch(removeFromFavorites(city));
    } else {
      dispatch(addToFavorites(city));
    }
  };

  // Convert temperature based on unit
  const convertTemp = (temp) => {
    if (unit === 'imperial') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp;
  };

  // Format time
  const formatTime = (timestamp, timezone) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="mb-4 relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchInput)}
              placeholder="Search for a city... (e.g., Malta, London, Paris)"
              className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput('');
                  setShowSuggestions(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <BsX className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={() => handleSearch(searchInput)}
            disabled={loading || !searchInput.trim()}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BsSearch className="w-5 h-5" />
          </button>
          <button
            onClick={handleGeolocation}
            disabled={loading || geoLoading}
            className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Use my location"
          >
            <BsGeoAlt className={`w-5 h-5 ${geoLoading ? 'animate-pulse' : ''}`} />
          </button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 max-h-60 overflow-auto">
            {suggestions.map((city, index) => (
              <button
                key={index}
                onClick={() => handleSearch(city.name)}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {city.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {city.displayName}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={() => dispatch(clearError())}
              className="text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200"
            >
              <BsX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading weather data...</p>
        </div>
      )}

      {/* Weather Display */}
      {currentWeather && !loading && (
        <div className="space-y-4">
          {/* Current Weather Card */}
          <div className={`bg-gradient-to-br ${getBackgroundGradient(currentWeather.condition)} rounded-2xl shadow-xl overflow-hidden text-white`}>
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{currentWeather.location}</h2>
                  <p className="text-blue-100">{currentWeather.country}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(currentWeather.location)}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {favorites.includes(currentWeather.location) ? (
                    <BsBookmarkFill className="w-5 h-5" />
                  ) : (
                    <BsBookmark className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Temperature & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-6xl font-bold mb-2">
                    {convertTemp(currentWeather.temperature)}°{unit === 'metric' ? 'C' : 'F'}
                  </div>
                  <p className="text-xl capitalize">{currentWeather.description}</p>
                  <p className="text-blue-100">
                    Feels like {convertTemp(currentWeather.feelsLike)}°
                  </p>
                </div>
                {getWeatherIcon(currentWeather.condition)}
              </div>

              {/* Unit Toggle */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => dispatch(toggleUnit())}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span className={unit === 'metric' ? 'font-bold' : ''}>°C</span>
                  <span>/</span>
                  <span className={unit === 'imperial' ? 'font-bold' : ''}>°F</span>
                </button>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <BsDroplet className="w-5 h-5 mx-auto mb-1" />
                  <p className="text-xs text-blue-100">Humidity</p>
                  <p className="font-semibold">{currentWeather.humidity}%</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <BsWind className="w-5 h-5 mx-auto mb-1" />
                  <p className="text-xs text-blue-100">Wind</p>
                  <p className="font-semibold">{currentWeather.windSpeed} km/h</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <BsEye className="w-5 h-5 mx-auto mb-1" />
                  <p className="text-xs text-blue-100">Visibility</p>
                  <p className="font-semibold">{currentWeather.visibility} km</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <BsThermometer className="w-5 h-5 mx-auto mb-1" />
                  <p className="text-xs text-blue-100">Pressure</p>
                  <p className="font-semibold">{currentWeather.pressure} hPa</p>
                </div>
              </div>

              {/* 5-Day Forecast - Integrated */}
              {forecast.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4 text-center">
                    5-Day Forecast
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-2 mx-12">
                    {forecast.map((day, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/15 transition-colors min-w-[100px] text-center"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <p className="font-medium text-white text-xs whitespace-nowrap">
                            {formatDate(day.date)}
                          </p>
                          {getWeatherIcon(day.condition, 'w-8 h-8')}
                          <p className="text-xs text-blue-100 capitalize line-clamp-2 leading-tight">
                            {day.description}
                          </p>
                          <div className="text-center">
                            <div className="font-semibold text-white text-sm">
                              {convertTemp(day.high)}°
                            </div>
                            <div className="text-blue-200 text-xs">
                              {convertTemp(day.low)}°
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sunrise/Sunset */}
              <div className="mt-4 flex justify-around">
                <div className="flex items-center gap-2">
                  <BsSunrise className="w-5 h-5 text-yellow-300" />
                  <div>
                    <p className="text-xs text-blue-100">Sunrise</p>
                    <p className="font-semibold">{formatTime(currentWeather.sunrise, currentWeather.timezone)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BsSunset className="w-5 h-5 text-orange-300" />
                  <div>
                    <p className="text-xs text-blue-100">Sunset</p>
                    <p className="font-semibold">{formatTime(currentWeather.sunset, currentWeather.timezone)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Searches */}
          {searchHistory.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <BsClock className="w-5 h-5" />
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(city)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Initial State */}
      {!currentWeather && !loading && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <BsSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Search for a City
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Enter a city name to get current weather and forecast
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Powered by Open-Meteo - Free weather API with no limits!
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;