import { BaseComponentProps } from './base';

// 天气相关类型
export interface WeatherData {
  temperature: number;
  weatherCode: number;
  city: string;
  country: string;
  isDay: boolean;
  lastUpdated?: Date;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

export interface WeatherApiResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
    is_day: number;
  };
  timezone: string;
}

export interface GeolocationResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state?: string;
    country?: string;
  };
}

// 天气组件Props类型
export interface WeatherDisplayProps extends BaseComponentProps {
  weather?: WeatherData | null;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}
