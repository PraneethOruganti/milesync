# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MileSync generates Spotify playlists matched to a runner's cadence/BPM based on their desired mile pace. It's a monorepo with a React frontend (`client/`) and a Node.js backend (`server/`).

## Commands

Both `client/` and `server/` use **pnpm**. Run commands from within each directory.

### Client (`cd client`)
```bash
pnpm dev        # start Vite dev server
pnpm build      # TypeScript check + Vite build
pnpm lint       # ESLint
```

### Server (`cd server`)
```bash
pnpm dev        # start server with hot reload (once configured)
pnpm build      # compile TypeScript
```

## Architecture

### Client
- React 19 + TypeScript + Vite with the React Compiler enabled (via `babel-plugin-react-compiler` + `@rolldown/plugin-babel`)
- Entry: `client/src/main.tsx` → `client/src/App.tsx`

### Server
- Bare `package.json` — no framework or dependencies yet; needs to be bootstrapped
- Will handle Spotify OAuth (Authorization Code Flow) and playlist generation
- Spotify secrets (`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`) must stay server-side only

### Key Domain Logic (to be implemented)
- **BPM calculation**: derive cadence (steps/min) from mile pace using a fixed formula; ±5 BPM tolerance; support half-time and double-time
- **Playlist generation**: use Spotify Recommendations API (`target_tempo`, `min_tempo`, `max_tempo`, seed genres); fill duration from user-supplied time or pace × distance
- **Auth flow**: `/auth/login` → Spotify → `/auth/callback` → token stored server-side; `/auth/refresh` for renewal
- **Save to Spotify**: create playlist on user's account via Spotify Web API after generation
