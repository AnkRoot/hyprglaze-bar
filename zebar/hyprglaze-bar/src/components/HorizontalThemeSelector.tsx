import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { ThemePreset, themeUtils } from '../theme';
import { Chip } from './common/Chip';
import { motion, AnimatePresence } from 'framer-motion';

interface HorizontalThemeSelectorProps {
  className?: string;
}

export function HorizontalThemeSelector({}: HorizontalThemeSelectorProps) {
  const { currentPreset, setThemePreset } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<ThemePreset | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoCollapseTimerRef = useRef<number | undefined>(undefined);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 获取所有主题预设
  const allPresets = themeUtils.getAllThemePresets();

  // 获取当前主题的预览信息
  const currentThemePreview = themeUtils.getThemePreview(currentPreset);
  const currentThemeMetadata = themeUtils.getThemeMetadata(currentPreset);

  // 点击外部区域收缩选择器
  useEffect(() => {
    const startAutoCollapseTimer = () => {
      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
      }
      autoCollapseTimerRef.current = window.setTimeout(() => {
        setExpanded(false);
      }, 3000); // 3秒后自动收缩
    };

    const clearAutoCollapseTimer = () => {
      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
        autoCollapseTimerRef.current = undefined;
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (expanded && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(false);
        clearAutoCollapseTimer();
      }
    };

    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside);
      startAutoCollapseTimer();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearAutoCollapseTimer();
    };
  }, [expanded]);

  // 处理主题选择
  const handleThemeSelect = (preset: ThemePreset) => {
    setThemePreset(preset);
    setExpanded(false); // 选择后收缩
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current);
      autoCollapseTimerRef.current = undefined;
    }
  };

  // 点击图标展开/收缩选择器
  const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (expanded) {
      setExpanded(false);
      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
        autoCollapseTimerRef.current = undefined;
      }
    } else {
      setExpanded(true);
    }
  };

  // 选择器交互时重置自动收缩计时器
  const handleSelectorInteraction = () => {
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current);
      autoCollapseTimerRef.current = undefined;
    }
    // 重新启动计时器
    autoCollapseTimerRef.current = window.setTimeout(() => {
      setExpanded(false);
    }, 3000);
  };

  return (
    <Chip
      ref={containerRef}
      className="flex items-center gap-1 h-full px-1.5 min-w-fit relative group cursor-pointer"
      as="div"
      title={`当前主题: ${currentThemeMetadata.name} - 点击切换主题`}
      onClick={handleIconClick}
    >
      {/* 主题图标 - 显示当前主题的代表色 */}
      <motion.div
        className="flex items-center gap-0.5"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* 当前主题的主色调指示器 */}
        <div
          className="w-3 h-3 rounded-full border border-white/30 shadow-sm"
          style={{ backgroundColor: currentThemePreview.primary }}
        />
        {/* 当前主题的背景色指示器 */}
        <div
          className="w-1.5 h-1.5 rounded-full border border-white/20"
          style={{ backgroundColor: currentThemePreview.background }}
        />
      </motion.div>

      {/* 展开的主题选择器 */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ width: 0, opacity: 0, scale: 0.8 }}
            animate={{ width: "auto", opacity: 1, scale: 1 }}
            exit={{ width: 0, opacity: 0, scale: 0.8 }}
            className="overflow-hidden flex items-center"
            transition={{
              type: "spring",
              duration: 0.3,
              bounce: 0.1,
              staggerChildren: 0.05
            }}
          >
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5 px-1 mx-1 cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                maxWidth: '240px', // 增加最大宽度以容纳更多主题
                userSelect: 'none'
              }}
              onMouseDown={handleSelectorInteraction}
              onMouseMove={handleSelectorInteraction}
              onWheel={(e) => {
                // 支持鼠标滚轮水平滚动
                e.preventDefault();
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollLeft += e.deltaY;
                }
                handleSelectorInteraction();
              }}
            >
              {allPresets.map((preset) => {
                const metadata = themeUtils.getThemeMetadata(preset);
                const preview = themeUtils.getThemePreview(preset);
                const isSelected = preset === currentPreset;

                return (
                  <button
                    key={preset}
                    onClick={(e) => {
                      e.stopPropagation(); // 防止事件冒泡到父容器
                      handleThemeSelect(preset);
                    }}
                    onMouseEnter={() => setHoveredTheme(preset)}
                    onMouseLeave={() => setHoveredTheme(null)}
                    className={`
                      flex-shrink-0 flex items-center justify-center p-1 rounded-md
                      transition-all duration-150 ease-out
                      hover:scale-105 hover:shadow-sm cursor-pointer
                      focus:outline-none focus:ring-1 focus:ring-primary/50
                      ${isSelected
                        ? 'ring-1 ring-primary shadow-md scale-105 bg-primary/5'
                        : 'hover:bg-button-border/20'
                      }
                    `}
                    title={metadata.name}
                    style={{ minWidth: '32px', height: '24px' }} // 稍微增大点击区域
                  >
                    {/* 主题色彩图标 */}
                    <div className="flex items-center gap-0.5">
                      {/* 主色调指示器 */}
                      <div
                        className={`w-2.5 h-2.5 rounded-full border transition-all duration-150 ${
                          isSelected ? 'border-white/50 shadow-sm scale-110' : 'border-white/30'
                        }`}
                        style={{ backgroundColor: preview.primary }}
                      />
                      {/* 背景色指示器 */}
                      <div
                        className={`w-1 h-1 rounded-full border transition-all duration-150 ${
                          isSelected ? 'border-white/40' : 'border-white/20'
                        }`}
                        style={{ backgroundColor: preview.background }}
                      />
                    </div>

                    {/* 选中指示器 */}
                    {isSelected && (
                      <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2">
                        <div className="w-0.5 h-0.5 bg-primary rounded-full" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* 悬浮工具提示 */}
      {hoveredTheme && expanded && (
        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-background/95 border border-button-border rounded-sm px-1.5 py-0.5 text-xs text-text whitespace-nowrap shadow-md backdrop-blur-sm">
            {themeUtils.getThemeMetadata(hoveredTheme).name}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-button-border" />
          </div>
        </div>
      )}
    </Chip>
  );
}

export default HorizontalThemeSelector;

/**
 * 紧凑型主题选择器组件
 *
 * 功能特点：
 * - 默认收缩状态：显示当前主题的代表色（主色调 + 背景色双圆点）
 * - 点击展开：显示所有可用主题的水平滚动选择器
 * - 自动收缩：3秒无操作后自动收缩，点击外部区域立即收缩
 * - 视觉一致性：与音量控制采用相同的交互模式和动画效果
 * - 主题预览：悬浮时显示主题名称工具提示
 * - 响应式设计：适配不同屏幕尺寸，最大宽度200px
 *
 * 交互方式：
 * - 点击图标：展开/收缩主题选择器
 * - 点击主题名称：展开/收缩主题选择器
 * - 点击主题色彩：选择对应主题并自动收缩
 * - 鼠标悬浮：显示主题名称提示
 * - 点击外部：立即收缩选择器
 * - 自动收缩：3秒无操作后自动收缩
 */
