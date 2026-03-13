"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import { useCartStore } from "@/lib/stores/cart-store";
import { ShoppingCart, Menu, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/general/utils";

const navLinks = [
  { href: "/products" as const, key: "products" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/contact" as const, key: "contact" as const },
];

export function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLocale = () => {
    const next = locale === "en" ? "el" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-primary transition-colors duration-300 hover:text-primary/80"
        >
          Nestio
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Language toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLocale}
            className="size-9 transition-colors duration-300"
            aria-label="Toggle language"
          >
            <Globe className="size-4" />
          </Button>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="size-9 transition-colors duration-300"
              aria-label={t("cart")}
            >
              <ShoppingCart className="size-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile right actions */}
        <div className="flex items-center gap-1 md:hidden">
          {/* Cart (mobile) */}
          <Link href="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="size-9 transition-colors duration-300"
              aria-label={t("cart")}
            >
              <ShoppingCart className="size-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Hamburger → Sheet */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 transition-colors duration-300"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 backdrop-blur-lg bg-background/95"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-lg font-bold text-primary">
                  Nestio
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-md px-4 py-3 text-base font-medium transition-colors duration-300",
                      pathname === link.href
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>

              {/* Language toggle in mobile menu */}
              <div className="mt-6 border-t border-border pt-6 px-4">
                <Button
                  variant="outline"
                  onClick={toggleLocale}
                  className="w-full justify-start gap-3 transition-colors duration-300"
                >
                  <Globe className="size-4" />
                  {locale === "en" ? "Ελληνικά" : "English"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
