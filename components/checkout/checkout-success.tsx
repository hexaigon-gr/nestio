"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function CheckoutSuccess() {
  const clearCart = useCartStore((s) => s.clearCart);
  const t = useTranslations("Checkout");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
        <CheckCircle className="h-12 w-12 text-teal-600" />
      </div>
      <h1 className="text-3xl font-bold text-foreground">
        {t("successTitle")}
      </h1>
      <p className="max-w-md text-muted-foreground">
        {t("successDescription")}
      </p>
      <p className="text-sm text-muted-foreground">{t("contactOrder")}</p>
      <Button
        asChild
        className="bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300"
      >
        <Link href="/">{t("backToHome")}</Link>
      </Button>
    </div>
  );
}
