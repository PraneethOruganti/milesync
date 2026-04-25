/**
 * FeaturePill.tsx
 * Small badge that highlights a single product feature.
 */

interface FeaturePillProps {
  icon: string;
  label: string;
}

export function FeaturePill({ icon, label }: FeaturePillProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
      <span className="text-sm" aria-hidden="true">{icon}</span>
      <span className="text-xs font-mono text-white/60 whitespace-nowrap">{label}</span>
    </div>
  );
}