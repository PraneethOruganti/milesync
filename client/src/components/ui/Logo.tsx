/**
 * Logo.tsx
 * MileSync brand mark — reusable across all pages.
 */

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const sizeMap = {
  sm: { icon: "text-xl",   text: "text-2xl" },
  md: { icon: "text-3xl",  text: "text-4xl" },
  lg: { icon: "text-5xl",  text: "text-6xl" },
};

export function Logo({ size = "md", animate = true }: LogoProps) {
  const s = sizeMap[size];
  return (
    <div className="flex items-center gap-3">
      <span
        className={`${s.icon} text-lime-400 select-none ${animate ? "animate-spin [animation-duration:8s]" : ""}`}
        aria-hidden="true"
      >
        ◎
      </span>
      <span className="font-display font-extrabold tracking-tight text-white leading-none" style={{ fontSize: s.text === "text-6xl" ? "3.5rem" : undefined }}>
        <span className={s.text}>Mile</span>
        <span className={`${s.text} text-lime-400`}>Sync</span>
      </span>
    </div>
  );
}