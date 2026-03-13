"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-linear-to-br from-primary/95 via-primary to-primary/80 md:min-h-[70vh]">
      {/* Decorative grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Subtle gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {t("title")}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
          {t("subtitle")}
        </p>

        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="bg-destructive text-primary-foreground hover:bg-destructive/90 h-12 px-8 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <Link href="/products" className="gap-2">
              {t("cta")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
