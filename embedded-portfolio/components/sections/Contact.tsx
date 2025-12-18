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
    <section id="contact" className="mt-16 scroll-mt-24">
      <MotionInView>
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-2 opacity-80">
          Shoot me a message — it’ll go straight to my inbox.
        </p>
      </MotionInView>

      <MotionInView delay={0.08}>
        <div className="mt-6 rounded-2xl border p-6">
          <form action={formAction} className="grid gap-4">
            {/* Honeypot (hidden) */}
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" required />
              <Field label="Email" name="email" placeholder="you@email.com" required />
            </div>

            <Field label="Subject" name="subject" placeholder="What’s up?" />

            <div className="grid gap-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                name="message"
                placeholder="Write your message…"
                rows={6}
                required
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none
                           focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
            </div>

            <div className="flex items-center gap-3">
              <SubmitButton />
              {state?.message ? (
                <p className={`text-sm ${state.ok ? "opacity-80" : "opacity-90"}`}>
                  {state.message}
                </p>
              ) : (
                <p className="text-sm opacity-60">Typically replies within 1–2 days.</p>
              )}
            </div>

            <div className="pt-2 text-xs opacity-60">
              Prefer email?{" "}
              <a className="underline underline-offset-4" href="mailto:your.email@example.com">
                your.email@example.com
              </a>
            </div>
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
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none
                   focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
      className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm transition
                 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}
