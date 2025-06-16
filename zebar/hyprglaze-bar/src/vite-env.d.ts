/// <reference types="vite/client" />

declare global {
  interface Window {
    zebar?: {
      runCommand?: (command: string) => void;
    };
  }
}
