import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Theme, ThemeMode, ThemePreset, defaultTheme, lightTheme, themeUtils } from './index';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  currentPreset: ThemePreset;
  setTheme: (theme: Theme) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setThemePreset: (preset: ThemePreset) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // 初始化主题预设（从localStorage加载或使用默认值）
  const [currentPreset, setCurrentPresetState] = useState<ThemePreset>(() => {
    return themeUtils.loadThemePresetPreference();
  });

  // 初始化主题模式（从localStorage加载或使用默认值）
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    return themeUtils.loadThemePreference();
  });

  // 根据当前预设计算实际主题
  const [theme, setTheme] = useState<Theme>(() => {
    const initialPreset = themeUtils.loadThemePresetPreference();
    return themeUtils.getThemeByPreset(initialPreset);
  });

  // 监听系统主题变化（仅在auto模式下）
  useEffect(() => {
    if (themeMode !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      setTheme(themeUtils.getThemeByMode(systemTheme));
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [themeMode]);

  // 应用主题到CSS变量
  useEffect(() => {
    themeUtils.applyThemeToCSS(theme);
  }, [theme]);

  // 设置主题预设的函数
  const setThemePreset = (preset: ThemePreset) => {
    setCurrentPresetState(preset);
    themeUtils.saveThemePresetPreference(preset);

    // 根据新预设更新主题
    setTheme(themeUtils.getThemeByPreset(preset));

    // 同时更新主题模式以保持一致性
    const metadata = themeUtils.getThemeMetadata(preset);
    setThemeModeState(metadata.category === 'dark' ? 'dark' : 'light');
    themeUtils.saveThemePreference(metadata.category === 'dark' ? 'dark' : 'light');
  };

  // 设置主题模式的函数（保持向后兼容）
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    themeUtils.saveThemePreference(mode);

    // 根据新模式选择对应的默认预设（不触发额外的保存）
    let targetPreset: ThemePreset;
    if (mode === 'dark') {
      targetPreset = 'hypr-dark';
    } else if (mode === 'light') {
      targetPreset = 'hypr-light';
    } else {
      // auto模式根据系统偏好选择
      const systemTheme = themeUtils.getSystemThemePreference();
      targetPreset = systemTheme === 'dark' ? 'hypr-dark' : 'hypr-light';
    }

    // 直接更新状态，避免循环调用
    setCurrentPresetState(targetPreset);
    themeUtils.saveThemePresetPreference(targetPreset);
    setTheme(themeUtils.getThemeByPreset(targetPreset));
  };

  // 切换主题的函数（在dark和light预设之间切换）
  const toggleTheme = () => {
    const metadata = themeUtils.getThemeMetadata(currentPreset);
    if (metadata.category === 'dark') {
      setThemePreset('hypr-light');
    } else {
      setThemePreset('hypr-dark');
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      themeMode,
      currentPreset,
      setTheme,
      setThemeMode,
      setThemePreset,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
