import React from 'react';
import { ForecastDay } from '../types/weather';
import { Cloud, CloudRain, Sun, CloudDrizzle, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';
interface WeatherForecastProps {
  forecast: ForecastDay[];
  isDarkMode: boolean;
}
export function WeatherForecast({
  forecast,
  isDarkMode
}: WeatherForecastProps) {
  const getWeatherIcon = (icon: string) => {
    if (icon.includes('01')) return Sun;
    if (icon.includes('02') || icon.includes('03')) return Cloud;
    if (icon.includes('04')) return Cloud;
    if (icon.includes('09') || icon.includes('10')) return CloudRain;
    return CloudDrizzle;
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: 0.2
  }} className={`rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
      <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {forecast.map((day, index) => {
        const WeatherIcon = getWeatherIcon(day.icon);
        return <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.4,
          delay: 0.3 + index * 0.1
        }} whileHover={{
          scale: 1.03,
          y: -4
        }} className={`rounded-xl p-3 sm:p-4 transition-all duration-300 border cursor-pointer ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750 border-gray-700 hover:border-red-900 hover:shadow-lg' : 'bg-gray-50 hover:bg-red-50 border-gray-100 hover:border-red-200 hover:shadow-md'}`}>
              <p className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formatDate(day.date)}
              </p>
              <motion.div whileHover={{
            rotate: 360
          }} transition={{
            duration: 0.6
          }}>
                <WeatherIcon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-red-600" />
              </motion.div>
              <p className={`text-center text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {day.description}
              </p>
              <div className="flex justify-between items-center">
                <span className={`text-base sm:text-lg font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {day.temp.max}°
                </span>
                <span className={`text-xs sm:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {day.temp.min}°
                </span>
              </div>
              <div className={`flex items-center justify-center gap-1 mt-1.5 sm:mt-2 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                <Droplets className="w-3 h-3" />
                <span>{day.precipitation}%</span>
              </div>
            </motion.div>;
      })}
      </div>
    </motion.div>;
}