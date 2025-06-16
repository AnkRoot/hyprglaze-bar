import { ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./common/Button";
import { GlazeWmOutput } from "zebar";
import { motion, AnimatePresence } from "framer-motion";

interface TilingControlProps {
  glazewm: GlazeWmOutput | null;
}

export function TilingControl({ glazewm }: TilingControlProps) {
  if (!glazewm) return null;

  return (
    <>
      {/* 绑定模式显示 */}
      <AnimatePresence>
        {glazewm.bindingModes.map((bindingMode) => (
          <motion.div
            key={bindingMode.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <Button>{bindingMode.displayName ?? bindingMode.name}</Button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 平铺方向切换 */}
      <Button 
        onClick={() => glazewm.runCommand("toggle-tiling-direction")}
        title="切换平铺方向"
      >
        <ChevronRight
          className={cn(
            "h-3 w-3 transition-transform duration-200 ease-in-out",
            glazewm.tilingDirection === "vertical" ? "rotate-90" : ""
          )}
          strokeWidth={3}
        />
      </Button>
    </>
  );
}
