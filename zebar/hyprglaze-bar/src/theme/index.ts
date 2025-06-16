export interface ColorPalette {
  background: string;
  text: string;
  textMuted: string;
  icon: string;
  primary: string;
  primaryBorder: string;
  buttonBorder: string;
}

export interface Typography {
  fontMono: string;
  fontSans: string;
}

export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Animations {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    easeInOut: string;
    easeOut: string;
    spring: string;
  };
}

export interface Theme {
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  animations: Animations;
}

// 主题模式类型定义
export type ThemeMode = 'dark' | 'light' | 'auto';

// 预设主题类型定义（精简版）
export type ThemePreset =
  | 'hypr-dark' // 默认深色主题
  | 'hypr-light' // 默认浅色主题
  | 'nord-dark' // Nord 深色主题
  | 'nord-light' // Nord 浅色主题
  | 'catppuccin-mocha' // Catppuccin Mocha
  | 'catppuccin-latte' // Catppuccin Latte
  | 'dracula' // Dracula 主题
  | 'tokyo-night' // Tokyo Night 主题
  | 'gruvbox-dark' // Gruvbox 深色主题
  | 'gruvbox-light' // Gruvbox 浅色主题
  | 'one-dark' // One Dark 主题
  | 'solarized-dark' // Solarized 深色主题
  | 'solarized-light' // Solarized 浅色主题
  | 'material-dark' // Material 深色主题
  | 'material-light' // Material 浅色主题
  | 'cyberpunk' // 赛博朋克主题
  | 'forest' // 森林主题
  | 'ocean' // 海洋主题
  | 'sunset' // 日落主题
  | 'aurora'; // 极光主题

// 主题元数据接口
export interface ThemeMetadata {
  id: ThemePreset;
  name: string;
  description: string;
  author: string;
  category: 'dark' | 'light';
  tags: string[];
  preview?: {
    background: string;
    primary: string;
    text: string;
  };
}

