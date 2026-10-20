<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# DevPulse Frontend Rules
Next.js App Router, TypeScript (strict, no `any`), Tailwind, shadcn/ui (built on Base UI: use the `render` prop, never `asChild`), lucide-react, sonner. No other libraries. Forms use plain React state.
"Items" = issues. Dark theme only; use theme tokens, never hardcoded colors.
Layout: container `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`, sections `py-16 md:py-24`. Every data page needs loading, empty and error states.

API: base URL `process.env.NEXT_PUBLIC_API_URL`. Header `Authorization: <raw token>` (no Bearer). Responses `{success,message,data}`.
POST /api/auth/signup {name,email,password,role}; POST /api/auth/login -> {token,user}
GET /api/issues?sort=&type=&status= ; GET /api/issues/:id
POST /api/issues {title,description,type}; PATCH /api/issues/:id; DELETE /api/issues/:id (maintainer only)
Issue: id,title,description,type(bug|feature_request),status(open|in_progress|resolved),reporter{id,name,role},created_at,updated_at. No images, use icons.

Rules: do only the task given; edit only needed files. No terminal commands, no browser, no git, no new packages, no plan or walkthrough files. Final reply: max 3 lines listing changed files.