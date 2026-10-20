"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "subject" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const FIELD_ORDER: Field[] = ["name", "email", "subject", "message"];
const EMPTY: Values = { name: "", email: "", subject: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!EMAIL_REGEX.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!v.subject.trim()) e.subject = "Please add a subject.";
  if (v.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
  return e;
}

export function ContactForm() {
  const [values, setValues] = React.useState<Values>(EMPTY);
  const [errors, setErrors] = React.useState<Errors>({});

  const update =
    (field: Field) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: validate(next)[field] }));
      }
    };

  const handleBlur = (field: Field) => () => {
    setErrors((prev) => ({ ...prev, [field]: validate(values)[field] }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = FIELD_ORDER.find((f) => found[f]);
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    const body = `${values.message.trim()}\n\n- ${values.name.trim()} (${values.email.trim()})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      values.subject.trim()
    )}&body=${encodeURIComponent(body)}`;
    toast.success("Your email app should open with the message ready to send.");
    setValues(EMPTY);
  };

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-xl font-semibold text-foreground">Send a message</h2>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">
        This opens your email app with the message ready to send.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              value={values.name}
              onChange={update("name")}
              onBlur={handleBlur("name")}
              aria-invalid={Boolean(errors.name)}
              placeholder="Your name"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={values.email}
              onChange={update("email")}
              onBlur={handleBlur("email")}
              aria-invalid={Boolean(errors.email)}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-subject">Subject</Label>
          <Input
            id="contact-subject"
            value={values.subject}
            onChange={update("subject")}
            onBlur={handleBlur("subject")}
            aria-invalid={Boolean(errors.subject)}
            placeholder="How can we help?"
          />
          {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            rows={6}
            value={values.message}
            onChange={update("message")}
            onBlur={handleBlur("message")}
            aria-invalid={Boolean(errors.message)}
            placeholder="Write your message here..."
          />
          {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
        </div>

        <Button type="submit" className="w-full gap-2 sm:w-auto">
          <Send className="size-4" /> Send message
        </Button>
      </form>
    </Card>
  );
}