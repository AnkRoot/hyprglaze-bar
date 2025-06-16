import { WeatherDisplay } from "./WeatherDisplay";
import { TimeDisplay } from "./TimeDisplay";
import { CenterDisplayProps } from "../types";

// 移除了any类型，使用具体的类型定义

export function CenterDisplay({ }: CenterDisplayProps) {
  return (
    <div className="flex items-center gap-6">
      {/* 天气信息 */}
      <WeatherDisplay />

      {/* 时间显示 */}
      <TimeDisplay />
    </div>
  );
}
