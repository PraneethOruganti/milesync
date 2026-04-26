/**
 * SignInCard.tsx
 * The glass-morphism card that contains all auth UI.
 * Composes: SpotifyLoginButton, PermissionsDisclosure, LegalFooter.
 */
 
import { SpotifyLoginButton } from "./SpotifyLoginButton";
import { PermissionsDisclosure } from "./PermissionsDisclosure";
import { LegalFooter } from "./LegalFooter";
 
interface SignInCardProps {
  /** Forwarded to SpotifyLoginButton */
  authUrl?: string;
}
 
export function SignInCard({ authUrl }: SignInCardProps) {
  return (
    <div className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-xl shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
 
      {/* Headline */}
      <div className="mb-6 text-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white mb-1">
          Start running smarter
        </h2>
        <p className="text-sm font-mono text-white/45">
          Connect Spotify to generate your first playlist
        </p>
      </div>
 
      {/* Divider */}
      <Divider />
 
      {/* CTA */}
      <div className="mb-5">
        <SpotifyLoginButton authUrl={authUrl} />
      </div>
 
      {/* Permissions */}
      <div className="mb-6">
        <PermissionsDisclosure />
      </div>
 
      {/* Legal */}
      <LegalFooter />
    </div>
  );
}
 
function Divider() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex-1 h-px bg-white/[0.08]" />
      <span className="text-[10px] font-mono tracking-widest uppercase text-white/25">
        sign in
      </span>
      <div className="flex-1 h-px bg-white/[0.08]" />
    </div>
  );
}