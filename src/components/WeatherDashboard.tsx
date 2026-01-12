import React, { useEffect, useState } from 'react';
import { WeatherData, ApiError } from '../types/weather';
import { weatherApi } from '../services/weatherApi';
import { SearchBar } from './SearchBar';
import { CurrentWeather } from './CurrentWeather';
import { WeatherForecast } from './WeatherForecast';
import { AlertCircle, Loader2, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    loadDefaultWeather();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const loadDefaultWeather = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await weatherApi.getCurrentWeather('Kigali');
      setWeatherData(data);
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await weatherApi.getCurrentWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseLocation = () => {
    if ('geolocation' in navigator) {
      setIsLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(async position => {
        try {
          const data = await weatherApi.getWeatherByCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeatherData(data);
        } catch (err) {
          setError((err as ApiError).message);
        } finally {
          setIsLoading(false);
        }
      }, () => {
        setError('Unable to access your location');
        setIsLoading(false);
      });
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className={`min-h-screen w-full py-4 sm:py-8 px-3 sm:px-4 transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 relative"
        >
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute right-0 top-0 p-2.5 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800 text-yellow-400' : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg'}`}
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            <AnimatePresence mode="wait">
              {isDarkMode ? <motion.div key="sun" initial={{ rotate: -180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 180, opacity: 0 }} transition={{ duration: 0.3 }}>
                <Sun className="w-5 h-5" />
              </motion.div> : <motion.div key="moon" initial={{ rotate: 180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -180, opacity: 0 }} transition={{ duration: 0.3 }}>
                <Moon className="w-5 h-5" />
              </motion.div>}
            </AnimatePresence>
          </motion.button>
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Aime Weather
          </h1>
          <p className={`text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real-time Weather Forecast
          </p>
        </motion.header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-6 sm:mb-8">
          <SearchBar onSearch={handleSearch} onUseLocation={handleUseLocation} isLoading={isLoading} isDarkMode={isDarkMode} />
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading && <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center py-16 sm:py-20">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-red-600" />
          </motion.div>}

          {error && <motion.div key="error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`rounded-xl p-3 sm:p-4 flex items-center gap-3 mb-6 sm:mb-8 transition-colors duration-300 ${isDarkMode ? 'bg-red-950 border border-red-900' : 'bg-red-50 border border-red-200'}`}>
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
            <p className={`text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? 'text-red-400' : 'text-red-800'}`}>
              {error}
            </p>
          </motion.div>}

          {weatherData && !isLoading && (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 sm:space-y-6">
              <CurrentWeather data={weatherData} isDarkMode={isDarkMode} />
              <WeatherForecast forecast={weatherData.forecast} isDarkMode={isDarkMode} />
            </motion.div>
          )}
        </AnimatePresence>

        {!weatherData && !isLoading && !error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 sm:py-20">
          <p className={`text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Search for a location to view weather data
          </p>
        </motion.div>}

      </div>
    </div>
  );
}
 