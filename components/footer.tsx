"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { getFeaturedProducts } from "@/lib/data/products";
import { Facebook, Instagram } from "lucide-react";
import { NestioLogo } from "@/components/nestio-logo";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15Z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("Footer");
  const tProducts = useTranslations("Products");
  const products = getFeaturedProducts();

  return (
    <footer className="border-t border-border/60 bg-charcoal text-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <NestioLogo size="sm" variant="light" />
            <p className="mt-5 text-[13px] font-light leading-relaxed text-cream/50">
              {t("aboutText")}
            </p>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="mb-5 text-[12px] font-medium uppercase tracking-[0.2em] text-cream/70">
              {t("products")}
            </h3>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-[13px] font-light text-cream/40 transition-colors duration-300 hover:text-cream/80"
                  >
                    {tProducts(`${product.slug}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="mb-5 text-[12px] font-medium uppercase tracking-[0.2em] text-cream/70">
              {t("support")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/returns"
                  className="text-[13px] font-light text-cream/40 transition-colors duration-300 hover:text-cream/80"
                >
                  {t("returns")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[13px] font-light text-cream/40 transition-colors duration-300 hover:text-cream/80"
                >
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[13px] font-light text-cream/40 transition-colors duration-300 hover:text-cream/80"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="mb-5 text-[12px] font-medium uppercase tracking-[0.2em] text-cream/70">
              {t("followUs")}
            </h3>
            <div className="flex gap-4">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 transition-colors duration-300 hover:text-cream/80"
              >
                <TikTokIcon className="size-[18px]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 transition-colors duration-300 hover:text-cream/80"
              >
                <Instagram className="size-[18px]" strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 transition-colors duration-300 hover:text-cream/80"
              >
                <Facebook className="size-[18px]" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center gap-2 border-t border-cream/10 pt-8 text-[12px] font-light text-cream/30 sm:flex-row sm:justify-between">
          <p>&copy; 2026 Nestio. {t("rights")}</p>
          <p>{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
