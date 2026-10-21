import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Reveal } from "@/components/common/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | DevPulse",
  description: "Get in touch with the DevPulse team.",
};

const INFO = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: site.location, href: undefined },
  { icon: Clock, label: "Hours", value: site.hours, href: undefined },
];

const SOCIALS = [
  { label: "GitHub", href: site.socials.github, icon: FaGithub },
  { label: "LinkedIn", href: site.socials.linkedin, icon: FaLinkedinIn },
  { label: "Facebook", href: site.socials.facebook, icon: FaFacebookF },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" /> Contact
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Questions, feedback or ideas? Send us a message and we will get back to you.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-5">
        <Reveal delay={100} className="lg:col-span-2">
          <div className="space-y-4">
            {INFO.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="break-words text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

           
              
              <ul className="mt-5 flex gap-3">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-10 items-center justify-center rounded-full border border-white bg-background/10 text-secodary transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                    >
                      <s.icon className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            
          </div>
        </Reveal>

        <Reveal delay={200} className="lg:col-span-3">
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}