import { motion } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Cloudy,
  Moon,
  CloudMoon,
  MapPin,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useWeather, useWeatherDisplay } from "../hooks/useWeather";
import { WeatherDisplayProps } from "../types";
import { withErrorBoundary } from "./ErrorBoundary";

// 天气图标映射组件
const WeatherIcon = ({ weatherCode, isDay, className = "w-4 h-4" }: {
  weatherCode: number;
  isDay: boolean;
  className?: string;
}) => {
  // WMO Weather interpretation codes
  if (weatherCode === 0) {
    return isDay ? <Sun className={className} /> : <Moon className={className} />;
  } else if (weatherCode <= 3) {
    if (weatherCode === 1) {
      return isDay ? <Cloudy className={className} /> : <CloudMoon className={className} />;
    } else {
      return <Cloud className={className} />;
    }
  } else if (weatherCode <= 67) {
    if (weatherCode <= 57) {
      return <CloudDrizzle className={className} />;
    } else {
      return <CloudRain className={className} />;
    }
  } else if (weatherCode <= 77) {
    return <CloudSnow className={className} />;
  } else if (weatherCode <= 82) {
    return <CloudRain className={className} />;
  } else if (weatherCode <= 86) {
    return <CloudSnow className={className} />;
  } else if (weatherCode <= 99) {
    return <CloudLightning className={className} />;
  }

  return isDay ? <Sun className={className} /> : <Moon className={className} />;
};

function WeatherDisplayComponent({ className = "" }: WeatherDisplayProps) {
  // 使用自定义钩子获取天气数据
  const { data: weather, status, error } = useWeather({
    updateInterval: 30 * 60 * 1000, // 30分钟更新间隔
    autoRefresh: true,
  });

  // 使用天气显示工具钩子
  const { getWeatherDescription } = useWeatherDisplay();

  // 加载状态
  if (status === 'loading') {
    return (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-text/70">获取天气中...</span>
      </div>
    );
  }

  // 错误状态
  if (status === 'error' || error) {
    return (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        <AlertCircle className="w-4 h-4 text-red-400" />
        <span className="text-text/70">天气获取失败</span>
      </div>
    );
  }

  // 无数据状态
  if (!weather) return null;

  return (
    <motion.div
      className={`flex items-center gap-2 text-sm ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 天气图标 */}
      <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <WeatherIcon
          weatherCode={weather.weatherCode}
          isDay={weather.isDay}
          className="w-4 h-4"
        />
      </motion.div>

      {/* 温度 */}
      <span className="text-text/90 font-medium">
        {weather.temperature}°C
      </span>

      {/* 天气描述 */}
      <span className="text-text/70 text-xs">
        {getWeatherDescription(weather.weatherCode)}
      </span>

      {/* 城市信息 */}
      <div className="flex items-center gap-1 text-text/60 text-xs">
        <MapPin className="w-3 h-3" />
        <span>{weather.city}</span>
      </div>
    </motion.div>
  );
}

// 使用错误边界包装组件
export const WeatherDisplay = withErrorBoundary(WeatherDisplayComponent, {
  fallback: (error, retry) => (
    <div className="flex items-center gap-2 text-sm">
      <AlertCircle className="w-4 h-4 text-red-400" />
      <span className="text-text/70">天气组件错误</span>
      <button
        onClick={retry}
        className="text-xs text-primary hover:text-primary/80 ml-1"
      >
        重试
      </button>
    </div>
  ),
});
