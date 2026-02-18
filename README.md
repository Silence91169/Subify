# Subify — Subscription Tracker

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Platform-3FCF8E?logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview
Subify is a full-stack subscription management app built with Next.js 15 (App Router). It lets users track recurring expenses, view spending analytics, get renewal alerts, and manage their profile — all backed by Supabase auth and database.

**Live:** https://subify91169.vercel.app

---

## Features

- **Authentication** — Email/password and Google OAuth via Supabase; session management via middleware
- **Subscription CRUD** — Add, edit, delete subscriptions with category, cost, billing cycle, renewal date, and status
- **Dashboard Overview** — Monthly spending, active plans count, next renewal, yearly projection; upcoming renewals table; spending breakdown pie chart
- **Analytics** — Spending by category (pie chart), top 5 expenses, savings opportunity suggestions, efficiency score
- **Renewal Alerts** — Critical alerts (within 3 days) and upcoming renewals (within 30 days)
- **Export** — Download subscriptions as CSV
- **AI Chatbot** — "Tricker AI" floating assistant (simulated responses, extensible)
- **Dark / Light Mode** — System-aware theme toggle via next-themes
- **Responsive Design** — Mobile-first layout with collapsible sidebar

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.5 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, shadcn/ui, Radix UI |
| Animations | Framer Motion |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Auth & DB | Supabase |
| Notifications | Sonner |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Repository Structure

```
src/
├── app/
│   ├── page.tsx                        # Landing page (hero, features, pricing, FAQ)
│   ├── login/page.tsx                  # Email/password + Google OAuth login
│   ├── signup/page.tsx                 # Email/password + Google OAuth signup
│   ├── forgot-password/page.tsx        # Password recovery
│   ├── coming-soon/page.tsx            # Placeholder page
│   ├── auth/
│   │   ├── actions.ts                  # Server actions: signup, login, logout, updateProfile, changePassword, signInWithGoogle
│   │   ├── callback/route.ts           # OAuth callback handler
│   │   └── auth-code-error/page.tsx    # Auth error display
│   └── dashboard/                      # Protected routes (auth required)
│       ├── layout.tsx                  # Sidebar + header layout
│       ├── page.tsx                    # Overview: stats, renewals, charts
│       ├── subscriptions/page.tsx      # Subscription management table
│       ├── analytics/page.tsx          # Spending insights & reports
│       ├── alerts/page.tsx             # Renewal alerts
│       ├── profile/page.tsx            # User profile editing
│       └── settings/page.tsx           # Password & theme settings
├── components/
│   ├── dashboard/
│   │   ├── ai-chatbot.tsx              # Tricker AI floating chatbot
│   │   ├── notification-bell.tsx       # Notification indicator
│   │   ├── stats-charts.tsx            # Category breakdown pie chart
│   │   ├── profile-form.tsx            # Profile update form
│   │   ├── password-change-form.tsx    # Password change form
│   │   └── settings-form.tsx           # Settings form
│   ├── subscriptions/
│   │   ├── subscription-list.tsx       # Table with filter, sort, export
│   │   ├── subscription-dialog.tsx     # Add / edit modal (Zod-validated)
│   │   └── connect-service-modal.tsx   # Service connection placeholder
│   └── ui/                             # 50+ shadcn/ui primitives
├── lib/
│   ├── actions/subscriptions.ts        # Subscription CRUD server actions + getDashboardStats
│   └── utils.ts                        # formatCurrency, cn helpers
└── utils/supabase/
    ├── client.ts                        # Browser Supabase client
    ├── server.ts                        # Server Supabase client
    └── middleware.ts                    # Session refresh middleware
```

---

## Database Schema

```sql
CREATE TABLE subscriptions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES auth.users NOT NULL,
  name         VARCHAR NOT NULL,
  category     VARCHAR CHECK (category IN ('Entertainment','SaaS','Fitness','Education','Other')),
  cost         DECIMAL NOT NULL,
  billing_cycle VARCHAR CHECK (billing_cycle IN ('monthly','yearly')),
  renewal_date DATE NOT NULL,
  status       VARCHAR CHECK (status IN ('active','cancelled')),
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- A Supabase project

### Installation

```bash
git clone https://github.com/Silence91169/Subify.git
cd Subify
npm install
```

### Environment Variables

Create a `.env` file in the root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
```

### Running

```bash
npm run dev      # Dev server (Turbopack)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

Access the app at `http://localhost:3000`.

---

## Roadmap

- [ ] Connect Tricker AI to a real LLM (Claude / OpenAI)
- [ ] Email reminders for upcoming renewals
- [ ] Multi-currency support
- [ ] Shared subscription splitting
- [ ] Automated tests (unit + e2e)

---

## Author

**Shitanshu Singh** — [GitHub](https://github.com/Silence91169)
