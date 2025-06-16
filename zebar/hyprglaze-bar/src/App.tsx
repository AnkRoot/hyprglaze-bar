import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as zebar from "zebar";
import { TilingControl } from "./components/TilingControl";
import { WorkspaceControls } from "./components/WorkspaceControls";
import { SystemStats } from "./components/SystemStats";
import { VolumeControl } from "./components/VolumeControl";
import { SystemTray } from "./components/SystemTray";
import { CenterDisplay } from "./components/CenterDisplay";
import { HorizontalThemeSelector } from "./components/HorizontalThemeSelector";
import { useAutoTiling } from "./hooks/useAutoTiling";
import { ThemeProvider } from "./theme/ThemeProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";

// 创建 QueryClient 实例
const queryClient = new QueryClient();

const providers = zebar.createProviderGroup({
  glazewm: { type: "glazewm" },
  cpu: { type: "cpu" },
  memory: { type: "memory" },
  audio: { type: "audio" },
  systray: { type: "systray" },
});

// 内部应用组件
function AppContent() {
  const [output, setOutput] = useState(providers.outputMap);

  useEffect(() => {
    providers.onOutput(() => {
      console.log('Providers output updated:', providers.outputMap);
      setOutput(providers.outputMap);
    });

    // 添加错误监听
    providers.onError((errorMap) => {
      console.error('Providers error:', errorMap);
    });
  }, []);

  // 启用自动平铺功能
  useAutoTiling();

  return (
    <div className="relative flex justify-between items-center bg-background/80 border border-button-border/80 backdrop-blur-3xl text-text h-full antialiased select-none rounded-lg font-mono py-1.5">
      {/* 左侧区域 - 平铺控制、工作区控制、窗口标题 */}
      <div className="flex items-center gap-2 h-full z-10 pl-1.5">
        {/* 平铺控制 */}
        <div className="flex items-center justify-center gap-1.5 h-full">
          <TilingControl glazewm={output.glazewm} />
        </div>

        {/* 工作区控制 */}
        <div className="flex items-center justify-center gap-2 h-full">
          <WorkspaceControls glazewm={output.glazewm} />
        </div>


      </div>

      {/* 中央区域 - 时间和天气，优化垂直居中 */}
      <div className="absolute w-full h-full flex items-center justify-center left-0 pointer-events-none">
        <div className="pointer-events-auto">
          <CenterDisplay />
        </div>
      </div>

      {/* 右侧区域 */}
      <div className="flex gap-2 items-center h-full z-10 pr-1.5">
        {/* 系统状态 */}
        <div className="flex items-center justify-center h-full">
          <SystemStats
            cpu={output.cpu}
            memory={output.memory}
            onTaskManagerClick={() => output.glazewm?.runCommand("shell-exec taskmgr")}
          />
        </div>

        {/* 音量控制 */}
        <div className="flex items-center justify-center h-full">
          <VolumeControl audio={output.audio} />
        </div>

        {/* 主题选择器 */}
        <div className="flex items-center justify-center h-full">
          <HorizontalThemeSelector />
        </div>

        {/* 系统托盘 */}
        <div className="h-full flex items-center justify-center px-0.5">
          <SystemTray systray={output.systray} />
        </div>
      </div>
    </div>
  );
}

// 主应用组件，添加主题和错误边界
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
