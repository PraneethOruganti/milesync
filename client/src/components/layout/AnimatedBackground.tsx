/**
 * AnimatedBackground.tsx
 * Decorative full-bleed background with radial glow orbs and a subtle
 * noise-grain overlay. Purely visual — no semantic content.
 */

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base */}
      <div className="absolute inset-0 bg-[#07070d]" />

      {/* Lime glow — top left */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-lime-400/[0.07] blur-[120px] animate-pulse [animation-duration:4s]" />

      {/* Teal accent — bottom right */}
      <div className="absolute -bottom-48 -right-24 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.05] blur-[100px] animate-pulse [animation-duration:6s] [animation-delay:2s]" />

      {/* Subtle center vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#07070d_100%)]" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, #a3e635 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}