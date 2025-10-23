import React from 'react';
import { WeatherData } from '../types/weather';
import { Cloud, Droplets, Wind, Eye, Gauge, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
interface CurrentWeatherProps {
  data: WeatherData;
  isDarkMode: boolean;
}
export function CurrentWeather({
  data,
  isDarkMode
}: CurrentWeatherProps) {
  const {
    location,
    current
  } = data;
  const weatherDetails = [{
    icon: Droplets,
    label: 'Humidity',
    value: `${current.humidity}%`
  }, {
    icon: Wind,
    label: 'Wind',
    value: `${current.windSpeed} m/s`
  }, {
    icon: Gauge,
    label: 'Pressure',
    value: `${current.pressure} hPa`
  }, {
    icon: Eye,
    label: 'Visibility',
    value: `${current.visibility} km`
  }];
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className={`rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <motion.div initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.5,
        delay: 0.1
      }}>
          <div className={`flex items-center gap-2 mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">
              {location.name}, {location.country}
            </span>
          </div>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {current.temp}°C
          </h2>
          <p className={`text-base sm:text-lg mt-1 sm:mt-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {current.description}
          </p>
          <p className={`text-xs sm:text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Feels like {current.feelsLike}°C
          </p>
        </motion.div>
        <motion.div initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="self-end sm:self-auto">
          <Cloud className="w-16 h-16 sm:w-20 sm:h-20 text-red-600" />
        </motion.div>
      </div>
      <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.3
    }} className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t transition-colors duration-300 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        {weatherDetails.map((detail, index) => <motion.div key={index} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3,
        delay: 0.4 + index * 0.1
      }} whileHover={{
        scale: 1.05
      }} className={`text-center p-2 rounded-lg transition-all duration-200 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
            <detail.icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <p className={`text-xs mb-0.5 sm:mb-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {detail.label}
            </p>
            <p className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {detail.value}
            </p>
          </motion.div>)}
      </motion.div>
    </motion.div>;
}