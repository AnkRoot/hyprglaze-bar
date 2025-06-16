import { useState, useEffect, useCallback, useRef } from 'react';
import { WeatherData, ApiState } from '../types';
import { WeatherService } from '../services/weatherService';
import { handleError, logError } from '../utils/errorHandler';

interface UseWeatherOptions {
  updateInterval?: number;
  autoRefresh?: boolean;
  onError?: (error: string) => void;
}

interface UseWeatherReturn extends ApiState<WeatherData> {
  refresh: () => Promise<void>;
  clearCache: () => void;
  lastUpdated: Date | null;
}

export function useWeather(options: UseWeatherOptions = {}): UseWeatherReturn {
  const {
    updateInterval = 30 * 60 * 1000, // 30分钟默认更新间隔
    autoRefresh = true,
    onError,
  } = options;

  const [state, setState] = useState<ApiState<WeatherData>>({
    data: null,
    status: 'idle',
    error: null,
  });

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const weatherService = useRef(WeatherService.getInstance());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isUnmountedRef = useRef(false);

  // 获取天气数据的核心函数
  const fetchWeather = useCallback(async () => {
    if (isUnmountedRef.current) return;

    setState(prev => ({ ...prev, status: 'loading', error: null }));

    try {
      const weatherData = await weatherService.current.getCurrentWeather();

      if (!isUnmountedRef.current) {
        setState({
          data: weatherData,
          status: 'success',
          error: null,
        });
        setLastUpdated(new Date());
      }
    } catch (error) {
      const appError = handleError(error, 'useWeather');
      logError(appError);

      if (!isUnmountedRef.current) {
        setState(prev => ({
          ...prev,
          status: 'error',
          error: appError.message,
        }));

        // 调用错误回调
        if (onError) {
          onError(appError.message);
        }
      }
    }
  }, [onError]);

  // 手动刷新函数
  const refresh = useCallback(async () => {
    await fetchWeather();
  }, [fetchWeather]);

  // 清除缓存函数
  const clearCache = useCallback(() => {
    weatherService.current.clearCache();
  }, []);

  // 设置定时更新
  useEffect(() => {
    if (!autoRefresh) return;

    const setupInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (!isUnmountedRef.current) {
          fetchWeather();
        }
      }, updateInterval);
    };

    setupInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoRefresh, updateInterval, fetchWeather]);

  // 初始化获取天气数据（仅在自动刷新启用时）
  useEffect(() => {
    if (autoRefresh) {
      fetchWeather();
    }
  }, [fetchWeather, autoRefresh]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data: state.data,
    status: state.status,
    error: state.error,
    refresh,
    clearCache,
    lastUpdated,
  };
}

// 天气图标和描述的工具钩子
export function useWeatherDisplay() {
  const getWeatherDescription = useCallback((weatherCode: number): string => {
    const descriptions: { [key: number]: string } = {
      0: '晴朗',
      1: '大部晴朗',
      2: '部分多云',
      3: '阴天',
      45: '雾',
      48: '雾凇',
      51: '小雨',
      53: '中雨',
      55: '大雨',
      56: '冻雨',
      57: '冻雨',
      61: '小雨',
      63: '中雨',
      65: '大雨',
      66: '冻雨',
      67: '冻雨',
      71: '小雪',
      73: '中雪',
      75: '大雪',
      77: '雪粒',
      80: '阵雨',
      81: '阵雨',
      82: '暴雨',
      85: '阵雪',
      86: '阵雪',
      95: '雷暴',
      96: '雷暴伴冰雹',
      99: '雷暴伴冰雹',
    };

    return descriptions[weatherCode] || '未知';
  }, []);

  const getWeatherIconName = useCallback((weatherCode: number, isDay: boolean): string => {
    // 返回图标名称，供组件使用
    if (weatherCode === 0) {
      return isDay ? 'sun' : 'moon';
    } else if (weatherCode <= 3) {
      if (weatherCode === 1) {
        return isDay ? 'cloudy' : 'cloud-moon';
      } else {
        return 'cloud';
      }
    } else if (weatherCode <= 67) {
      if (weatherCode <= 57) {
        return 'cloud-drizzle';
      } else {
        return 'cloud-rain';
      }
    } else if (weatherCode <= 77) {
      return 'cloud-snow';
    } else if (weatherCode <= 82) {
      return 'cloud-rain';
    } else if (weatherCode <= 86) {
      return 'cloud-snow';
    } else if (weatherCode <= 99) {
      return 'cloud-lightning';
    }

    return isDay ? 'sun' : 'moon';
  }, []);

  return {
    getWeatherDescription,
    getWeatherIconName,
  };
}
