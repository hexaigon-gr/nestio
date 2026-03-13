"use client";

import { useTranslations } from "next-intl";
import { Truck, ShieldCheck, Lock, Clock } from "lucide-react";

const badges = [
  {
    icon: <Truck className="size-5" strokeWidth={1.5} />,
    titleKey: "freeShipping" as const,
    descKey: "freeShippingDesc" as const,
  },
  {
    icon: <ShieldCheck className="size-5" strokeWidth={1.5} />,
    titleKey: "guarantee" as const,
    descKey: "guaranteeDesc" as const,
  },
  {
    icon: <Lock className="size-5" strokeWidth={1.5} />,
    titleKey: "securePayments" as const,
    descKey: "securePaymentsDesc" as const,
  },
  {
    icon: <Clock className="size-5" strokeWidth={1.5} />,
    titleKey: "fastDelivery" as const,
    descKey: "fastDeliveryDesc" as const,
  },
];

export function TrustBadges() {
  const t = useTranslations("Trust");

  return (
    <section className="border-t border-border/60 bg-sand/50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {badges.map((badge) => (
            <div
              key={badge.titleKey}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 text-terracotta">
                {badge.icon}
              </div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-foreground">
                {t(badge.titleKey)}
              </h3>
              <p className="mt-1.5 text-[12px] font-light leading-relaxed text-warm-gray">
                {t(badge.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
