"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const NeuralNetwork = dynamic(() => import("@/components/visuals/neural-network").then(mod => mod.NeuralNetwork), { ssr: false });

export function BackgroundVisuals() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" />
      {/* 
        By using the pathname as the key, the NeuralNetwork component 
        will fully unmount and remount every time the route changes, 
        regenerating the particle positions so it looks different on each page.
      */}
      <NeuralNetwork 
        key={pathname} 
        className="absolute inset-0 h-full w-full opacity-70" 
      />
    </div>
  );
}
