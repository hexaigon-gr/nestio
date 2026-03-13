"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { STORE_EMAIL } from "@/lib/general/constants";
import { ArrowRight } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${STORE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center rounded-sm border border-terracotta/20 bg-sand/50 p-12">
        <p className="text-center text-[14px] font-medium text-terracotta">
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.1em] text-charcoal">
            {t("name")}
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-border/60 bg-cream px-4 py-3 text-[14px] text-charcoal outline-none transition-colors duration-300 placeholder:text-warm-gray/50 focus:border-terracotta"
            placeholder={t("namePlaceholder")}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.1em] text-charcoal">
            {t("email")}
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-border/60 bg-cream px-4 py-3 text-[14px] text-charcoal outline-none transition-colors duration-300 placeholder:text-warm-gray/50 focus:border-terracotta"
            placeholder={t("emailPlaceholder")}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.1em] text-charcoal">
          {t("subject")}
        </label>
        <input
          type="text"
          name="subject"
          required
          className="w-full border border-border/60 bg-cream px-4 py-3 text-[14px] text-charcoal outline-none transition-colors duration-300 placeholder:text-warm-gray/50 focus:border-terracotta"
          placeholder={t("subjectPlaceholder")}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.1em] text-charcoal">
          {t("message")}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full resize-none border border-border/60 bg-cream px-4 py-3 text-[14px] text-charcoal outline-none transition-colors duration-300 placeholder:text-warm-gray/50 focus:border-terracotta"
          placeholder={t("messagePlaceholder")}
        />
      </div>

      <button
        type="submit"
        className="group flex items-center gap-2 bg-terracotta px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-terracotta/90"
      >
        {t("send")}
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
