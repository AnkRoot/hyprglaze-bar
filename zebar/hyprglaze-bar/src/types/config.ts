// 配置类型
export interface AppConfig {
  weather: {
    updateInterval: number;
    apiTimeout: number;
    enableGeolocation: boolean;
  };
  ui: {
    showSeconds: boolean;
    animationDuration: number;
    theme: 'dark' | 'light' | 'auto';
  };
  performance: {
    enableLazyLoading: boolean;
    debounceDelay: number;
  };
}
