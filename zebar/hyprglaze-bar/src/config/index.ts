import { AppConfig } from '../types';

// 默认配置
export const defaultConfig: AppConfig = {
  weather: {
    updateInterval: 30 * 60 * 1000, // 30分钟
    apiTimeout: 10000, // 10秒
    enableGeolocation: true,
  },
  ui: {
    showSeconds: false,
    animationDuration: 300, // 毫秒
    theme: 'dark',
  },
  performance: {
    enableLazyLoading: true,
    debounceDelay: 300, // 毫秒
  },
};

// 环境变量配置
export const environmentConfig = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  apiBaseUrl: process.env.VITE_API_BASE_URL || 'https://api.open-meteo.com/v1',
  enableDebugLogs: process.env.VITE_ENABLE_DEBUG_LOGS === 'true',
};

// 配置管理类
export class ConfigManager {
  private static instance: ConfigManager;
  private config: AppConfig;
  private listeners: Set<(config: AppConfig) => void> = new Set();

  private constructor() {
    this.config = this.loadConfig();
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  // 加载配置（从localStorage或使用默认值）
  private loadConfig(): AppConfig {
    try {
      const stored = localStorage.getItem('hyprglaze-config');
      if (stored) {
        const parsedConfig = JSON.parse(stored);
        return this.mergeConfig(defaultConfig, parsedConfig);
      }
    } catch (error) {
      console.warn('Failed to load config from localStorage:', error);
    }
    return { ...defaultConfig };
  }

  // 深度合并配置
  private mergeConfig(defaultConf: AppConfig, userConf: Partial<AppConfig>): AppConfig {
    return {
      weather: { ...defaultConf.weather, ...userConf.weather },
      ui: { ...defaultConf.ui, ...userConf.ui },
      performance: { ...defaultConf.performance, ...userConf.performance },
    };
  }

  // 获取配置
  getConfig(): AppConfig {
    return { ...this.config };
  }

  // 获取特定配置项
  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  // 更新配置
  updateConfig(updates: Partial<AppConfig>): void {
    this.config = this.mergeConfig(this.config, updates);
    this.saveConfig();
    this.notifyListeners();
  }

  // 更新特定配置项
  updateSection<K extends keyof AppConfig>(section: K, updates: Partial<AppConfig[K]>): void {
    this.config[section] = { ...this.config[section], ...updates };
    this.saveConfig();
    this.notifyListeners();
  }

  // 重置配置
  resetConfig(): void {
    this.config = { ...defaultConfig };
    this.saveConfig();
    this.notifyListeners();
  }

  // 保存配置到localStorage
  private saveConfig(): void {
    try {
      localStorage.setItem('hyprglaze-config', JSON.stringify(this.config));
    } catch (error) {
      console.error('Failed to save config to localStorage:', error);
    }
  }

  // 添加配置变更监听器
  addListener(listener: (config: AppConfig) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // 通知所有监听器
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.getConfig());
      } catch (error) {
        console.error('Config listener error:', error);
      }
    });
  }

  // 导出配置
  exportConfig(): string {
    return JSON.stringify(this.config, null, 2);
  }

  // 导入配置
  importConfig(configJson: string): boolean {
    try {
      const importedConfig = JSON.parse(configJson);
      this.updateConfig(importedConfig);
      return true;
    } catch (error) {
      console.error('Failed to import config:', error);
      return false;
    }
  }

  // 验证配置
  validateConfig(config: any): config is AppConfig {
    return (
      typeof config === 'object' &&
      config !== null &&
      typeof config.weather === 'object' &&
      typeof config.ui === 'object' &&
      typeof config.performance === 'object'
    );
  }
}

// 配置钩子
import { useState, useEffect } from 'react';

export function useConfig() {
  const configManager = ConfigManager.getInstance();
  const [config, setConfig] = useState(configManager.getConfig());

  useEffect(() => {
    const unsubscribe = configManager.addListener(setConfig);
    return unsubscribe;
  }, [configManager]);

  const updateConfig = (updates: Partial<AppConfig>) => {
    configManager.updateConfig(updates);
  };

  const updateSection = <K extends keyof AppConfig>(section: K, updates: Partial<AppConfig[K]>) => {
    configManager.updateSection(section, updates);
  };

  const resetConfig = () => {
    configManager.resetConfig();
  };

  return {
    config,
    updateConfig,
    updateSection,
    resetConfig,
    exportConfig: () => configManager.exportConfig(),
    importConfig: (json: string) => configManager.importConfig(json),
  };
}

// 导出单例实例
export const configManager = ConfigManager.getInstance();