// 默认深色主题
export const defaultTheme: Theme = {
  colors: {
    background: 'rgb(15 15 15)',
    text: 'rgb(255 255 255)',
    textMuted: 'rgb(156 163 175)',
    icon: 'rgb(156 163 175)',
    primary: 'rgb(59 130 246)',
    primaryBorder: 'rgb(37 99 235)',
    buttonBorder: 'rgb(55 65 81)',
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// 浅色主题
export const lightTheme: Theme = {
  colors: {
    background: 'rgb(255 255 255)',
    text: 'rgb(15 15 15)',
    textMuted: 'rgb(107 114 128)',
    icon: 'rgb(107 114 128)',
    primary: 'rgb(59 130 246)',
    primaryBorder: 'rgb(37 99 235)',
    buttonBorder: 'rgb(209 213 219)',
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Nord 深色主题
export const nordDarkTheme: Theme = {
  colors: {
    background: 'rgb(46 52 64)', // Nord0
    text: 'rgb(236 239 244)', // Nord4
    textMuted: 'rgb(129 161 193)', // Nord3
    icon: 'rgb(129 161 193)', // Nord3
    primary: 'rgb(136 192 208)', // Nord8
    primaryBorder: 'rgb(94 129 172)', // Nord10
    buttonBorder: 'rgb(59 66 82)', // Nord1
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Nord 浅色主题
export const nordLightTheme: Theme = {
  colors: {
    background: 'rgb(236 239 244)', // Nord4
    text: 'rgb(46 52 64)', // Nord0
    textMuted: 'rgb(76 86 106)', // Nord2
    icon: 'rgb(76 86 106)', // Nord2
    primary: 'rgb(94 129 172)', // Nord10
    primaryBorder: 'rgb(136 192 208)', // Nord8
    buttonBorder: 'rgb(216 222 233)', // Nord5
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Catppuccin Mocha 主题 (深色)
export const catppuccinMochaTheme: Theme = {
  colors: {
    background: 'rgb(30 30 46)', // Base
    text: 'rgb(205 214 244)', // Text
    textMuted: 'rgb(166 173 200)', // Subtext1
    icon: 'rgb(166 173 200)', // Subtext1
    primary: 'rgb(137 180 250)', // Blue
    primaryBorder: 'rgb(116 199 236)', // Sky
    buttonBorder: 'rgb(49 50 68)', // Surface0
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Catppuccin Latte 主题 (浅色)
export const catppuccinLatteTheme: Theme = {
  colors: {
    background: 'rgb(239 241 245)', // Base
    text: 'rgb(76 79 105)', // Text
    textMuted: 'rgb(108 111 133)', // Subtext1
    icon: 'rgb(108 111 133)', // Subtext1
    primary: 'rgb(30 102 245)', // Blue
    primaryBorder: 'rgb(4 165 229)', // Sky
    buttonBorder: 'rgb(220 224 232)', // Surface0
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Dracula 主题
export const draculaTheme: Theme = {
  colors: {
    background: 'rgb(40 42 54)', // Background
    text: 'rgb(248 248 242)', // Foreground
    textMuted: 'rgb(98 114 164)', // Comment
    icon: 'rgb(98 114 164)', // Comment
    primary: 'rgb(139 233 253)', // Cyan
    primaryBorder: 'rgb(189 147 249)', // Purple
    buttonBorder: 'rgb(68 71 90)', // Current Line
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Tokyo Night 主题
export const tokyoNightTheme: Theme = {
  colors: {
    background: 'rgb(26 27 38)', // 深蓝黑色背景
    text: 'rgb(169 177 214)', // 淡紫色文字
    textMuted: 'rgb(86 95 137)', // 暗紫色次要文字
    icon: 'rgb(86 95 137)', // 暗紫色图标
    primary: 'rgb(125 207 255)', // 亮蓝色主色
    primaryBorder: 'rgb(187 154 247)', // 紫色边框
    buttonBorder: 'rgb(41 46 66)', // 深色边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Gruvbox Dark 主题
export const gruvboxDarkTheme: Theme = {
  colors: {
    background: 'rgb(40 40 40)', // 温暖的深灰色
    text: 'rgb(235 219 178)', // 温暖的米色文字
    textMuted: 'rgb(168 153 132)', // 暗米色次要文字
    icon: 'rgb(168 153 132)', // 暗米色图标
    primary: 'rgb(131 165 152)', // 温和的绿色
    primaryBorder: 'rgb(184 187 38)', // 黄绿色边框
    buttonBorder: 'rgb(60 56 54)', // 深棕色边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Gruvbox Light 主题
export const gruvboxLightTheme: Theme = {
  colors: {
    background: 'rgb(251 241 199)', // 温暖的浅米色
    text: 'rgb(60 56 54)', // 深棕色文字
    textMuted: 'rgb(102 92 84)', // 中等棕色次要文字
    icon: 'rgb(102 92 84)', // 中等棕色图标
    primary: 'rgb(121 116 14)', // 深黄色主色
    primaryBorder: 'rgb(175 58 3)', // 橙色边框
    buttonBorder: 'rgb(213 196 161)', // 浅棕色边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// One Dark 主题
export const oneDarkTheme: Theme = {
  colors: {
    background: 'rgb(40 44 52)', // 深灰蓝色背景
    text: 'rgb(171 178 191)', // 浅灰色文字
    textMuted: 'rgb(92 99 112)', // 中灰色次要文字
    icon: 'rgb(92 99 112)', // 中灰色图标
    primary: 'rgb(97 175 239)', // 亮蓝色主色
    primaryBorder: 'rgb(198 120 221)', // 紫色边框
    buttonBorder: 'rgb(54 59 69)', // 深灰色边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Solarized Dark 主题
export const solarizedDarkTheme: Theme = {
  colors: {
    background: 'rgb(0 43 54)', // 深青色背景
    text: 'rgb(131 148 150)', // 浅青灰色文字
    textMuted: 'rgb(88 110 117)', // 中青灰色次要文字
    icon: 'rgb(88 110 117)', // 中青灰色图标
    primary: 'rgb(38 139 210)', // 蓝色主色
    primaryBorder: 'rgb(42 161 152)', // 青色边框
    buttonBorder: 'rgb(7 54 66)', // 深青色边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Solarized Light 主题
export const solarizedLightTheme: Theme = {
  colors: {
    background: 'rgb(253 246 227)', // 温暖的浅米色背景
    text: 'rgb(101 123 131)', // 深青灰色文字
    textMuted: 'rgb(147 161 161)', // 中青灰色次要文字
    icon: 'rgb(147 161 161)', // 中青灰色图标
    primary: 'rgb(38 139 210)', // 蓝色主色
    primaryBorder: 'rgb(42 161 152)', // 青色边框
    buttonBorder: 'rgb(238 232 213)', // 浅米色边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Material Dark 主题
export const materialDarkTheme: Theme = {
  colors: {
    background: 'rgb(33 33 33)', // Material 深色背景
    text: 'rgb(255 255 255)', // 纯白文字
    textMuted: 'rgb(158 158 158)', // 中灰色次要文字
    icon: 'rgb(158 158 158)', // 中灰色图标
    primary: 'rgb(33 150 243)', // Material 蓝色主色
    primaryBorder: 'rgb(3 169 244)', // 浅蓝色边框
    buttonBorder: 'rgb(66 66 66)', // 深灰色边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Material Light 主题
export const materialLightTheme: Theme = {
  colors: {
    background: 'rgb(250 250 250)', // Material 浅色背景
    text: 'rgb(33 33 33)', // 深灰色文字
    textMuted: 'rgb(117 117 117)', // 中灰色次要文字
    icon: 'rgb(117 117 117)', // 中灰色图标
    primary: 'rgb(33 150 243)', // Material 蓝色主色
    primaryBorder: 'rgb(3 169 244)', // 浅蓝色边框
    buttonBorder: 'rgb(224 224 224)', // 浅灰色边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// 赛博朋克主题
export const cyberpunkTheme: Theme = {
  colors: {
    background: 'rgb(13 13 13)', // 极深黑色背景
    text: 'rgb(0 255 255)', // 霓虹青色文字
    textMuted: 'rgb(255 20 147)', // 霓虹粉色次要文字
    icon: 'rgb(255 20 147)', // 霓虹粉色图标
    primary: 'rgb(57 255 20)', // 霓虹绿色主色
    primaryBorder: 'rgb(255 215 0)', // 霓虹黄色边框
    buttonBorder: 'rgb(75 0 130)', // 深紫色边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// 森林主题
export const forestTheme: Theme = {
  colors: {
    background: 'rgb(22 27 34)', // 深森林绿背景
    text: 'rgb(201 209 217)', // 浅绿白色文字
    textMuted: 'rgb(125 149 117)', // 森林绿次要文字
    icon: 'rgb(125 149 117)', // 森林绿图标
    primary: 'rgb(64 160 43)', // 鲜绿色主色
    primaryBorder: 'rgb(87 171 90)', // 浅绿色边框
    buttonBorder: 'rgb(33 41 46)', // 深绿灰色边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// 海洋主题
export const oceanTheme: Theme = {
  colors: {
    background: 'rgb(15 23 42)', // 深海蓝背景
    text: 'rgb(226 232 240)', // 海泡沫白色文字
    textMuted: 'rgb(100 116 139)', // 海蓝灰次要文字
    icon: 'rgb(100 116 139)', // 海蓝灰图标
    primary: 'rgb(14 165 233)', // 海洋蓝主色
    primaryBorder: 'rgb(56 189 248)', // 浅海蓝边框
    buttonBorder: 'rgb(30 41 59)', // 深海蓝边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// 日落主题
export const sunsetTheme: Theme = {
  colors: {
    background: 'rgb(45 21 76)', // 深紫色日落背景
    text: 'rgb(255 237 213)', // 温暖的米色文字
    textMuted: 'rgb(255 183 77)', // 金黄色次要文字
    icon: 'rgb(255 183 77)', // 金黄色图标
    primary: 'rgb(255 107 107)', // 珊瑚红主色
    primaryBorder: 'rgb(255 154 0)', // 橙色边框
    buttonBorder: 'rgb(69 39 160)', // 深紫色边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// 极光主题
export const auroraTheme: Theme = {
  colors: {
    background: 'rgb(17 24 39)', // 深夜蓝背景
    text: 'rgb(243 244 246)', // 雪白色文字
    textMuted: 'rgb(156 163 175)', // 银灰色次要文字
    icon: 'rgb(156 163 175)', // 银灰色图标
    primary: 'rgb(34 197 94)', // 极光绿主色
    primaryBorder: 'rgb(168 85 247)', // 极光紫边框
    buttonBorder: 'rgb(31 41 55)', // 深蓝灰边框
  },
  typography: {
    fontMono: 'Geist Mono, monospace',
    fontSans: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// 预设主题映射（精简版）
export const themePresets: Record<ThemePreset, Theme> = {
  'hypr-dark': defaultTheme,
  'hypr-light': lightTheme,
  'nord-dark': nordDarkTheme,
  'nord-light': nordLightTheme,
  'catppuccin-mocha': catppuccinMochaTheme,
  'catppuccin-latte': catppuccinLatteTheme,
  dracula: draculaTheme,
  'tokyo-night': tokyoNightTheme,
  'gruvbox-dark': gruvboxDarkTheme,
  'gruvbox-light': gruvboxLightTheme,
  'one-dark': oneDarkTheme,
  'solarized-dark': solarizedDarkTheme,
  'solarized-light': solarizedLightTheme,
  'material-dark': materialDarkTheme,
  'material-light': materialLightTheme,
  cyberpunk: cyberpunkTheme,
  forest: forestTheme,
  ocean: oceanTheme,
  sunset: sunsetTheme,
  aurora: auroraTheme,
};

// 主题元数据
export const themeMetadata: Record<ThemePreset, ThemeMetadata> = {
  'hypr-dark': {
    id: 'hypr-dark',
    name: 'HyprGlaze 深色',
    description: '默认的深色主题，现代简洁的设计风格',
    author: 'HyprGlaze Team',
    category: 'dark',
    tags: ['默认', '深色', '现代'],
    preview: {
      background: 'rgb(15 15 15)',
      primary: 'rgb(59 130 246)',
      text: 'rgb(255 255 255)',
    },
  },
  'hypr-light': {
    id: 'hypr-light',
    name: 'HyprGlaze 浅色',
    description: '清新的浅色主题，适合白天使用',
    author: 'HyprGlaze Team',
    category: 'light',
    tags: ['默认', '浅色', '清新'],
    preview: {
      background: 'rgb(255 255 255)',
      primary: 'rgb(59 130 246)',
      text: 'rgb(15 15 15)',
    },
  },
  'nord-dark': {
    id: 'nord-dark',
    name: 'Nord 深色',
    description: '来自北欧的冷色调深色主题',
    author: 'Arctic Ice Studio',
    category: 'dark',
    tags: ['Nord', '深色', '冷色调', '北欧'],
    preview: {
      background: 'rgb(46 52 64)',
      primary: 'rgb(136 192 208)',
      text: 'rgb(236 239 244)',
    },
  },
  'nord-light': {
    id: 'nord-light',
    name: 'Nord 浅色',
    description: 'Nord 主题的浅色版本',
    author: 'Arctic Ice Studio',
    category: 'light',
    tags: ['Nord', '浅色', '冷色调', '北欧'],
    preview: {
      background: 'rgb(236 239 244)',
      primary: 'rgb(94 129 172)',
      text: 'rgb(46 52 64)',
    },
  },
  'catppuccin-mocha': {
    id: 'catppuccin-mocha',
    name: 'Catppuccin Mocha',
    description: '温暖舒适的深色主题，如摩卡咖啡般醇厚',
    author: 'Catppuccin',
    category: 'dark',
    tags: ['Catppuccin', '深色', '温暖', '舒适'],
    preview: {
      background: 'rgb(30 30 46)',
      primary: 'rgb(137 180 250)',
      text: 'rgb(205 214 244)',
    },
  },
  'catppuccin-latte': {
    id: 'catppuccin-latte',
    name: 'Catppuccin Latte',
    description: '温和的浅色主题，如拿铁咖啡般柔和',
    author: 'Catppuccin',
    category: 'light',
    tags: ['Catppuccin', '浅色', '温和', '柔和'],
    preview: {
      background: 'rgb(239 241 245)',
      primary: 'rgb(30 102 245)',
      text: 'rgb(76 79 105)',
    },
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula',
    description: '经典的吸血鬼主题，神秘而优雅',
    author: 'Dracula Theme',
    category: 'dark',
    tags: ['Dracula', '深色', '经典', '神秘'],
    preview: {
      background: 'rgb(40 42 54)',
      primary: 'rgb(139 233 253)',
      text: 'rgb(248 248 242)',
    },
  },
  'tokyo-night': {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    description: '东京夜景主题，深邃的蓝紫色调',
    author: 'Tokyo Night',
    category: 'dark',
    tags: ['Tokyo Night', '深色', '蓝紫色', '现代'],
    preview: {
      background: 'rgb(26 27 38)',
      primary: 'rgb(125 207 255)',
      text: 'rgb(169 177 214)',
    },
  },
  'gruvbox-dark': {
    id: 'gruvbox-dark',
    name: 'Gruvbox 深色',
    description: '温暖复古的深色主题，舒适护眼',
    author: 'Gruvbox',
    category: 'dark',
    tags: ['Gruvbox', '深色', '温暖', '复古'],
    preview: {
      background: 'rgb(40 40 40)',
      primary: 'rgb(131 165 152)',
      text: 'rgb(235 219 178)',
    },
  },
  'gruvbox-light': {
    id: 'gruvbox-light',
    name: 'Gruvbox 浅色',
    description: 'Gruvbox 主题的浅色版本，温暖明亮',
    author: 'Gruvbox',
    category: 'light',
    tags: ['Gruvbox', '浅色', '温暖', '明亮'],
    preview: {
      background: 'rgb(251 241 199)',
      primary: 'rgb(121 116 14)',
      text: 'rgb(60 56 54)',
    },
  },
  'one-dark': {
    id: 'one-dark',
    name: 'One Dark',
    description: 'Atom 编辑器的经典深色主题',
    author: 'Atom',
    category: 'dark',
    tags: ['One Dark', '深色', '经典', '编辑器'],
    preview: {
      background: 'rgb(40 44 52)',
      primary: 'rgb(97 175 239)',
      text: 'rgb(171 178 191)',
    },
  },
  'solarized-dark': {
    id: 'solarized-dark',
    name: 'Solarized 深色',
    description: '经典的 Solarized 深色主题，护眼设计',
    author: 'Ethan Schoonover',
    category: 'dark',
    tags: ['Solarized', '深色', '护眼', '经典'],
    preview: {
      background: 'rgb(0 43 54)',
      primary: 'rgb(38 139 210)',
      text: 'rgb(131 148 150)',
    },
  },
  'solarized-light': {
    id: 'solarized-light',
    name: 'Solarized 浅色',
    description: 'Solarized 主题的浅色版本',
    author: 'Ethan Schoonover',
    category: 'light',
    tags: ['Solarized', '浅色', '护眼', '经典'],
    preview: {
      background: 'rgb(253 246 227)',
      primary: 'rgb(38 139 210)',
      text: 'rgb(101 123 131)',
    },
  },
  'material-dark': {
    id: 'material-dark',
    name: 'Material 深色',
    description: 'Google Material Design 深色主题',
    author: 'Google',
    category: 'dark',
    tags: ['Material', '深色', 'Google', '现代'],
    preview: {
      background: 'rgb(33 33 33)',
      primary: 'rgb(33 150 243)',
      text: 'rgb(255 255 255)',
    },
  },
  'material-light': {
    id: 'material-light',
    name: 'Material 浅色',
    description: 'Google Material Design 浅色主题',
    author: 'Google',
    category: 'light',
    tags: ['Material', '浅色', 'Google', '现代'],
    preview: {
      background: 'rgb(250 250 250)',
      primary: 'rgb(33 150 243)',
      text: 'rgb(33 33 33)',
    },
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: '赛博朋克',
    description: '未来科幻风格，霓虹色彩炫酷主题',
    author: 'HyprGlaze Team',
    category: 'dark',
    tags: ['赛博朋克', '深色', '霓虹', '科幻'],
    preview: {
      background: 'rgb(13 13 13)',
      primary: 'rgb(57 255 20)',
      text: 'rgb(0 255 255)',
    },
  },
  forest: {
    id: 'forest',
    name: '森林',
    description: '自然森林主题，绿色护眼配色',
    author: 'HyprGlaze Team',
    category: 'dark',
    tags: ['森林', '深色', '绿色', '自然'],
    preview: {
      background: 'rgb(22 27 34)',
      primary: 'rgb(64 160 43)',
      text: 'rgb(201 209 217)',
    },
  },
  ocean: {
    id: 'ocean',
    name: '海洋',
    description: '深海蓝色主题，宁静舒缓',
    author: 'HyprGlaze Team',
    category: 'dark',
    tags: ['海洋', '深色', '蓝色', '宁静'],
    preview: {
      background: 'rgb(15 23 42)',
      primary: 'rgb(14 165 233)',
      text: 'rgb(226 232 240)',
    },
  },
  sunset: {
    id: 'sunset',
    name: '日落',
    description: '温暖的日落色彩，浪漫优雅',
    author: 'HyprGlaze Team',
    category: 'dark',
    tags: ['日落', '深色', '温暖', '浪漫'],
    preview: {
      background: 'rgb(45 21 76)',
      primary: 'rgb(255 107 107)',
      text: 'rgb(255 237 213)',
    },
  },
  aurora: {
    id: 'aurora',
    name: '极光',
    description: '神秘的极光色彩，绿紫交融',
    author: 'HyprGlaze Team',
    category: 'dark',
    tags: ['极光', '深色', '神秘', '绿紫'],
    preview: {
      background: 'rgb(17 24 39)',
      primary: 'rgb(34 197 94)',
      text: 'rgb(243 244 246)',
    },
  },
};

// 主题映射（保持向后兼容）
export const themeMap: Record<ThemeMode, Theme> = {
  dark: defaultTheme,
  light: lightTheme,
  auto: defaultTheme, // auto模式默认使用深色主题，后续会根据系统偏好动态调整
};

// 主题工具函数
export const themeUtils = {
  // 获取CSS变量值
  getCSSVariable: (variableName: string): string => {
    return `var(--${variableName})`;
  },

  // 应用主题到CSS变量
  applyThemeToCSS: (theme: Theme): void => {
    const root = document.documentElement;

    // 应用颜色变量
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--color-${cssVarName}`, value);
    });

    // 应用字体变量
    Object.entries(theme.typography).forEach(([key, value]) => {
      const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--font-${cssVarName}`, value);
    });
  },

  // 根据主题模式获取主题对象
  getThemeByMode: (mode: ThemeMode): Theme => {
    return themeMap[mode];
  },

  // 保存主题偏好到localStorage
  saveThemePreference: (mode: ThemeMode): void => {
    try {
      localStorage.setItem('hyprglaze-theme-mode', mode);
    } catch (error) {
      console.warn('Failed to save theme preference to localStorage:', error);
    }
  },

  // 从localStorage加载主题偏好
  loadThemePreference: (): ThemeMode => {
    try {
      const saved = localStorage.getItem('hyprglaze-theme-mode');
      if (saved && ['dark', 'light', 'auto'].includes(saved)) {
        return saved as ThemeMode;
      }
    } catch (error) {
      console.warn('Failed to load theme preference from localStorage:', error);
    }
    return 'dark'; // 默认返回深色主题
  },

  // 检测系统主题偏好
  getSystemThemePreference: (): 'dark' | 'light' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // 默认深色主题
  },

  // 根据模式解析实际主题（处理auto模式）
  resolveThemeMode: (mode: ThemeMode): 'dark' | 'light' => {
    if (mode === 'auto') {
      return themeUtils.getSystemThemePreference();
    }
    return mode;
  },

  // 根据预设ID获取主题
  getThemeByPreset: (preset: ThemePreset): Theme => {
    return themePresets[preset];
  },

  // 获取主题元数据
  getThemeMetadata: (preset: ThemePreset): ThemeMetadata => {
    return themeMetadata[preset];
  },

  // 获取所有可用的主题预设
  getAllThemePresets: (): ThemePreset[] => {
    return Object.keys(themePresets) as ThemePreset[];
  },

  // 按类别筛选主题（简化版）
  getThemesByCategory: (category: 'dark' | 'light'): ThemePreset[] => {
    return Object.values(themeMetadata)
      .filter(meta => meta.category === category)
      .map(meta => meta.id);
  },

  // 保存预设主题偏好
  saveThemePresetPreference: (preset: ThemePreset): void => {
    try {
      localStorage.setItem('hyprglaze-theme-preset', preset);
    } catch (error) {
      console.warn('Failed to save theme preset preference to localStorage:', error);
    }
  },

  // 加载预设主题偏好
  loadThemePresetPreference: (): ThemePreset => {
    try {
      const saved = localStorage.getItem('hyprglaze-theme-preset');
      if (saved && saved in themePresets) {
        return saved as ThemePreset;
      }
    } catch (error) {
      console.warn('Failed to load theme preset preference from localStorage:', error);
    }
    return 'hypr-dark'; // 默认返回 HyprGlaze 深色主题
  },

  // 获取主题预设的预览颜色
  getThemePreview: (preset: ThemePreset): { background: string; primary: string; text: string } => {
    const metadata = themeMetadata[preset];
    return (
      metadata.preview || {
        background: 'rgb(15 15 15)',
        primary: 'rgb(59 130 246)',
        text: 'rgb(255 255 255)',
      }
    );
  },
};
