import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";

interface TimeDisplayProps {
  className?: string;
}

export function TimeDisplay({ className = "" }: TimeDisplayProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSeconds, setShowSeconds] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    // 每秒更新时间
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // 格式化时间
  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      ...(showSeconds && { second: "2-digit" }),
      hour12: false
    };

    return new Intl.DateTimeFormat("zh-CN", options).format(date);
  };

  // 获取时间部分
  const getTimeParts = (date: Date) => {
    const timeStr = date.toLocaleTimeString("zh-CN", { 
      hour: "2-digit", 
      minute: "2-digit",
      ...(showSeconds && { second: "2-digit" }),
      hour12: false 
    });
    
    const dateStr = date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long"
    });

    return { timeStr, dateStr };
  };

  const { timeStr, dateStr } = getTimeParts(currentTime);

  return (
    <motion.div 
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* 日期部分 */}
      <div className="flex items-center gap-1.5 text-text/70 text-xs">
        <Calendar className="w-3 h-3" />
        <span>{dateStr}</span>
      </div>
      
      {/* 时间部分 */}
      <motion.div 
        className="flex items-center gap-1.5 text-text font-medium text-sm cursor-pointer"
        onClick={() => setShowSeconds(!showSeconds)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        title={showSeconds ? "点击隐藏秒数" : "点击显示秒数"}
      >
        <Clock className="w-4 h-4" />
        <span className="font-mono">
          {timeStr}
        </span>
      </motion.div>
    </motion.div>
  );
}
