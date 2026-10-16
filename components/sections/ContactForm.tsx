"use client";

import { AnimatePresence, m } from "motion/react";
import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { submitContact } from "@/app/actions/contact";
import { easeOut } from "@/components/motion/motion-variants";
import { contactSchema, fieldErrorsFrom, type ContactField, type ContactInput, type ContactState } from "@/lib/contact";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };
const empty: ContactInput = { name: "", email: "", message: "" };

/** Wrapper: remounting via `key` gives a clean form after "Send another". */
export function ContactForm() {
  const [round, setRound] = useState(0);
  return <ContactFormInner key={round} onReset={() => setRound((r) => r + 1)} />;
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, dispatch, pending] = useActionState(submitContact, initialState);
  const [values, setValues] = useState<ContactInput>(empty);
  const [clientErrors, setClientErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const startedAt = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const statusId = useId();

  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  const serverErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const errors: Partial<Record<ContactField, string>> = { ...serverErrors, ...clientErrors };

  const validate = (next: ContactInput) => {
    const result = contactSchema.safeParse(next);
    return result.success ? {} : fieldErrorsFrom(result.error);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as ContactField;
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    // Once a field has been visited, re-validate it live so errors clear as you type.
    if (touched[field]) setClientErrors((prev) => ({ ...prev, [field]: validate(next)[field] }));
  };

  const onBlur = (field: ContactField) => {
    if (!values[field]) return; // don't nag on empty fields until submit
    setTouched((t) => ({ ...t, [field]: true }));
    setClientErrors((prev) => ({ ...prev, [field]: validate(values)[field] }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setTouched({ name: true, email: true, message: true });
    setClientErrors(found);
    const firstInvalid = (Object.keys(found) as ContactField[]).find((k) => found[k]);
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const data = new FormData(e.currentTarget);
    // Dispatch manually so React doesn't auto-reset the form; values survive server errors.
    startTransition(() => dispatch(data));
  };

  if (state.status === "success") {
    return (
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="flex min-h-[28rem] flex-col items-start justify-center rounded-xl border border-line bg-bg-2 p-8 sm:p-10"
        role="status"
      >
        <CircleCheck className="size-8 text-accent" aria-hidden />
        <h3 ref={successRef} tabIndex={-1} className="mt-6 text-h3 font-semibold text-fg">
          Thanks — your message is on its way.
        </h3>
        <p className="mt-3 max-w-sm text-fg-muted">We&apos;ll read it properly and reply to the email you gave us.</p>
        <button
          type="button"
          onClick={onReset}
          className="link-underline mt-8 text-sm font-medium text-fg"
        >
          Send another message
        </button>
      </m.div>
    );
  }

  const formError = state.status === "error" && !Object.values(errors).some(Boolean) ? state.message : null;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-describedby={formError ? statusId : undefined}
      className="relative rounded-xl border border-line bg-bg-2 p-6 sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          value={values.name}
          error={touched.name ? errors.name : serverErrors.name}
          onChange={onChange}
          onBlur={() => onBlur("name")}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={touched.email ? errors.email : serverErrors.email}
          onChange={onChange}
          onBlur={() => onBlur("email")}
        />
        <Field
          className="sm:col-span-2"
          label="Project details"
          name="message"
          multiline
          hint="A few lines on what you're building, timing, and where you need help."
          value={values.message}
          error={touched.message ? errors.message : serverErrors.message}
          onChange={onChange}
          onBlur={() => onBlur("message")}
        />
      </div>

      {/* Spam protection: honeypot (hidden from people and assistive tech) + render timestamp. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="" />

      <div className="mt-8 flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-subtle">All fields are required.</p>
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="group/btn inline-flex h-13 items-center justify-center gap-3 rounded-full bg-accent px-7 font-medium text-accent-ink transition-[background-color,transform,opacity] duration-200 hover:bg-[#d6ff85] active:scale-[0.97] disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
      </div>

      <div id={statusId} aria-live="polite" className="mt-0">
        <AnimatePresence>
          {formError ? (
            <m.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <span className="mt-6 flex items-start gap-3 rounded-md border border-[#ff8a7a]/30 bg-[#ff8a7a]/[0.06] p-4 text-sm text-[#ffb4a8]">
                <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
                {formError}
              </span>
            </m.p>
          ) : null}
        </AnimatePresence>
        <span className="sr-only">{pending ? "Sending your message" : ""}</span>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: ContactField;
  value: string;
  error?: string;
  hint?: string;
  multiline?: boolean;
  className?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "text";
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
};

function Field({ label, name, value, error, hint, multiline, className, type = "text", ...rest }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  const control = cn(
    "w-full rounded-md border bg-bg px-4 text-[0.98rem] text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-200",
    "focus:outline-none focus-visible:outline-none focus:border-accent/70 focus:ring-4 focus:ring-accent/10",
    error ? "border-[#ff8a7a]/60" : "border-line hover:border-line-strong",
  );

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          rows={6}
          required
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(control, "min-h-40 resize-y py-3.5 leading-relaxed")}
          onChange={rest.onChange}
          onBlur={rest.onBlur}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          required
          autoComplete={rest.autoComplete}
          inputMode={rest.inputMode}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(control, "h-12")}
          onChange={rest.onChange}
          onBlur={rest.onBlur}
        />
      )}
      {hint ? (
        <p id={hintId} className="mt-2 text-xs text-fg-subtle">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-xs text-[#ffb4a8]">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}
