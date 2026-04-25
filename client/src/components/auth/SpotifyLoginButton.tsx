/**
 * SpotifyLoginButton.tsx
 * Triggers the Spotify OAuth Authorization Code Flow.
 * Calls your server's /auth/login endpoint which redirects to Spotify.
 */
 
import { useState } from "react";
import { SpotifyIcon } from "../ui/SpotifyIcon";
 
interface SpotifyLoginButtonProps {
  /** Server endpoint that initiates the OAuth redirect. */
  authUrl?: string;
}
 
export function SpotifyLoginButton({
  authUrl = "/auth/login",
}: SpotifyLoginButtonProps) {
  const [loading, setLoading] = useState(false);
 
  const handleLogin = () => {
    setLoading(true);
    // Full-page redirect — server handles OAuth from here.
    window.location.href = authUrl;
  };
 
  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      aria-label="Continue with Spotify"
      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#1DB954] px-6 py-4 font-display text-base font-extrabold tracking-wide text-black transition-all duration-200 hover:bg-[#1ed760] hover:shadow-[0_0_40px_rgba(29,185,84,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none disabled:hover:translate-y-0"
    >
      {/* Shimmer sweep on hover */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
        aria-hidden="true"
      />
 
      {loading ? (
        <LoadingSpinner />
      ) : (
        <SpotifyIcon size={22} className="flex-shrink-0" />
      )}
 
      <span>{loading ? "Connecting…" : "Continue with Spotify"}</span>
    </button>
  );
}
 
function LoadingSpinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}