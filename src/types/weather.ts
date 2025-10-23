export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: string;
    description: string;
    icon: string;
    visibility: number;
    uvIndex: number;
  };
  forecast: ForecastDay[];
}
export interface ForecastDay {
  date: string;
  temp: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}