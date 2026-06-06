"use client";

import { MotionInView } from "@/components/MotionInView";
import { useActionState } from "react";
import { sendContactEmail } from "@/app/actions/contact";
import { useFormStatus } from "react-dom";

type State = { ok: boolean; message: string } | null;

export function Contact() {
  const [state, formAction] = useActionState<State, FormData>(
    sendContactEmail,
    null
  );

  return (
    <section id="contact" className="mt-20 scroll-mt-24">
      <MotionInView>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
      </MotionInView>

      <MotionInView delay={0.08}>
        <div className="rounded-2xl border bg-card p-6 md:p-8">
          <p className="mb-6 text-sm text-muted-foreground">
            Send a message straight to my inbox. I'll typically reply within 1–2
            days.
          </p>

          <form action={formAction} className="grid gap-5">
            {/* Honeypot (hidden) */}
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name" name="name" placeholder="Full name" required />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <Field label="Subject" name="subject" placeholder="What's this about?" />

            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here."
                rows={5}
                required
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none resize-none
                           transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
            </div>

            <div className="flex items-center gap-4">
              <SubmitButton />
              {state?.message && (
                <p
                  className={`text-sm ${
                    state.ok ? "text-accent" : "text-destructive"
                  }`}
                >
                  {state.message}
                </p>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Prefer email?{" "}
              <a
                className="text-accent underline underline-offset-4 hover:brightness-110"
                href="mailto:anickita@ltu.edu"
              >
                anickita@ltu.edu
              </a>
            </p>
          </form>
        </div>
      </MotionInView>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none
                   transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}
