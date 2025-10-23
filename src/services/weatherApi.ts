import axios, { AxiosError } from 'axios';
import { WeatherData, ApiError } from '../types/weather';
// API Configuration
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with actual API key
// Create axios instance with default config
const weatherApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Request interceptor for adding API key
weatherApiClient.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    appid: API_KEY,
    units: 'metric'
  };
  return config;
}, error => {
  return Promise.reject(error);
});
// Response interceptor for error handling
weatherApiClient.interceptors.response.use(response => response, (error: AxiosError) => {
  const apiError: ApiError = {
    message: 'An error occurred while fetching weather data',
    status: error.response?.status
  };
  if (error.code === 'ECONNABORTED') {
    apiError.message = 'Request timeout - please try again';
  } else if (error.response) {
    switch (error.response.status) {
      case 401:
        apiError.message = 'Invalid API key';
        break;
      case 404:
        apiError.message = 'Location not found';
        break;
      case 429:
        apiError.message = 'Too many requests - please wait';
        break;
      case 500:
        apiError.message = 'Server error - please try again later';
        break;
    }
  } else if (error.request) {
    apiError.message = 'Network error - please check your connection';
  }
  return Promise.reject(apiError);
});
// API Service Methods
export const weatherApi = {
  // Get current weather by city name
  getCurrentWeather: async (city: string): Promise<WeatherData> => {
    try {
      const [currentResponse, forecastResponse] = await Promise.all([weatherApiClient.get('/weather', {
        params: {
          q: city
        }
      }), weatherApiClient.get('/forecast', {
        params: {
          q: city
        }
      })]);
      return transformWeatherData(currentResponse.data, forecastResponse.data);
    } catch (error) {
      throw error;
    }
  },
  // Get weather by coordinates
  getWeatherByCoordinates: async (lat: number, lon: number): Promise<WeatherData> => {
    try {
      const [currentResponse, forecastResponse] = await Promise.all([weatherApiClient.get('/weather', {
        params: {
          lat,
          lon
        }
      }), weatherApiClient.get('/forecast', {
        params: {
          lat,
          lon
        }
      })]);
      return transformWeatherData(currentResponse.data, forecastResponse.data);
    } catch (error) {
      throw error;
    }
  },
  // Get mock data for testing (remove in production)
  getMockWeather: (): WeatherData => {
    return {
      location: {
        name: 'Kigali',
        country: 'RW',
        lat: -1.9536,
        lon: 30.0606
      },
      current: {
        temp: 22,
        feelsLike: 21,
        humidity: 65,
        pressure: 1013,
        windSpeed: 3.5,
        windDirection: 'NE',
        description: 'Partly Cloudy',
        icon: '02d',
        visibility: 10,
        uvIndex: 6
      },
      forecast: [{
        date: new Date(Date.now() + 86400000).toISOString(),
        temp: {
          min: 18,
          max: 25
        },
        description: 'Sunny',
        icon: '01d',
        humidity: 60,
        windSpeed: 4,
        precipitation: 10
      }, {
        date: new Date(Date.now() + 172800000).toISOString(),
        temp: {
          min: 17,
          max: 24
        },
        description: 'Partly Cloudy',
        icon: '02d',
        humidity: 70,
        windSpeed: 3,
        precipitation: 20
      }, {
        date: new Date(Date.now() + 259200000).toISOString(),
        temp: {
          min: 19,
          max: 26
        },
        description: 'Light Rain',
        icon: '10d',
        humidity: 75,
        windSpeed: 5,
        precipitation: 60
      }, {
        date: new Date(Date.now() + 345600000).toISOString(),
        temp: {
          min: 18,
          max: 23
        },
        description: 'Cloudy',
        icon: '03d',
        humidity: 68,
        windSpeed: 4.5,
        precipitation: 30
      }, {
        date: new Date(Date.now() + 432000000).toISOString(),
        temp: {
          min: 20,
          max: 27
        },
        description: 'Sunny',
        icon: '01d',
        humidity: 55,
        windSpeed: 3,
        precipitation: 5
      }]
    };
  }
};
// Transform API response to our data structure
function transformWeatherData(current: any, forecast: any): WeatherData {
  return {
    location: {
      name: current.name,
      country: current.sys.country,
      lat: current.coord.lat,
      lon: current.coord.lon
    },
    current: {
      temp: Math.round(current.main.temp),
      feelsLike: Math.round(current.main.feels_like),
      humidity: current.main.humidity,
      pressure: current.main.pressure,
      windSpeed: current.wind.speed,
      windDirection: getWindDirection(current.wind.deg),
      description: current.weather[0].main,
      icon: current.weather[0].icon,
      visibility: current.visibility / 1000,
      uvIndex: 0 // OpenWeather requires separate call for UV
    },
    forecast: forecast.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 5).map((item: any) => ({
      date: item.dt_txt,
      temp: {
        min: Math.round(item.main.temp_min),
        max: Math.round(item.main.temp_max)
      },
      description: item.weather[0].main,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      precipitation: item.pop * 100
    }))
  };
}
function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}