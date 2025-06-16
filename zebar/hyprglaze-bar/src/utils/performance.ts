import { useCallback, useRef, useEffect, useMemo } from 'react';

// 防抖钩子
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

// 节流钩子
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCallRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallRef.current;

      if (timeSinceLastCall >= delay) {
        lastCallRef.current = now;
        callback(...args);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          lastCallRef.current = Date.now();
          callback(...args);
        }, delay - timeSinceLastCall);
      }
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

// 内存使用监控
export class MemoryMonitor {
  private static instance: MemoryMonitor;
  private observers: Set<(info: MemoryInfo) => void> = new Set();
  private intervalId: NodeJS.Timeout | null = null;

  static getInstance(): MemoryMonitor {
    if (!MemoryMonitor.instance) {
      MemoryMonitor.instance = new MemoryMonitor();
    }
    return MemoryMonitor.instance;
  }

  startMonitoring(interval: number = 5000): void {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        this.notifyObservers(memInfo);
      }
    }, interval);
  }

  stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  addObserver(observer: (info: MemoryInfo) => void): () => void {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }

  private notifyObservers(info: MemoryInfo): void {
    this.observers.forEach(observer => observer(info));
  }

  getCurrentMemoryInfo(): MemoryInfo | null {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  }
}

// 性能指标收集
export interface PerformanceMetrics {
  renderTime: number;
  componentCount: number;
  memoryUsage?: MemoryInfo;
  timestamp: number;
}

export class PerformanceCollector {
  private static instance: PerformanceCollector;
  private metrics: PerformanceMetrics[] = [];
  private maxMetrics = 100; // 最多保存100条记录

  static getInstance(): PerformanceCollector {
    if (!PerformanceCollector.instance) {
      PerformanceCollector.instance = new PerformanceCollector();
    }
    return PerformanceCollector.instance;
  }

  recordMetric(metric: Omit<PerformanceMetrics, 'timestamp'>): void {
    const fullMetric: PerformanceMetrics = {
      ...metric,
      timestamp: Date.now(),
    };

    this.metrics.push(fullMetric);

    // 保持数组大小在限制内
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  getAverageRenderTime(lastN?: number): number {
    const metricsToAnalyze = lastN 
      ? this.metrics.slice(-lastN) 
      : this.metrics;

    if (metricsToAnalyze.length === 0) return 0;

    const totalTime = metricsToAnalyze.reduce(
      (sum, metric) => sum + metric.renderTime, 
      0
    );

    return totalTime / metricsToAnalyze.length;
  }

  clearMetrics(): void {
    this.metrics = [];
  }
}

// 渲染性能监控钩子
export function useRenderPerformance(componentName: string) {
  const renderStartRef = useRef<number>();
  const performanceCollector = PerformanceCollector.getInstance();

  useEffect(() => {
    renderStartRef.current = performance.now();
  });

  useEffect(() => {
    if (renderStartRef.current) {
      const renderTime = performance.now() - renderStartRef.current;
      
      performanceCollector.recordMetric({
        renderTime,
        componentCount: 1,
        memoryUsage: MemoryMonitor.getInstance().getCurrentMemoryInfo() || undefined,
      });

      if (renderTime > 16) { // 超过一帧的时间
        console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`);
      }
    }
  });
}

// 虚拟化列表钩子（用于大量数据渲染）
export function useVirtualization<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) {
  return useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const totalHeight = items.length * itemHeight;

    return {
      totalHeight,
      visibleCount,
      getVisibleItems: (scrollTop: number) => {
        const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
        const endIndex = Math.min(
          items.length - 1,
          startIndex + visibleCount + overscan * 2
        );

        return {
          startIndex,
          endIndex,
          items: items.slice(startIndex, endIndex + 1),
          offsetY: startIndex * itemHeight,
        };
      },
    };
  }, [items, itemHeight, containerHeight, overscan]);
}

// 懒加载钩子
export function useLazyLoad(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, hasLoaded]);

  return { elementRef, isVisible, hasLoaded };
}

// 资源预加载
export function preloadResource(url: string, type: 'image' | 'script' | 'style'): Promise<void> {
  return new Promise((resolve, reject) => {
    let element: HTMLImageElement | HTMLScriptElement | HTMLLinkElement;

    switch (type) {
      case 'image':
        element = new Image();
        (element as HTMLImageElement).src = url;
        break;
      case 'script':
        element = document.createElement('script');
        (element as HTMLScriptElement).src = url;
        break;
      case 'style':
        element = document.createElement('link');
        (element as HTMLLinkElement).rel = 'stylesheet';
        (element as HTMLLinkElement).href = url;
        break;
    }

    element.onload = () => resolve();
    element.onerror = () => reject(new Error(`Failed to preload ${type}: ${url}`));

    if (type !== 'image') {
      document.head.appendChild(element);
    }
  });
}
