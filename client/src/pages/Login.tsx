/**
 * SignInPage.tsx
 * Top-level page component. Composes PageLayout, HeroPanel, and SignInCard.
 * Drop into: client/src/pages/SignInPage.tsx
 *
 * Usage in App.tsx (or your router):
 *   import { SignInPage } from "./pages/SignInPage";
 *   // React Router example:
 *   <Route path="/login" element={<SignInPage />} />
 *
 * Font setup (index.html <head>):
 *   <link rel="preconnect" href="https://fonts.googleapis.com" />
 *   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
 *
 * tailwind.config.ts / @theme (v4 css):
 *   font-family: { display: ['Syne', 'sans-serif'], mono: ['"DM Mono"', 'monospace'] }
 */

import { PageLayout } from "../components/layout/PageLayout";
import { HeroPanel } from "../components/layout/HeroPanel";
import { SignInCard } from "../components/auth/SignInCard";

interface LoginProps {
  /**
   * Server endpoint that starts the Spotify OAuth redirect.
   * Defaults to "/auth/login" — change if your server uses a different path.
   */
  authUrl?: string;
}

export function Login({ authUrl = "/auth/login" }: LoginProps) {
  return (
    <PageLayout
      left={<HeroPanel />}
      right={<SignInCard authUrl={authUrl} />}
    />
  );
}