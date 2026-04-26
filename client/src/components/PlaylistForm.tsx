/**
 * MileSync – Playlist Generation Form
 * Styled entirely with Tailwind CSS
 *
 * Dependencies: @tanstack/react-form
 * Install:      pnpm add @tanstack/react-form
 *
 * Drop into: client/src/components/PlaylistForm.tsx
 *
 * 1. Add fonts to index.html <head>:
 *    <link rel="preconnect" href="https://fonts.googleapis.com" />
 *    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
 *
 * 2. Extend tailwind.config.ts:
 *    theme: {
 *      extend: {
 *        fontFamily: {
 *          display: ['Syne', 'sans-serif'],
 *          mono:    ['"DM Mono"', 'monospace'],
 *        },
 *        keyframes: {
 *          spin: { to: { transform: 'rotate(360deg)' } },
 *        },
 *        animation: {
 *          'spin-slow': 'spin 6s linear infinite',
 *        },
 *      },
 *    },
 */

import { useForm, useStore } from '@tanstack/react-form';
import { useState } from 'react';
import type { PlaylistFormValues } from '../types/playlist';

// ─── Types ────────────────────────────────────────────────────────────────────

export type PaceUnit = 'min/mi' | 'min/km';
export type DistanceUnit = 'miles' | 'km';
export type TimingMode = 'pace+distance' | 'duration';

const GENRE_OPTIONS = [
  { id: 'hip-hop', label: 'Hip-Hop' },
  { id: 'pop', label: 'Pop' },
  { id: 'rock', label: 'Rock' },
  { id: 'electronic', label: 'Electronic' },
  { id: 'indie', label: 'Indie' },
  { id: 'metal', label: 'Metal' },
  { id: 'r-n-b', label: 'R&B' },
  { id: 'latin', label: 'Latin' },
];

// ─── BPM helpers ──────────────────────────────────────────────────────────────

function calcBPM(paceMinutes: number, paceSeconds: number): number | null {
  const totalSec = paceMinutes * 60 + paceSeconds;
  if (!totalSec) return null;
  return Math.round(2000 / (totalSec / 60));
}

function calcDuration(distance: number, paceMinutes: number, paceSeconds: number): number | null {
  const paceInMin = paceMinutes + paceSeconds / 60;
  if (!paceInMin || !distance) return null;
  return Math.round(distance * paceInMin);
}

// ─── Shared class strings ─────────────────────────────────────────────────────

const inputCls =
  'w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 ' +
  'font-mono text-sm text-white outline-none transition-all duration-150 ' +
  'focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 ' +
  '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

const inputErrCls = '!border-red-500/70 focus:!border-red-500 focus:!ring-red-500/20';

const labelCls = 'text-[10px] tracking-widest uppercase text-white/40';

// ─── Component ────────────────────────────────────────────────────────────────

interface PlaylistFormProps {
  onSubmit: (values: PlaylistFormValues) => void;
}

