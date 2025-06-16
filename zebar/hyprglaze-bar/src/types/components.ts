import { BaseComponentProps } from './base';
import { WeatherData } from './weather';

// 时间显示组件Props
export interface TimeDisplayProps extends BaseComponentProps {
  showSeconds?: boolean;
  format?: '12h' | '24h';
}

// 中央显示组件Props
export interface CenterDisplayProps extends BaseComponentProps {
  date?: Date;
  weather?: WeatherData | null;
}
