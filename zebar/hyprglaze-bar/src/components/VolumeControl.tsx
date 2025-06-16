import { useState, useRef, useEffect } from "react";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { AudioOutput } from "zebar";
import { Chip } from "./common/Chip";
import { motion, AnimatePresence } from "framer-motion";

interface VolumeControlProps {
  audio: AudioOutput | null;
}

export function VolumeControl({ audio }: VolumeControlProps) {
  const [expanded, setExpanded] = useState(false);
  const previousVolumeRef = useRef<number>(50); // 记住禁音前的音量
  const containerRef = useRef<HTMLDivElement>(null);
  const autoCollapseTimerRef = useRef<NodeJS.Timeout>();

  // 提前检查，避免在hooks之后返回
  const hasAudio = audio && audio.defaultPlaybackDevice;
  const device = hasAudio ? audio.defaultPlaybackDevice : null;
  const volume = device ? Math.round(device.volume) : 0;

  // 智能检测禁音状态 - 兼容系统快捷键和点击图标两种禁音方式
  const isMuted = device ? (device.isMuted || volume === 0) : false;

  // 监听音量变化，智能更新音量记忆
  useEffect(() => {
    if (!hasAudio || !device) return;

    // 更新音量记忆的策略：
    // 1. 正常播放时（非禁音且音量>0）：保存音量
    // 2. 系统快捷键禁音时（isMuted=true且音量>0）：也要保存音量，因为这是用户想恢复的目标音量
    if (volume > 0) {
      previousVolumeRef.current = volume;
    }
  }, [volume, hasAudio, device]);

  // 点击外部区域收缩滑块
  useEffect(() => {
    // 如果没有音频设备，不执行任何操作
    if (!hasAudio) return;

    const startAutoCollapseTimer = () => {
      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
      }
      autoCollapseTimerRef.current = setTimeout(() => {
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
  }, [expanded, hasAudio]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!hasAudio || !audio) return;
    const delta = e.deltaY > 0 ? -5 : 5;
    const newVolume = Math.min(Math.max(volume + delta, 0), 100);
    audio.setVolume?.(newVolume);
  };

  // 点击图标切换禁音
  const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 防止事件冒泡
    if (!hasAudio || !audio || !device) return;

    if (isMuted) {
      // 解除禁音：恢复到记忆的音量
      const targetVolume = previousVolumeRef.current;
      audio.setVolume?.(targetVolume);
    } else {
      // 设置禁音：保存当前音量并设为0
      if (volume > 0) {
        previousVolumeRef.current = volume;
      }
      audio.setVolume?.(0);
    }
  };

  // 点击音量百分比展开滑块
  const handleVolumeTextClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation(); // 防止事件冒泡
    if (expanded) {
      // 如果已展开，直接收缩
      setExpanded(false);
      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
        autoCollapseTimerRef.current = undefined;
      }
    } else {
      // 如果未展开，展开并启动自动收缩计时器
      setExpanded(true);
    }
  };

  // 滑块交互时重置自动收缩计时器
  const handleSliderInteraction = () => {
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current);
      autoCollapseTimerRef.current = undefined;
    }
    // 重新启动计时器
    autoCollapseTimerRef.current = setTimeout(() => {
      setExpanded(false);
    }, 3000);
  };

  const renderIcon = () => {
    if (!hasAudio || !device) {
      return <VolumeX className="h-3 w-3 text-gray-400" strokeWidth={3} data-testid="volume-x" />;
    }

    // 使用统一的禁音状态检测
    if (isMuted) {
      return <VolumeX className="h-3 w-3 text-red-400" strokeWidth={3} data-testid="volume-x" />;
    } else if (volume < 30) {
      return <Volume className="h-3 w-3 text-icon" strokeWidth={3} data-testid="volume" />;
    } else if (volume < 70) {
      return <Volume1 className="h-3 w-3 text-icon" strokeWidth={3} data-testid="volume-1" />;
    } else {
      return <Volume2 className="h-3 w-3 text-icon" strokeWidth={3} data-testid="volume-2" />;
    }
  };

  // 如果没有音频设备，显示禁用状态
  if (!hasAudio) {
    return (
      <Chip
        className="flex items-center gap-1 h-full px-1.5 min-w-fit relative group opacity-50"
        as="div"
        title="音频设备不可用"
      >
        <div className="cursor-not-allowed">
          {renderIcon()}
        </div>
        <span className="text-xs min-w-5 text-right text-text/50 font-medium tabular-nums">
          --
        </span>
      </Chip>
    );
  }

  return (
    <Chip
      ref={containerRef}
      className="flex items-center gap-1 h-full px-1.5 min-w-fit relative group"
      as="div"
      onWheel={handleWheel}
      title="滚轮调节音量，点击图标切换静音，点击百分比展开滑块"
    >
      <motion.div
        className="cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        onClick={handleIconClick}
      >
        {renderIcon()}
      </motion.div>

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
            <div className="relative mx-1">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => audio?.setVolume?.(parseInt(e.target.value))}
                onMouseDown={handleSliderInteraction}
                onMouseMove={handleSliderInteraction}
                className="modern-slider w-10 h-1 bg-transparent rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right,
                    hsl(${Math.max(0, 120 - volume * 1.2)}, 70%, 50%) 0%,
                    hsl(${Math.max(0, 120 - volume * 1.2)}, 70%, 50%) ${volume}%,
                    rgb(var(--button-border)) ${volume}%,
                    rgb(var(--button-border)) 100%)`
                }}
              />
              {/* 滑块轨道发光效果 */}
              <div
                className="absolute top-0 left-0 h-1 rounded-full pointer-events-none opacity-30 blur-sm"
                style={{
                  width: `${volume}%`,
                  background: `hsl(${Math.max(0, 120 - volume * 1.2)}, 70%, 50%)`
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.span
        className="text-xs min-w-5 text-right text-text/90 font-medium tabular-nums cursor-pointer"
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={handleVolumeTextClick}
      >
        {volume}%
      </motion.span>
    </Chip>
  );
}
