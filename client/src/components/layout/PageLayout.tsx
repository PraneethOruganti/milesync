/**
 * PageLayout.tsx
 * Responsive split layout: hero on left, card on right (stacked on mobile).
 */

import { AnimatedBackground } from "./AnimatedBackground";

interface PageLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function PageLayout({ left, right }: PageLayoutProps) {
  return (
    <div className="relative min-h-screen w-full font-mono">
      <AnimatedBackground />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-16 px-6 py-16 lg:flex-row lg:gap-24 lg:px-20 xl:px-32">
        {/* Left: hero */}
        <div className="w-full lg:flex-1">{left}</div>

        {/* Right: auth card */}
        <div className="w-full flex justify-center lg:flex-shrink-0 lg:w-auto">
          {right}
        </div>
      </main>
    </div>
  );
}