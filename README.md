# Subscription Tracker

![Next.js](https://img.shields.io/badge/Next.js-14+-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Platform-3FCF8E?logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview
Subscription Tracker is a Next.js (App Router) web application that helps users sign up and manage subscriptions with modern UI components and Supabase-backed authentication. It includes email/password signup, Google OAuth, and a rich set of reusable UI primitives.

## Live Services
| Layer    | Platform | Link |
|----------|----------|------|
| Web App  | (TBD)    | —    |

## Repository Structure
```
.
├─ src/
│  ├─ app/
│  │  └─ signup/page.tsx          # Signup page using actions + Suspense
│  ├─ components/
│  │  ├─ auth-layout.tsx          # Auth page layout wrapper (imported)
│  │  ├─ icons.tsx                # Icon set (imported)
│  │  └─ ui/                      # Shadcn-style UI primitives (buttons, inputs, menus, etc.)
│  ├─ hooks/
│  │  └─ use-mobile.ts            # Mobile detection hook
│  ├─ lib/
│  │  ├─ actions/subscriptions.ts # Subscription-related actions
│  │  ├─ hooks/use-mobile.tsx     # Hook variant
│  │  └─ utils.ts                 # Shared utilities
│  ├─ utils/supabase/             # Supabase client/server/middleware helpers
│  └─ visual-edits/               # Visual edit messenger + tagger loader
├─ tsconfig.json
└─ package.json
```

## Tech Stack
- **Frontend:** Next.js (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components, Headless UI, Floating UI
- **Icons:** Lucide React
- **Auth & Data:** Supabase (email/password, Google OAuth)
- **Tooling:** npm, ESLint/TS config (from tsconfig), Node.js

## High-Level Architecture
- **Client (Next.js App Router):** React components render pages and UI primitives. Auth-related pages (e.g., `/signup`) use server actions for form handling and Supabase integration.
- **Auth & Data Layer:** Supabase client/server helpers handle authentication flows (email/password and Google OAuth). Actions under `src/app/auth/actions` orchestrate sign-in/up and redirect logic.
- **UI Layer:** A library of reusable UI components in `src/components/ui` powers forms, dialogs, menus, tables, and feedback elements.
- **Utilities:** Shared hooks (mobile detection) and helpers support responsive behavior and cross-component utilities.

## Features
- Email/password signup form with validation states
- Google OAuth signup/sign-in
- Suspense-powered loading fallback for auth pages
- Reusable UI kit (buttons, inputs, dialogs, menus, tables, skeletons, etc.)
- Mobile-awareness hooks for responsive behavior
- Supabase client/server utilities for authenticated requests
- Visual edits messenger/tagger utilities (for embedding or visual instrumentation)

## API Endpoints
No public REST endpoints are defined in the provided code. Next.js server actions are used for auth flows (e.g., `signup`, `signInWithGoogle`).

## Installation
### Prerequisites
- Node.js 18+
- npm
- Supabase project (for auth + database)

### Steps
```bash
# Install dependencies
npm install

# (Optional) If peer conflicts occur
npm install --legacy-peer-deps
```

## Environment Variables
Create a `.env` with:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-supabase-anon-key

```

## Usage
```bash
# Run dev server
npm run dev

# Lint (if configured)
npm run lint

# Build
npm run build

# Start production build
npm run start
```
Access the app at `http://localhost:3000`. Use the signup page at `/signup` for email or Google OAuth flows.

## Roadmap
- Add deployment pipeline and live hosting
- Expose subscription CRUD pages and APIs
- Add automated tests for UI and actions
- Improve error handling and toast feedback across flows

## Authors
- Shitanshu Singh
