import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useAutoTiling = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // 直接连接 WebSocket，移除配置复杂性
    const websocket = new WebSocket('ws://localhost:6123');

    websocket.onopen = () => {
      console.log('Auto-tiling WebSocket connected');
      websocket.send("sub -e window_managed");
    };

    websocket.onmessage = async (event) => {
      try {
        const response = JSON.parse(event.data);

        if (response.messageType === "client_response") {
          console.log(`Event subscription: ${response.success}`);
        } else if (response.messageType === "event_subscription") {
          const tilingSize = response?.data?.managedWindow?.tilingSize;

          // 当窗口大小小于等于 50% 时，自动切换平铺方向
          if (tilingSize !== null && tilingSize <= 0.5) {
            websocket.send("c toggle-tiling-direction");
            console.log('Auto-tiling: Toggled tiling direction due to small window size');
          }

          queryClient.setQueryData(["tilingSize"], tilingSize);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    websocket.onerror = (error) => {
      console.error("Auto-tiling WebSocket error:", error);
    };

    websocket.onclose = () => {
      console.log('Auto-tiling WebSocket disconnected');
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);

  return {
    tilingSize: queryClient.getQueryData(["tilingSize"]),
  };
};

export default useAutoTiling;
