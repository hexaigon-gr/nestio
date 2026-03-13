"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export function CheckoutCancel() {
  const t = useTranslations("Checkout");

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
        <XCircle className="h-12 w-12 text-orange-500" />
      </div>
      <h1 className="text-3xl font-bold text-foreground">
        {t("cancelTitle")}
      </h1>
      <p className="max-w-md text-muted-foreground">
        {t("cancelDescription")}
      </p>
      <Button
        asChild
        className="bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300"
      >
        <Link href="/">{t("backToHome")}</Link>
      </Button>
    </div>
  );
}
