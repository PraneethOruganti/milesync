/**
 * PermissionDisclousre.tsx
 * Shows the user exactly what Spotify permissions will be requested.
 * Transparency builds trust — especially for an app that writes playlists.
 */

interface Permission {
  scope: string;
  reason: string;
}

const PERMISSIONS: Permission[] = [
  { scope: "playlist-modify-public",  reason: "Create playlists on your account" },
  { scope: "playlist-modify-private", reason: "Save private playlists" },
  { scope: "user-read-private",       reason: "Read your Spotify username" },
];

export function PermissionsDisclosure() {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
      <p className="mb-3 text-[10px] font-mono tracking-widest uppercase text-white/35">
        Permissions requested
      </p>
      <ul className="flex flex-col gap-2">
        {PERMISSIONS.map((p) => (
          <PermissionRow key={p.scope} {...p} />
        ))}
      </ul>
    </div>
  );
}

function PermissionRow({ scope, reason }: Permission) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-0.5 flex-shrink-0 text-lime-400 text-xs" aria-hidden="true">✓</span>
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-mono text-white/70">{reason}</span>
        <span className="text-[10px] font-mono text-white/25">{scope}</span>
      </div>
    </li>
  );
}