import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { handleError, logError } from '../utils/errorHandler';
import { AppError } from '../types';

interface ErrorBoundaryState {
  hasError: boolean;
  error: AppError | null;
  errorId: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: AppError, retry: () => void) => ReactNode;
  onError?: (error: AppError, errorInfo: ErrorInfo) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const appError = handleError(error, 'ErrorBoundary');
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error: appError,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const appError = handleError(error, 'ErrorBoundary');
    logError(appError);
    
    // 调用自定义错误处理函数
    if (this.props.onError) {
      this.props.onError(appError, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorId: '',
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // 如果提供了自定义fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      // 默认错误UI
      return (
        <DefaultErrorFallback 
          error={this.state.error} 
          onRetry={this.handleRetry}
          errorId={this.state.errorId}
        />
      );
    }

    return this.props.children;
  }
}

// 默认错误回退组件
interface DefaultErrorFallbackProps {
  error: AppError;
  onRetry: () => void;
  errorId: string;
}

function DefaultErrorFallback({ error, onRetry, errorId }: DefaultErrorFallbackProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 border-blue-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className={`
      flex flex-col items-center justify-center p-4 rounded-lg border
      ${getSeverityBg(error.severity)}
      min-h-[100px] max-w-md mx-auto
    `}>
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className={`h-5 w-5 ${getSeverityColor(error.severity)}`} />
        <span className="text-sm font-medium text-text">
          出现错误
        </span>
      </div>
      
      <p className="text-xs text-text/70 text-center mb-3 leading-relaxed">
        {error.message}
      </p>
      
      <div className="flex items-center gap-3">
        <button
          onClick={onRetry}
          className="
            flex items-center gap-1.5 px-3 py-1.5 
            bg-primary/20 hover:bg-primary/30 
            border border-primary/30 hover:border-primary/50
            rounded-md text-xs font-medium text-primary
            transition-colors duration-200
          "
        >
          <RefreshCw className="h-3 w-3" />
          重试
        </button>
        
        <span className="text-xs text-text/50">
          错误ID: {errorId.slice(-8)}
        </span>
      </div>
      
      {error.context && (
        <div className="mt-2 text-xs text-text/40">
          上下文: {error.context}
        </div>
      )}
    </div>
  );
}

// 高阶组件：为组件添加错误边界
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}
