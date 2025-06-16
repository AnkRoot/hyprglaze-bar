import { WeatherData, LocationData, WeatherApiResponse } from '../types';
import { createNetworkError, createGeolocationError, createWeatherApiError, withRetry } from '../utils/errorHandler';

// 天气服务配置
const WEATHER_CONFIG = {
  API_BASE_URL: 'https://api.open-meteo.com/v1/forecast',
  // BigDataCloud 免费反向地理编码API - 完全免费，无需API Key，支持CORS
  GEOCODING_BASE_URL: 'https://api-bdc.net/data/reverse-geocode-client',
  REQUEST_TIMEOUT: 10000,
  GEOLOCATION_TIMEOUT: 10000,
  GEOLOCATION_MAX_AGE: 600000, // 10分钟缓存
  RETRY_OPTIONS: {
    maxAttempts: 3,
    delay: 1000,
    backoff: true,
  },
};

// 地理位置服务
export class GeolocationService {
  static async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(createGeolocationError('浏览器不支持地理位置功能'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async position => {
          try {
            const { latitude, longitude } = position.coords;
            const locationData = await this.reverseGeocode(latitude, longitude);
            resolve(locationData);
          } catch (error) {
            console.warn('反向地理编码失败:', error);
            // 如果反向地理编码失败，仍然使用坐标但城市名为"当前位置"
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              city: '当前位置',
              country: '未知',
            });
          }
        },
        error => {
          const errorMessage = this.getGeolocationErrorMessage(error);
          reject(createGeolocationError(errorMessage));
        },
        {
          timeout: WEATHER_CONFIG.GEOLOCATION_TIMEOUT,
          enableHighAccuracy: false,
          maximumAge: WEATHER_CONFIG.GEOLOCATION_MAX_AGE,
        }
      );
    });
  }

  private static async reverseGeocode(latitude: number, longitude: number): Promise<LocationData> {
    // 使用 BigDataCloud 免费反向地理编码服务，完全免费，无需API Key，支持CORS
    const url = `${WEATHER_CONFIG.GEOCODING_BASE_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=zh`;

    const response = await fetch(url, {
      signal: AbortSignal.timeout(WEATHER_CONFIG.REQUEST_TIMEOUT),
    });

    if (!response.ok) {
      throw createNetworkError(`BigDataCloud 反向地理编码请求失败: ${response.status}`);
    }

    const data = await response.json();

    // 检查 BigDataCloud 响应
    if (!data || typeof data !== 'object') {
      throw createNetworkError('BigDataCloud API返回数据格式错误');
    }

    // 提取城市名（BigDataCloud 返回格式）
    // 优先级：city > locality > principalSubdivision > countryName
    const city = data.city || data.locality || data.principalSubdivision || data.countryName || '未知城市';

    const country = data.countryName || '未知';

    return {
      latitude,
      longitude,
      city: city.replace(/市$|区$|县$|省$/, ''), // 移除常见的行政区划后缀
      country,
    };
  }

  private static getGeolocationErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return '地理位置权限被拒绝，请允许位置访问';
      case error.POSITION_UNAVAILABLE:
        return '无法获取地理位置信息';
      case error.TIMEOUT:
        return '获取地理位置超时，请检查网络连接';
      default:
        return '获取地理位置时发生未知错误';
    }
  }
}

// 天气API服务
export class WeatherApiService {
  static async fetchWeatherData(location: LocationData): Promise<WeatherData> {
    const url = `${WEATHER_CONFIG.API_BASE_URL}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,is_day&timezone=auto&forecast_days=1`;

    const response = await fetch(url, {
      signal: AbortSignal.timeout(WEATHER_CONFIG.REQUEST_TIMEOUT),
    });

    if (!response.ok) {
      throw createWeatherApiError(`天气API请求失败: ${response.status}`);
    }

    const data: WeatherApiResponse = await response.json();

    if (!data.current) {
      throw createWeatherApiError('天气API返回数据格式错误');
    }

    // 验证必需的字段
    const temperature = data.current.temperature_2m;
    const weatherCode = data.current.weather_code;
    const isDay = data.current.is_day;

    if (typeof temperature !== 'number' || isNaN(temperature)) {
      throw createWeatherApiError('天气API返回的温度数据无效');
    }

    if (typeof weatherCode !== 'number') {
      throw createWeatherApiError('天气API返回的天气代码无效');
    }

    return {
      temperature: Math.round(temperature),
      weatherCode: weatherCode,
      city: location.city,
      country: location.country,
      isDay: isDay === 1,
      lastUpdated: new Date(),
    };
  }
}

// 主要天气服务类
export class WeatherService {
  private static instance: WeatherService;
  private cache: Map<string, { data: WeatherData; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30分钟缓存

  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  async getCurrentWeather(): Promise<WeatherData> {
    return withRetry(async () => {
      // 获取位置信息
      const location = await GeolocationService.getCurrentLocation();

      // 检查缓存
      const cacheKey = `${location.latitude},${location.longitude}`;
      const cached = this.cache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached.data;
      }

      // 获取天气数据
      const weatherData = await WeatherApiService.fetchWeatherData(location);

      // 更新缓存
      this.cache.set(cacheKey, {
        data: weatherData,
        timestamp: Date.now(),
      });

      return weatherData;
    }, WEATHER_CONFIG.RETRY_OPTIONS);
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}
