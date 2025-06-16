// 网络状态类型
export interface NetworkSpeed {
  download: string;
  upload: string;
  unit: string;
}

// 系统状态类型
export interface SystemStatsData {
  cpu?: {
    usage: number;
  };
  memory?: {
    usage: number;
    total: number;
    used: number;
  };
  network?: {
    defaultInterface?: {
      isConnected: boolean;
      type: 'wifi' | 'ethernet' | 'other';
      bytesReceived: number;
      bytesSent: number;
    };
  };
}
