/**
 * FeatureList.tsx
 * Renders the list of product feature pills.
 * Data-driven — add/remove features in one place.
 */

import { FeaturePill } from "./FeaturePill";

const FEATURES = [
  { icon: "🎵", label: "BPM-matched playlists" },
  { icon: "🏃", label: "Pace → cadence formula" },
  { icon: "⚡", label: "Half & double time modes" },
  { icon: "💾", label: "Saves to your Spotify" },
];

export function FeatureList() {
  return (
    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
      {FEATURES.map((f) => (
        <FeaturePill key={f.label} icon={f.icon} label={f.label} />
      ))}
    </div>
  );
}