export function PlaylistForm({ onSubmit }: PlaylistFormProps) {
  const [timingMode, setTimingMode] = useState<TimingMode>('pace+distance');

  const form = useForm({
    defaultValues: {
      paceMinutes: 9,
      paceSeconds: 0,
      paceUnit: 'min/mi',
      distance: 3,
      distanceUnit: 'miles',
      timingMode: 'pace+distance',
      durationMinutes: 30,
      genres: ['hip-hop', 'pop'],
      halfTimeEnabled: false,
      doubleTimeEnabled: false,
    },
    onSubmit: async ({ value }) => onSubmit({ ...value, timingMode } as PlaylistFormValues),
  });

  // Reactive reads for live preview
  const paceMin = useStore(form.store, (s) => s.values.paceMinutes);
  const paceSec = useStore(form.store, (s) => s.values.paceSeconds);
  const distance = useStore(form.store, (s) => s.values.distance);
  const selectedGenres = useStore(form.store, (s) => s.values.genres);
  const halfTime = useStore(form.store, (s) => s.values.halfTimeEnabled);
  const doubleTime = useStore(form.store, (s) => s.values.doubleTimeEnabled);

  const rawBPM = calcBPM(paceMin, paceSec);
  const displayBPM = rawBPM
    ? halfTime
      ? Math.round(rawBPM / 2)
      : doubleTime
        ? rawBPM * 2
        : rawBPM
    : null;

  const durationPreview =
    timingMode === 'pace+distance' ? calcDuration(distance, paceMin, paceSec) : null;

  return (
    <div className="min-h-screen bg-[#09090f] text-white flex flex-col items-center px-5 py-10 pb-20 font-mono">
      {/* ── Logo / Header ── */}
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-2xl text-lime-400 animate-spin [animation-duration:6s]">◎</span>
          <span className="font-display text-[2rem] font-extrabold tracking-tight leading-none">
            MileSync
          </span>
        </div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/35">
          music matched to your miles
        </p>
      </header>

      {/* ── BPM Orb ── */}
      <div
        className="relative flex items-center justify-center w-36 h-36 mb-10"
        aria-live="polite"
        aria-label={`Target BPM: ${displayBPM ?? 'not calculated'}`}
      >
        c{/* Animated rings */}
        <div className="absolute inset-0 rounded-full border border-lime-400/25 animate-ping [animation-duration:2.4s]" />
        <div className="absolute -inset-4 rounded-full border border-lime-400/10 animate-pulse [animation-duration:3s]" />
        {/* Inner disk */}
        <div className="relative z-10 w-[108px] h-[108px] rounded-full bg-white/[0.04] border border-white/10 flex flex-col items-center justify-center gap-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
          <span className="font-display text-[2.5rem] font-extrabold text-lime-400 leading-none tabular-nums transition-all duration-200">
            {displayBPM ?? '–'}
          </span>
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/35">BPM</span>
        </div>
      </div>

      {/* ── Form ── */}
      <form
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {/* ══════════════════════════ 01 Pace ════════════════════════════ */}
        <section className="bg-white/[0.035] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-4">
          <SectionHeader num="01" title="Pace" />

          {/* min : sec  unit */}
          <div className="flex items-end gap-2">
            {/* Minutes */}
            <form.Field
              name="paceMinutes"
              validators={{
                onChange: ({ value }) => (value < 1 || value > 30 ? '1–30' : undefined),
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5 w-[72px]">
                  <label className={labelCls}>Min</label>
                  <input
                    className={`${inputCls} text-center ${field.state.meta.errors.length ? inputErrCls : ''}`}
                    type="number"
                    min={1}
                    max={30}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(parseInt(e.target.value) || 0)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-[10px] text-red-400">
                      {field.state.meta.errors[0] as string}
                    </span>
                  )}
                </div>
              )}
            </form.Field>

            <span className="font-display text-2xl font-extrabold text-white/25 pb-2.5 select-none">
              :
            </span>

            {/* Seconds */}
            <form.Field
              name="paceSeconds"
              validators={{
                onChange: ({ value }) => (value < 0 || value > 59 ? '0–59' : undefined),
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5 w-[72px]">
                  <label className={labelCls}>Sec</label>
                  <input
                    className={`${inputCls} text-center ${field.state.meta.errors.length ? inputErrCls : ''}`}
                    type="number"
                    min={0}
                    max={59}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(parseInt(e.target.value) || 0)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-[10px] text-red-400">
                      {field.state.meta.errors[0] as string}
                    </span>
                  )}
                </div>
              )}
            </form.Field>

            {/* Pace unit */}
            <form.Field name="paceUnit">
              {(field) => (
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className={labelCls}>Unit</label>
                  <select
                    className={`${inputCls} cursor-pointer`}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value as PaceUnit)}
                  >
                    <option value="min/mi">min/mi</option>
                    <option value="min/km">min/km</option>
                  </select>
                </div>
              )}
            </form.Field>
          </div>

          {/* Half / Double time */}
          <div className="flex gap-2">
            <form.Field name="halfTimeEnabled">
              {(field) => (
                <ToggleButton
                  active={field.state.value}
                  label="½× Half Time"
                  onClick={() => {
                    field.handleChange(!field.state.value);
                    if (!field.state.value) form.setFieldValue('doubleTimeEnabled', false);
                  }}
                />
              )}
            </form.Field>
            <form.Field name="doubleTimeEnabled">
              {(field) => (
                <ToggleButton
                  active={field.state.value}
                  label="2× Double Time"
                  onClick={() => {
                    field.handleChange(!field.state.value);
                    if (!field.state.value) form.setFieldValue('halfTimeEnabled', false);
                  }}
                />
              )}
            </form.Field>
          </div>
        </section>

        {/* ══════════════════════ 02 Run Length ══════════════════════════ */}
        <section className="bg-white/[0.035] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-4">
          <SectionHeader num="02" title="Run Length" />

          {/* Mode tabs */}
          <div className="flex gap-1 bg-white/5 rounded-xl p-1">
            {(['pace+distance', 'duration'] as TimingMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTimingMode(mode)}
                className={`flex-1 rounded-lg py-1.5 text-xs font-mono transition-all duration-150 ${
                  timingMode === mode
                    ? 'bg-lime-400 text-[#09090f] font-medium'
                    : 'text-white/40 hover:text-white/65'
                }`}
              >
                {mode === 'pace+distance' ? 'Distance' : 'Duration'}
              </button>
            ))}
          </div>

          {/* Distance mode */}
          {timingMode === 'pace+distance' && (
            <div className="flex items-end gap-2">
              <form.Field
                name="distance"
                validators={{
                  onChange: ({ value }) =>
                    value <= 0 || value > 200 ? 'Enter a valid distance' : undefined,
                }}
              >
                {(field) => (
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className={labelCls}>Distance</label>
                    <input
                      className={`${inputCls} ${field.state.meta.errors.length ? inputErrCls : ''}`}
                      type="number"
                      min={0.1}
                      max={200}
                      step={0.1}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(parseFloat(e.target.value) || 0)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-[10px] text-red-400">
                        {field.state.meta.errors[0] as string}
                      </span>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="distanceUnit">
                {(field) => (
                  <div className="flex flex-col gap-1.5 w-20">
                    <label className={labelCls}>Unit</label>
                    <select
                      className={`${inputCls} cursor-pointer`}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value as DistanceUnit)}
                    >
                      <option value="miles">mi</option>
                      <option value="km">km</option>
                    </select>
                  </div>
                )}
              </form.Field>

              {durationPreview && (
                <div className="self-end flex-shrink-0 rounded-lg border border-lime-400/30 bg-lime-400/8 px-3 py-2.5 text-[11px] text-lime-400 whitespace-nowrap">
                  ≈ {Math.floor(durationPreview / 60)}h {durationPreview % 60}m
                </div>
              )}
            </div>
          )}

          {/* Duration mode */}
          {timingMode === 'duration' && (
            <form.Field
              name="durationMinutes"
              validators={{
                onChange: ({ value }) => (value < 5 || value > 600 ? 'Enter 5–600 min' : undefined),
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Total Minutes</label>
                  <input
                    className={`${inputCls} ${field.state.meta.errors.length ? inputErrCls : ''}`}
                    type="number"
                    min={5}
                    max={600}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(parseInt(e.target.value) || 0)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-[10px] text-red-400">
                      {field.state.meta.errors[0] as string}
                    </span>
                  )}
                </div>
              )}
            </form.Field>
          )}
        </section>

        {/* ══════════════════════════ 03 Genres ══════════════════════════ */}
        <section className="bg-white/[0.035] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <SectionHeader num="03" title="Genres" />
            <span className="ml-auto text-[10px] text-white/30">pick up to 5</span>
          </div>

          <form.Field name="genres">
            {(field) => (
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {GENRE_OPTIONS.map((g) => {
                    const active = field.state.value.includes(g.id);
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          const next = active
                            ? field.state.value.filter((v) => v !== g.id)
                            : field.state.value.length < 5
                              ? [...field.state.value, g.id]
                              : field.state.value;
                          field.handleChange(next);
                        }}
                        className={`rounded-full border px-4 py-1.5 text-xs font-mono transition-all duration-150 ${
                          active
                            ? 'border-lime-400 bg-lime-400/10 text-lime-400'
                            : 'border-white/10 bg-white/5 text-white/40 hover:border-white/20 hover:text-white/65'
                        }`}
                      >
                        {g.label}
                      </button>
                    );
                  })}
                </div>
                {selectedGenres.length === 0 && (
                  <span className="text-[10px] text-red-400">Select at least one genre</span>
                )}
              </div>
            )}
          </form.Field>
        </section>

        {/* ── Submit ── */}
        <form.Subscribe>
          {(canSubmit) => (
            <button
              type="submit"
              disabled={!canSubmit || selectedGenres.length === 0}
              className="group w-full rounded-2xl bg-lime-400 py-4 font-display text-base font-extrabold tracking-wide text-[#09090f] transition-all duration-200 hover:shadow-[0_0_36px_rgba(163,230,53,0.38)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
            >
              <span className="flex items-center justify-center gap-2">
                Generate Playlist
                <span className="transition-transform duration-200 group-hover:translate-x-1 group-disabled:translate-x-0">
                  →
                </span>
              </span>
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

// ─── Small sub-components ─────────────────────────────────────────────────────

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <h2 className="font-display text-[11px] font-bold tracking-widest uppercase flex items-baseline gap-2 m-0">
      <span className="text-lime-400">{num}</span>
      <span>{title}</span>
    </h2>
  );
}

function ToggleButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-lg border py-2 text-xs font-mono transition-all duration-150 ${
        active
          ? 'border-lime-400 bg-lime-400/10 text-lime-400'
          : 'border-white/10 bg-white/5 text-white/40 hover:border-white/20 hover:text-white/60'
      }`}
    >
      {label}
    </button>
  );
}
