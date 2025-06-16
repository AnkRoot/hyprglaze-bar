import { AppError, ErrorSeverity } from '../types';

// 自定义错误类
export class HyprGlazeError extends Error {
  public readonly code: string;
  public readonly severity: ErrorSeverity;
  public readonly timestamp: Date;
  public readonly context?: string;

  constructor(
    message: string, 
    code: string, 
    severity: ErrorSeverity = 'medium',
    context?: string
  ) {
    super(message);
    this.name = 'HyprGlazeError';
    this.code = code;
    this.severity = severity;
    this.timestamp = new Date();
    this.context = context;
  }

  toAppError(): AppError {
    return {
      message: this.message,
      code: this.code,
      severity: this.severity,
      timestamp: this.timestamp,
      context: this.context,
    };
  }
}

// 错误代码常量
export const ERROR_CODES = {
  // 网络相关错误
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_TIMEOUT: 'API_TIMEOUT',
  API_RESPONSE_ERROR: 'API_RESPONSE_ERROR',
  
  // 地理位置相关错误
  GEOLOCATION_DENIED: 'GEOLOCATION_DENIED',
  GEOLOCATION_UNAVAILABLE: 'GEOLOCATION_UNAVAILABLE',
  GEOLOCATION_TIMEOUT: 'GEOLOCATION_TIMEOUT',
  
  // 天气服务相关错误
  WEATHER_API_ERROR: 'WEATHER_API_ERROR',
  WEATHER_DATA_INVALID: 'WEATHER_DATA_INVALID',
  
  // 系统相关错误
  WEBSOCKET_CONNECTION_ERROR: 'WEBSOCKET_CONNECTION_ERROR',
  COMMAND_EXECUTION_ERROR: 'COMMAND_EXECUTION_ERROR',
  
  // 通用错误
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const;

// 错误处理函数
export const handleError = (error: unknown, context?: string): AppError => {
  console.error(`[${context || 'Unknown'}] Error:`, error);

  // 如果已经是HyprGlazeError，直接返回
  if (error instanceof HyprGlazeError) {
    return error.toAppError();
  }

  // 如果是标准Error对象
  if (error instanceof Error) {
    return new HyprGlazeError(
      error.message,
      ERROR_CODES.UNKNOWN_ERROR,
      'medium',
      context
    ).toAppError();
  }

  // 如果是字符串错误
  if (typeof error === 'string') {
    return new HyprGlazeError(
      error,
      ERROR_CODES.UNKNOWN_ERROR,
      'medium',
      context
    ).toAppError();
  }

  // 未知错误类型
  return new HyprGlazeError(
    '发生了未知错误',
    ERROR_CODES.UNKNOWN_ERROR,
    'medium',
    context
  ).toAppError();
};

// 特定错误创建函数
export const createNetworkError = (message: string, context?: string): HyprGlazeError => {
  return new HyprGlazeError(message, ERROR_CODES.NETWORK_ERROR, 'high', context);
};

export const createGeolocationError = (message: string, context?: string): HyprGlazeError => {
  return new HyprGlazeError(message, ERROR_CODES.GEOLOCATION_DENIED, 'medium', context);
};

export const createWeatherApiError = (message: string, context?: string): HyprGlazeError => {
  return new HyprGlazeError(message, ERROR_CODES.WEATHER_API_ERROR, 'medium', context);
};

export const createWebSocketError = (message: string, context?: string): HyprGlazeError => {
  return new HyprGlazeError(message, ERROR_CODES.WEBSOCKET_CONNECTION_ERROR, 'low', context);
};

// 错误重试机制
export interface RetryOptions {
  maxAttempts: number;
  delay: number;
  backoff?: boolean;
}

export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === options.maxAttempts) {
        throw lastError;
      }
      
      const delay = options.backoff 
        ? options.delay * Math.pow(2, attempt - 1)
        : options.delay;
        
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};

// 错误日志记录
export const logError = (error: AppError): void => {
  const logLevel = error.severity === 'high' ? 'error' : 
                   error.severity === 'medium' ? 'warn' : 'info';
  
  console[logLevel](`[${error.code}] ${error.message}`, {
    severity: error.severity,
    timestamp: error.timestamp,
    context: error.context,
  });
};
