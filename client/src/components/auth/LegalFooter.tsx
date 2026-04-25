/**
 * LegalFooter.tsx
 * Fine-print disclaimer shown below the sign-in card.
 */
 
export function LegalFooter() {
  return (
    <p className="text-center text-[11px] font-mono leading-relaxed text-white/25">
      By continuing you agree to our{" "}
      <a
        href="/terms"
        className="text-white/40 underline underline-offset-2 hover:text-white/70 transition-colors duration-150"
      >
        Terms
      </a>{" "}
      and{" "}
      <a
        href="/privacy"
        className="text-white/40 underline underline-offset-2 hover:text-white/70 transition-colors duration-150"
      >
        Privacy Policy
      </a>
      . MileSync is not affiliated with Spotify AB.
    </p>
  );
}
 