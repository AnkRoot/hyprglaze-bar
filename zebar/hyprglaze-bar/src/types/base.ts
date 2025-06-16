// 基础类型定义
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 工具函数类型
export type ClassNameValue = string | number | boolean | undefined | null;
export type ClassNameArray = ClassNameValue[];
export type ClassNameObject = Record<string, any>;
export type ClassNameInput = ClassNameValue | ClassNameArray | ClassNameObject;

// 事件处理类型
export type EventHandler<T = void> = () => T;
export type EventHandlerWithParam<P, T = void> = (param: P) => T;

// API状态类型
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ApiState<T> {
  data: T | null;
  status: ApiStatus;
  error: string | null;
}

// 错误处理类型
export type ErrorSeverity = 'low' | 'medium' | 'high';

export interface AppError {
  message: string;
  code: string;
  severity: ErrorSeverity;
  timestamp: Date;
  context?: string;
}
