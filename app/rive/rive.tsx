// rive.tsx
import React, { useEffect, useState, Suspense } from "react";

// Type for the dynamically imported Rive component
type RiveType = React.ComponentType<{
  src: string;
  stateMachines?: string | string[];
  autoplay?: boolean;
  style?: React.CSSProperties;
}>;

export const Simple = () => {
  const [Rive, setRive] = useState<RiveType | null>(null);

  // Load Rive only on the client
  useEffect(() => {
    import("@rive-app/react-canvas").then((mod) => {
      // Some builds export as default, some as module
      setRive(() => mod.default || mod.Rive);
    });
  }, []);

  if (!Rive) {
    // Show fallback while loading
    return <div>Loading animation...</div>;
  }

  return (
    <Suspense fallback={<div>Loading animation...</div>}>
      <Rive
        src="/animations/test.riv"
        stateMachines="State Machine 1"
        autoplay
        style={{ width: 800, height: 800 }}
      />
    </Suspense>
  );
};
