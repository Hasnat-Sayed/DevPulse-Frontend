<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# DevPulse Frontend – Agent Rules

## Project
Next.js (App Router) frontend for DevPulse, an issue tracker. In the UI,
"items" = issues. Pages: / , /items , /items/[id] , /items/add (protected),
/items/manage (protected), /about , /login , /register.

## Stack (do not add other libraries without asking me first)
Next.js App Router, TypeScript (strict, never use `any`), Tailwind CSS,
shadcn/ui, lucide-react, sonner (toasts). Forms: plain React state + a small
validate function. No form libraries.
- shadcn/ui here is built on Base UI, NOT Radix. Do not use `asChild`; use the `render` prop
  instead. Check the existing files in src/components/ui before using a component.

## Backend API
- Base URL: process.env.NEXT_PUBLIC_API_URL (never hardcode it)
- Auth header: `Authorization: <token>`. Raw JWT, NO "Bearer " prefix.
- Success: { success: true, message, data }  Error: { success: false, message, errors }
- POST /api/auth/signup  body {name,email,password,role: "contributor"|"maintainer"}
- POST /api/auth/login   body {email,password} -> data: { token, user }
- GET /api/issues?sort=newest|oldest&type=bug|feature_request&status=open|in_progress|resolved (public)
- GET /api/issues/:id (public) -> issue includes reporter {id,name,role}
- POST /api/issues (auth) body {title (max 150), description (min 20), type}
- PATCH /api/issues/:id (auth)  DELETE /api/issues/:id (maintainer only)
- Issue: id, title, description, type, status, reporter, created_at, updated_at
- Issues have no image. Use lucide icons per type (bug / lightbulb).

## Design rules
- Dark theme only (`dark` class on <html>). One palette defined as CSS variables
  in globals.css. Never hardcode colors in components; use theme tokens.
- Page container: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`. Section spacing: `py-16 md:py-24`.
- Cards: shadcn Card, rounded-xl, border, hover and focus-visible states, equal heights in grids.
- Mobile-first and responsive at sm/md/lg. Use shadcn components for every button, input, and card.
- Every data page needs loading (Skeleton), empty, and error states.

## Code rules
- Components in src/components, API code in src/lib, types in src/types.
- "use client" only where needed. Keep files small and readable.
- Only change files needed for the current task.

## Workflow rules
- Do ONLY the task I give. Do not start the next feature.
- NEVER run git commit or git push. I commit manually.
- Do not install packages without telling me first.
- Never read or print .env files.
- When done: run `npm run lint` and `npm run build`, fix errors, then list
  every file you changed in 5 lines or less.
