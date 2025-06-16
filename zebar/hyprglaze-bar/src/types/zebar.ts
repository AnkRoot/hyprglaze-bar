// 扩展Zebar类型定义
import type { GlazeWmOutput, CpuOutput, MemoryOutput, AudioOutput, SystrayOutput, NetworkOutput } from 'zebar';

// 扩展的Zebar输出类型
export interface ExtendedGlazeWmOutput extends GlazeWmOutput {
  // 可以在这里添加自定义的GlazeWM属性
}

export interface ExtendedCpuOutput extends CpuOutput {
  // 可以在这里添加自定义的CPU属性
}

export interface ExtendedMemoryOutput extends MemoryOutput {
  // 可以在这里添加自定义的内存属性
}

export interface ExtendedAudioOutput extends AudioOutput {
  // 可以在这里添加自定义的音频属性
}

export interface ExtendedSystrayOutput extends SystrayOutput {
  // 可以在这里添加自定义的系统托盘属性
}

export interface ExtendedNetworkOutput extends NetworkOutput {
  // 可以在这里添加自定义的网络属性
}

// 提供者输出映射
export interface ProviderOutputMap {
  glazewm: ExtendedGlazeWmOutput | null;
  cpu: ExtendedCpuOutput | null;
  memory: ExtendedMemoryOutput | null;
  audio: ExtendedAudioOutput | null;
  systray: ExtendedSystrayOutput | null;
  network: ExtendedNetworkOutput | null;
}

// 组件Props类型（使用扩展的Zebar类型）
export interface TilingControlProps {
  glazewm: ExtendedGlazeWmOutput | null;
}

export interface WorkspaceControlsProps {
  glazewm: ExtendedGlazeWmOutput | null;
}

export interface SystemStatsProps {
  cpu: ExtendedCpuOutput | null;
  memory: ExtendedMemoryOutput | null;
  network: ExtendedNetworkOutput | null;
  onTaskManagerClick?: () => void;
}

export interface VolumeControlProps {
  audio: ExtendedAudioOutput | null;
}

export interface SystemTrayProps {
  systray: ExtendedSystrayOutput | null;
}

// WebSocket相关类型
export interface AutoTilingConfig {
  enabled: boolean;
  websocketUrl: string;
  reconnectInterval: number;
  maxReconnectAttempts: number;
}

export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
}

// 命令执行类型
export type GlazeWmCommand =
  | 'toggle-tiling-direction'
  | 'focus-workspace'
  | 'move-to-workspace'
  | 'close-window'
  | 'toggle-floating'
  | 'shell-exec';

export interface CommandExecutor {
  runCommand: (command: string) => void;
}

// 工作区相关类型
export interface Workspace {
  name: string;
  displayName?: string;
  hasFocus: boolean;
  isDisplayed: boolean;
}

export interface WorkspaceEvent {
  type: 'focus' | 'create' | 'destroy' | 'rename';
  workspace: Workspace;
  timestamp: Date;
}

// 窗口相关类型
export interface WindowInfo {
  id: string;
  title: string;
  className: string;
  processName: string;
  hasFocus: boolean;
  isFloating: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
}

export interface WindowEvent {
  type: 'focus' | 'create' | 'destroy' | 'move' | 'resize';
  window: WindowInfo;
  timestamp: Date;
}
