import { Cpu, MemoryStick } from "lucide-react";
import { CpuOutput, MemoryOutput } from "zebar";
import { Chip } from "./common/Chip";
import { motion } from "framer-motion";

interface SystemStatsProps {
  cpu: CpuOutput | null;
  memory: MemoryOutput | null;
  onTaskManagerClick?: () => void;
}

export function SystemStats({ cpu, memory, onTaskManagerClick }: SystemStatsProps) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* CPU 使用率 */}
      {cpu && (
        <Chip
          className="flex items-center gap-1.5 h-full cursor-pointer"
          as="button"
          onClick={onTaskManagerClick}
          title={`CPU 使用率: ${Math.round(cpu.usage)}%\n点击打开任务管理器`}
        >
          <Cpu className="h-3 w-3 text-icon" />
          <span className="text-xs font-medium">{Math.round(cpu.usage)}%</span>
        </Chip>
      )}

      {/* 内存使用率 */}
      {memory && (
        <Chip
          className="flex items-center gap-1.5 h-full cursor-pointer"
          as="button"
          onClick={onTaskManagerClick}
          title={`内存使用率: ${Math.round(memory.usage)}%\n点击打开任务管理器`}
        >
          <MemoryStick className="h-3 w-3 text-icon" />
          <span className="text-xs font-medium">{Math.round(memory.usage)}%</span>
        </Chip>
      )}
    </motion.div>
  );
}
