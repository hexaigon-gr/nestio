"use client";

import { useCartStore } from "@/lib/stores/cart-store";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/general/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
  UtensilsCrossed,
  Lamp,
  Zap,
} from "lucide-react";

const categoryGradients: Record<string, string> = {
  kitchen: "from-teal-500/80 to-teal-700/80",
  lifestyle: "from-orange-400/80 to-teal-500/80",
  tech: "from-teal-400/80 to-orange-500/80",
  home: "from-orange-500/80 to-teal-600/80",
};

const categoryIcons: Record<string, React.ReactNode> = {
  kitchen: <UtensilsCrossed className="h-6 w-6" />,
  lifestyle: <Lamp className="h-6 w-6" />,
  tech: <Zap className="h-6 w-6" />,
  home: <Package className="h-6 w-6" />,
};

const FREE_SHIPPING_THRESHOLD = 30;
const SHIPPING_COST = 3.5;

export function CartPageContent() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotal = useCartStore((s) => s.getTotal);

  const t = useTranslations("Cart");
  const tProducts = useTranslations("Products");
  const tCommon = useTranslations("Common");

  const subtotal = getTotal();
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = isFreeShipping ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-16">
        <ShoppingCart className="h-24 w-24 text-muted-foreground/50" />
        <h1 className="text-2xl font-bold text-foreground">{t("empty")}</h1>
        <p className="max-w-md text-center text-muted-foreground">
          {t("emptyDescription")}
        </p>
        <Button
          asChild
          className="bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300"
        >
          <Link href="/products">{t("continueShopping")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="mb-8 text-3xl font-bold text-foreground">{t("title")}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Cart items */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-0">
            {items.map((item, index) => {
              const gradient =
                categoryGradients[item.product.category] ??
                "from-teal-500/80 to-orange-500/80";
              const icon =
                categoryIcons[item.product.category] ?? (
                  <Package className="h-6 w-6" />
                );
              const name = tProducts(`${item.product.slug}.name`);
              const lineTotal = item.product.price * item.quantity;

              return (
                <div key={item.product.id}>
                  <div className="flex items-center gap-4 py-4">
                    {/* Gradient placeholder image */}
                    <div
                      className={cn(
                        "flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-linear-to-br",
                        gradient
                      )}
                    >
                      <div className="text-white/90">{icon}</div>
                    </div>

                    {/* Product info */}
                    <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-col gap-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-semibold text-foreground transition-colors duration-300 hover:text-teal-600"
                        >
                          {name}
                        </Link>
                        <span className="text-sm text-muted-foreground">
                          {tCommon("currency")}
                          {item.product.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-0 rounded-lg border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors duration-300 hover:text-foreground"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="flex h-8 w-8 items-center justify-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors duration-300 hover:text-foreground"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Line total */}
                        <span className="min-w-[70px] text-right font-semibold text-foreground">
                          {tCommon("currency")}
                          {lineTotal.toFixed(2)}
                        </span>

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground transition-colors duration-300 hover:text-red-500"
                          aria-label={t("remove")}
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {index < items.length - 1 && <Separator />}
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              asChild
              className="transition-colors duration-300"
            >
              <Link href="/products">{t("continueShopping")}</Link>
            </Button>
          </div>
        </div>

        {/* Right: Order summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("subtotal").replace(":", "")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("subtotal")}</span>
                <span className="font-medium">
                  {tCommon("currency")}
                  {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("shipping")}</span>
                <span className="font-medium">
                  {isFreeShipping
                    ? t("shippingFree")
                    : `${tCommon("currency")}${SHIPPING_COST.toFixed(2)}`}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{t("total")}</span>
                <span className="text-lg font-bold text-teal-600">
                  {tCommon("currency")}
                  {total.toFixed(2)}
                </span>
              </div>
              <Button
                asChild
                className="mt-2 w-full bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300"
                disabled={items.length === 0}
              >
                <Link href="/checkout">{t("checkout")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
