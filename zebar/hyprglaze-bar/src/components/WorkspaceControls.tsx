import { motion } from "framer-motion";
import { Workspace } from "glazewm";
import { GlazeWmOutput } from "zebar";
import { cn } from "../utils/cn";
import { buttonStyles } from "./common/Button";
import { Chip } from "./common/Chip";

interface WorkspaceControlsProps {
  glazewm: GlazeWmOutput | null;
}

export function WorkspaceControls({ glazewm }: WorkspaceControlsProps) {
  if (!glazewm) return null;
  
  const workspaces = glazewm.currentWorkspaces;

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY > 0 ? 1 : -1;
    const workspaceName = workspaces.indexOf(glazewm.focusedWorkspace);
    const newWorkspaceName = workspaces[workspaceName + delta]?.name;

    if (workspaces[workspaceName + delta]) {
      glazewm.runCommand(`focus --workspace ${newWorkspaceName}`);
    } else {
      const command = delta > 0 ? "focus --next-workspace" : "focus --prev-workspace";
      glazewm.runCommand(command);
    }
  };

  return (
    <Chip
      className="flex items-center gap-1.5 select-none overflow-hidden px-[2px] h-full"
      as="div"
      onWheel={handleWheel}
    >
      {workspaces.map((workspace: Workspace) => {
        const isFocused = workspace.hasFocus;
        return (
          <button
            key={workspace.name}
            onClick={() => glazewm.runCommand(`focus --workspace ${workspace.name}`)}
            className={cn(
              "relative rounded-xl px-2 transition duration-500 ease-in-out text-text-muted h-full",
              isFocused ? "" : "hover:text-text",
              isFocused && "text-text duration-700 transition-all ease-in-out font-medium"
            )}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <p className="z-10">
              {workspace.displayName ?? workspace.name}
            </p>

            {isFocused && (
              <motion.span
                layoutId="bubble"
                className={cn(
                  buttonStyles,
                  "bg-primary border-primary-border drop-shadow-xs rounded-lg absolute inset-0 -z-10",
                  isFocused && "hover:bg-primary"
                )}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </Chip>
  );
}
