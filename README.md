# DevPulse Frontend

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Base_UI-000000)

A modern, responsive issue and feature tracker for engineering teams. Report bugs, request features, and follow every issue from **open** to **resolved**, with role-based permissions for contributors and maintainers.

## Links

| | |
| --- | --- |
| Live demo | https://dev-pulse-frontend-theta.vercel.app/ |
| Frontend repository | https://github.com/Hasnat-Sayed/DevPulse-Frontend |
| Backend API | https://devplus-sand.vercel.app |
| Backend repository | https://github.com/Hasnat-Sayed/DevPulse |

## Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [User Roles and Permissions](#user-roles-and-permissions)
- [Pages and Routes](#pages-and-routes)
- [Tech Stack](#tech-stack)
- [Backend API Integration](#backend-api-integration)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Demo Accounts](#demo-accounts)
- [Authentication Flow](#authentication-flow)
- [UI and Design System](#ui-and-design-system)
- [Deployment](#deployment)
- [Known Limitations](#known-limitations)

## About

DevPulse gives software teams one clear place to report bugs, suggest features, and coordinate fixes. Every issue has an owner, a type, and a status, so nothing gets lost in chats or spreadsheets.

This repository is the **Next.js frontend**, built for the Remontada Next.js assessment. It consumes the DevPulse REST API (Node.js, Express, PostgreSQL), which is deployed separately. The app has public pages for browsing issues and protected pages for creating and managing them.

## Key Features

**Public experience**
- Landing page with 7 sections: sticky navbar, hero, Features, How It Works, Latest Issues (live from the API), call-to-action banner, and footer
- Issues page with search (title, description, reporter), type and status filters, and sorting by newest or oldest
- Issue details page with a progress tracker, key information, and related issues
- About page, Contact page, and a custom 404 page

**Authentication**
- Register (with a role choice) and log in with email and password
- JWT stored client-side, restored on reload, and cleared on expiry or logout
- Protected routes that redirect visitors to `/login`
- Automatic logout with a clear message when the session expires

**Issue management**
- Create issues with inline validation, a live preview card, and toast feedback
- Edit issues in a dialog (title, description, type)
- Change workflow status: open, in progress, resolved (maintainers)
- Delete issues with a confirmation dialog (maintainers)
- Manage page with summary counters, search, status filter, a table on desktop, and cards on mobile

**UI and UX**
- Consistent dark theme and responsive layout from mobile to desktop
- Scroll-reveal animations, hover and focus states on all interactive elements
- Loading skeletons, empty states, and error states with retry on every data page
- Respects the "reduce motion" system setting

## User Roles and Permissions

| Capability | Visitor | Contributor | Maintainer |
| --- | --- | --- | --- |
| Browse issues, view details, related issues | Yes | Yes | Yes |
| Register and log in | Yes | Yes | Yes |
| Create an issue | No | Yes | Yes |
| Edit own issue | No | Only while status is open | Yes |
| Edit any issue | No | No | Yes |
| Change issue status | No | No | Yes |
| Delete an issue | No | No | Yes |
| Manage page | No | Own issues only | All issues |

## Pages and Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Landing page with live latest issues |
| `/items` | Public | Browse issues with search, filters, and sorting |
| `/items/[id]` | Public | Issue details, progress, related issues; role-based manage card |
| `/about` | Public | About DevPulse, roles, and tech stack |
| `/contact` | Public | Contact information and message form |
| `/login` | Public | Log in; redirects to `/` on success |
| `/register` | Public | Create an account as contributor or maintainer |
| `/items/add` | Logged in | Report a bug or feature request with live preview |
| `/items/manage` | Logged in | Overview table with View, Edit, and Delete actions |
| Any other path | Public | Custom 404 page |

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui (built on Base UI) |
| Icons | Lucide React, React Icons |
| Notifications | Sonner |
| Font | Inter via `next/font` |
| State | React Context API (authentication) |
| Authentication | JWT (issued by the DevPulse API) |
| Backend | Node.js, Express, PostgreSQL (separate repository) |
| Hosting | Vercel |



## Backend API Integration

Base URL is read from `NEXT_PUBLIC_API_URL`. Protected requests send the raw JWT in the `Authorization` header (no `Bearer` prefix). Responses follow `{ success, message, data }`.

| Endpoint | Method | Access | Used by |
| --- | --- | --- | --- |
| `/api/auth/signup` | POST | Public | Register page |
| `/api/auth/login` | POST | Public | Login page |
| `/api/issues` | GET | Public | Home, Items, Manage |
| `/api/issues/:id` | GET | Public | Issue details |
| `/api/issues` | POST | Logged in | Add issue |
| `/api/issues/:id` | PATCH | Owner (open) or maintainer | Edit issue, change status |
| `/api/issues/:id` | DELETE | Maintainer | Delete issue |

## Project Structure

```
src/
  app/                 Routes (App Router): /, items, about, contact, login, register, not-found
  components/
    ui/                shadcn/ui primitives
    layout/            Navbar, footer
    home/              Landing page sections
    issues/            Issue card, details, progress, actions, dialogs
    items/             Items explorer, add form, manage page
    auth/              Auth card, protected route
    contact/           Contact form
    common/            Shared helpers (scroll reveal)
  context/             Authentication context
  hooks/               API error handling hook
  lib/                 API client, API modules, formatting helpers, site config
  types/               Shared TypeScript types
public/                Static assets
```

## Getting Started

### Prerequisites

- Node.js 20.9 or newer
- npm

### Installation

```bash
git clone https://github.com/Hasnat-Sayed/DevPulse-Frontend
cd devpulse-frontend
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=https://devplus-sand.vercel.app
```

Do not add a trailing slash.

### Run

```bash
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Demo Accounts

| Role | Email | Password |
| --- | --- | --- |
| Maintainer | demo.maintainer@devpulse.com | Demo@1234 |
| Contributor | demo.contributor@devpulse.com | Demo@1234 |

Log in as the maintainer to try status changes and deleting. Please do not delete the seeded issues.

## Authentication Flow

1. The user submits credentials; the API returns a JWT and the user profile.
2. The token and user are stored in `localStorage` and held in an `AuthContext`.
3. On reload, the session is restored; expired tokens are discarded.
4. Protected pages are wrapped in a `ProtectedRoute` that redirects to `/login`.
5. If the API returns 401, the app logs the user out, shows a message, and redirects to `/login`.

Authentication uses JWT from the DevPulse API instead of Firebase (approved by the instructors).

## UI and Design System

- **Theme:** dark-only navy palette with an indigo accent, defined as CSS variables and used through theme tokens
- **Typography:** Inter, with a clear heading hierarchy
- **Layout:** consistent container width and section spacing, mobile-first breakpoints
- **Components:** uniform cards with equal heights, hover lift, and visible focus rings
- **Motion:** CSS-only animations (scroll reveal, floating hero card), disabled for users who prefer reduced motion
- **Accessibility:** labeled form fields with inline errors, `aria` labels on icon buttons, keyboard-friendly filters and dialogs

---

<p align="center">
  <strong>DevPulse</strong> — Streamlining issue tracking for modern engineering teams.
  <br />
  Designed & Developed by <a href="https://github.com/Hasnat-Sayed">Hasnat Sayed</a>
</p>