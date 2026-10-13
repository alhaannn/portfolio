import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

const RobotScene = lazy(() => import("@/components/ui/robot-hero"));

/** Stable space keeps the question bar anchored while WebGL initializes. */
export function RobotMascot() {
  return (
    <div data-robot-scene className="h-80 min-w-0 w-full" aria-label="Interactive silver robot">
      <ClientOnly fallback={null}>
        <Suspense fallback={null}><RobotScene /></Suspense>
      </ClientOnly>
    </div>
  );
}