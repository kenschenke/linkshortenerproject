import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-16">
      <section className="space-y-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">Link Shortener</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Create branded short links and track every click.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Turn long URLs into clean, memorable links your team can share anywhere.
          Sign in to manage links, monitor performance, and keep campaigns organized.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <SignUpButton mode="modal">
            <Button size="lg">Get started</Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button variant="outline" size="lg">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Fast link creation</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Generate short links in seconds for social posts, emails, and product launches.
          </p>
        </article>
        <article className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Clear performance insights</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            See which links are getting attention so you can focus on what drives results.
          </p>
        </article>
        <article className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Built for teams</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep your link library organized in one place so everyone can share the latest URLs.
          </p>
        </article>
      </section>
    </main>
  );
}
