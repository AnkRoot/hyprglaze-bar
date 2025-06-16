import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  CloudDrizzle,
  Cloudy,
  Moon,
  CloudMoon
} from "lucide-react";
import { WeatherOutput } from "zebar";

export function getWeatherIcon(weather: WeatherOutput, className: string = "h-3 w-3 text-icon") {
  const condition = weather.status.toLowerCase();
  const isNight = new Date().getHours() >= 18 || new Date().getHours() <= 6;
  
  // 雨天
  if (condition.includes('rain') || condition.includes('雨')) {
    if (condition.includes('heavy') || condition.includes('大雨')) {
      return <CloudRain className={className} />;
    } else {
      return <CloudDrizzle className={className} />;
    }
  }
  
  // 雪天
  if (condition.includes('snow') || condition.includes('雪')) {
    return <CloudSnow className={className} />;
  }
  
  // 雷暴
  if (condition.includes('thunder') || condition.includes('storm') || condition.includes('雷')) {
    return <CloudLightning className={className} />;
  }
  
  // 多云
  if (condition.includes('cloud') || condition.includes('云')) {
    if (condition.includes('partly') || condition.includes('少云')) {
      return isNight ? <CloudMoon className={className} /> : <Cloudy className={className} />;
    } else {
      return <Cloud className={className} />;
    }
  }
  
  // 晴天
  if (condition.includes('clear') || condition.includes('sunny') || condition.includes('晴')) {
    return isNight ? <Moon className={className} /> : <Sun className={className} />;
  }
  
  // 默认图标
  return isNight ? <Moon className={className} /> : <Sun className={className} />;
}
