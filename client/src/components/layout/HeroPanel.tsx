/**
 * HeroPanel.tsx
 * Left-side brand panel shown on large screens.
 * Contains logo, tagline, and feature pills.
 */

import { Logo } from "../ui/Logo";
import { FeatureList } from "../ui/FeatureList";

export function HeroPanel() {
  return (
    <div className="flex flex-col justify-center gap-8 lg:max-w-lg">

      {/* Logo */}
      <Logo size="lg" animate />

      {/* Tagline */}
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white leading-[1.1] lg:text-5xl">
          Your run.
          <br />
          <span className="text-lime-400">Your beat.</span>
        </h1>
        <p className="font-mono text-base text-white/50 leading-relaxed max-w-sm">
          MileSync builds Spotify playlists perfectly matched to your running
          cadence — enter your pace, we handle the music.
        </p>
      </div>

      {/* Features */}
      <FeatureList />

      {/* Decorative BPM display */}
      <BpmDecoration />
    </div>
  );
}

function BpmDecoration() {
  return (
    <div className="hidden lg:flex items-center gap-4">
      <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full border border-lime-400/30 bg-lime-400/5">
        <span className="font-display text-2xl font-extrabold text-lime-400 leading-none">
          174
        </span>
        <span className="text-[9px] tracking-widest uppercase text-white/35 mt-0.5">
          bpm
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-24 h-1 rounded-full bg-lime-400/30" />
          <div className="w-16 h-1 rounded-full bg-lime-400/20" />
          <div className="w-20 h-1 rounded-full bg-lime-400/30" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1 rounded-full bg-lime-400/20" />
          <div className="w-24 h-1 rounded-full bg-lime-400/30" />
          <div className="w-12 h-1 rounded-full bg-lime-400/15" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1 rounded-full bg-lime-400/25" />
          <div className="w-14 h-1 rounded-full bg-lime-400/20" />
          <div className="w-20 h-1 rounded-full bg-lime-400/30" />
        </div>
        <p className="text-[10px] font-mono text-white/25 mt-1">
          9:00 min/mi → 174 spm
        </p>
      </div>
    </div>
  );
}