/**
 * SpotifyIcon.tsx
 * Official Spotify logo mark as an inline SVG.
 */

interface SpotifyIconProps {
  className?: string;
  size?: number;
}

export function SpotifyIcon({ className = "", size = 24 }: SpotifyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.312a.75.75 0 01-1.032.25c-2.824-1.725-6.38-2.115-10.566-1.158a.75.75 0 01-.334-1.463c4.582-1.047 8.514-.596 11.682 1.339a.75.75 0 01.25 1.032zm1.47-3.27a.938.938 0 01-1.29.308c-3.232-1.987-8.158-2.563-11.977-1.403a.937.937 0 01-.544-1.794c4.368-1.326 9.8-.683 13.503 1.599a.937.937 0 01.308 1.29zm.127-3.404C15.37 8.38 9.278 8.17 5.893 9.222a1.125 1.125 0 01-.651-2.152c3.924-1.19 10.45-.96 14.576 1.618a1.125 1.125 0 01-1.205 1.95z" />
    </svg>
  );
}