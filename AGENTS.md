<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Coding Standards

This is a link shortener app built on Next.js 16 (App Router), Clerk auth,
Neon Postgres + Drizzle ORM, and Tailwind v4 with shadcn/base-ui components.

Detailed, topic-specific standards live in [docs/](./docs/README.md) — read
the files relevant to what you're changing before writing code. ALWAYS refer
to the relevant .md file BEFORE generating any code:

- [docs/auth.md](./docs/auth.md) — Clerk authentication, route protection, modal sign-in/up
- [docs/ui.md](./docs/ui.md) — shadcn/ui components, no custom components

**It is critical that you read the applicable file(s) in `docs/` before
generating any code, every single time — not just when starting a task.**
If a change touches auth, routing, or UI in any way, open the matching doc
first, even if you've read it earlier in the session or believe you already
know its contents. Never guess at or skip this step; treat it as a hard
prerequisite, not a suggestion.

## Non-negotiables

- Never commit secrets; `.env` stays git-ignored.
- Don't hand-edit generated files: `drizzle/*` migrations,
  `components/ui/*` beyond shadcn-style regen, or anything under `.next/`.
- Server-only concerns (DB access, Clerk server helpers) stay out of
  `"use client"` files.
- Run `npm run lint` before considering a change complete.

If a new topic doesn't fit an existing doc, add a new file under `docs/` and
link it from both `docs/README.md` and this section instead of growing this
file indefinitely.
