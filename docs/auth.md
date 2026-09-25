# Authentication (Clerk)

Clerk is the **only** authentication method used in this app. Do not add
NextAuth, custom JWT/session handling, Passport, or any other auth library —
route protection, sign-in/sign-up UI, and session access must all go through
`@clerk/nextjs`.

## Route protection

`proxy.ts` is this project's middleware (see `AGENTS.md` note on Next.js
breaking changes — it replaces `middleware.ts`) and wraps every request with
`clerkMiddleware`. Protected routes must be enforced here with
`createRouteMatcher` + `auth.protect()`, not with client-side checks:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});
```

- `/dashboard` (and any nested routes under it) requires a signed-in user.
  Unauthenticated users hitting `/dashboard` are redirected to sign in.
- New protected sections should extend `isProtectedRoute`, not introduce a
  separate auth mechanism or per-page `redirect()` checks.

## Homepage redirect for signed-in users

`/` is a public marketing/landing page for signed-out visitors only. Signed-in
users visiting `/` must be redirected to `/dashboard`. Implement this as a
server-side check in `app/page.tsx` using `auth()` from
`@clerk/nextjs/server`:

```ts
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");
  // ...render public homepage
}
```

## Sign-in / sign-up must be modals

Users trigger auth from in-app buttons, never by navigating to a dedicated
page. Always use Clerk's modal mode:

```tsx
<SignInButton mode="modal" />
<SignUpButton mode="modal" />
```

The catch-all routes at `app/sign-in/[[...sign-in]]/page.tsx` and
`app/sign-up/[[...sign-up]]/page.tsx` exist only because Clerk requires valid
fallback routes to redirect to (e.g. for OAuth callbacks) — do not link to
them directly or build full-page sign-in/sign-up flows against them.

## Reading auth state

- Server components / route handlers / server actions: `await auth()` (or
  `currentUser()` if full user data is needed) from `@clerk/nextjs/server`.
- Client components: `useAuth()` / `useUser()` from `@clerk/nextjs`.
- Never fetch or infer auth state via custom cookies, headers, or database
  session tables.
