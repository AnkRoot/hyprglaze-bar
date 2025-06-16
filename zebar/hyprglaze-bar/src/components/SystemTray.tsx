import { SystrayOutput } from "zebar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { handleError, logError } from "../utils/errorHandler";
import { withErrorBoundary } from "./ErrorBoundary";

interface SystemTrayProps {
  systray: SystrayOutput | null;
}

// 图标优先级排序
const getIconPriority = (icon: any): number => {
  const name = (icon.tooltip || '').toLowerCase();

  // 定义关键词匹配函数
  const matchesAny = (keywords: string[]) => keywords.some(keyword => name.includes(keyword));

  // 常用应用优先级最高（数值最小）
  if (name.includes('steam')) return 1;
  if (name.includes('discord')) return 2;
  if (name.includes('spotify')) return 3;
  if (matchesAny(['chrome', 'firefox', 'edge', 'browser'])) return 4;

  // 其他应用
  if (name.includes('其他应用关键词')) return 20;

  // 系统核心图标优先级最低（数值最大，排在最后）
  if (matchesAny(['立即开会'])) return 89;
  if (matchesAny(['windows security', 'defender', '安全', '防护'])) return 90;
  if (matchesAny(['bluetooth', '蓝牙', 'bt'])) return 91;
  if (matchesAny(['network', '网络', 'wifi', 'ethernet', '以太网'])) return 92;
  if (matchesAny(['volume', '音量', '声音', '音频', '扬声器', 'speaker', 'audio'])) return 93;
  if (matchesAny(['battery', '电池', '电量', 'power', '电源','剩余','充电'])) return 94;

  // 默认其他应用
  return 50;
};

function SystemTrayComponent({ systray }: SystemTrayProps) {
  const [displayIcons, setDisplayIcons] = useState<any[]>([]);

  // 🎯 实时更新系统托盘图标
  useEffect(() => {
    if (!systray || !systray.icons) {
      setDisplayIcons([]);
      return;
    }

    // Windows 系统任务栏实时同步逻辑 - 改进版
    const uniqueIcons = systray.icons.filter((icon, index, array) => {
      // 使用多重标识符确保唯一性
      const iconHash = icon.iconHash || icon.id || icon.iconUrl;
      const processName = icon.processName || '';
      const tooltip = icon.tooltip || '';

      // 创建复合唯一标识符
      const compositeId = `${iconHash}-${processName}-${tooltip}`;

      // 只保留第一个出现的图标（基于复合ID去重）
      return array.findIndex(item => {
        const itemCompositeId = `${item.iconHash || item.id || item.iconUrl}-${item.processName || ''}-${item.tooltip || ''}`;
        return itemCompositeId === compositeId;
      }) === index;
    });

    setDisplayIcons(uniqueIcons);
  }, [systray, systray?.icons]);

  if (!systray || displayIcons.length === 0) return null;

  // 对去重后的图标进行排序
  const icons = [...displayIcons].sort((a, b) => {
    const priorityA = getIconPriority(a);
    const priorityB = getIconPriority(b);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // 相同优先级按名称排序
    return (a.tooltip || '').localeCompare(b.tooltip || '');
  });

  const handleIconClick = (icon: any) => {
    try {
      if (systray?.onLeftClick) {
        systray.onLeftClick(icon.id);
      }
    } catch (error) {
      const appError = handleError(error, 'SystemTray.handleIconClick');
      logError(appError);
    }
  };

  const handleIconRightClick = (icon: any, e: React.MouseEvent) => {
    try {
      e.preventDefault();
      if (systray?.onRightClick) {
        systray.onRightClick(icon.id);
      }
    } catch (error) {
      const appError = handleError(error, 'SystemTray.handleIconRightClick');
      logError(appError);
    }
  };

  return (
    <motion.div
      className="flex items-center gap-1.5"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, staggerChildren: 0.05 }}
    >
      {icons.map((icon, index) => (
        <motion.div
          key={`${icon.id}-${icon.tooltip || 'unknown'}-${index}`} // 改进key生成避免重复
          className="flex items-center justify-center w-4 h-4 cursor-pointer hover:opacity-80 transition-all duration-200 hover:scale-110"
          onClick={() => handleIconClick(icon)}
          onContextMenu={(e) => handleIconRightClick(icon, e)}
          title={icon.tooltip}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            delay: index * 0.02,
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.1 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {icon.iconUrl ? (
            <img
              src={icon.iconUrl}
              alt={icon.tooltip}
              className="w-4 h-4 object-contain"
              loading="lazy"
              onError={(e) => {
                // 图标加载失败时显示备用图标
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-4 h-4 bg-icon/30 rounded-xs flex items-center justify-center">
                      <span class="text-xs text-icon">?</span>
                    </div>
                  `;
                }
              }}
            />
          ) : (
            <div className="w-4 h-4 bg-icon/30 rounded-xs flex items-center justify-center">
              <span className="text-xs text-icon">?</span>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

// 使用错误边界包装组件
export const SystemTray = withErrorBoundary(SystemTrayComponent, {
  fallback: (error, retry) => (
    <div className="flex items-center gap-1.5 text-xs text-red-400">
      <span>托盘错误</span>
      <button
        onClick={retry}
        className="text-xs text-primary hover:text-primary/80 ml-1"
      >
        重试
      </button>
    </div>
  ),
});
