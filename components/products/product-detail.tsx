"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/data/products";
import { useCartStore } from "@/lib/stores/cart-store";
import { ProductCard } from "@/components/product-card";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/general/utils";
import { Button } from "@/components/ui/button";
import {
  Check,
  Minus,
  Plus,
  ShoppingCart,
  ArrowLeft,
  Package,
  UtensilsCrossed,
  Lamp,
  Zap,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  kitchen: <UtensilsCrossed className="h-20 w-20 sm:h-24 sm:w-24" />,
  lifestyle: <Lamp className="h-20 w-20 sm:h-24 sm:w-24" />,
  tech: <Zap className="h-20 w-20 sm:h-24 sm:w-24" />,
  home: <Package className="h-20 w-20 sm:h-24 sm:w-24" />,
};

const categoryGradients: Record<string, string> = {
  kitchen: "from-teal-500/80 to-teal-700/80",
  lifestyle: "from-orange-400/80 to-teal-500/80",
  tech: "from-teal-400/80 to-orange-500/80",
  home: "from-orange-500/80 to-teal-600/80",
};

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations("Products");
  const tCommon = useTranslations("Common");
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  const name = t(`${product.slug}.name`);
  const description = t(`${product.slug}.description`);
  const features = t.raw(`${product.slug}.features`) as string[];
  const icon = categoryIcons[product.category] ?? (
    <Package className="h-20 w-20 sm:h-24 sm:w-24" />
  );
  const gradient =
    categoryGradients[product.category] ?? "from-teal-500/80 to-orange-500/80";

  // Related products: same category excluding current, fallback to other products
  const allProducts = getAllProducts();
  let relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  if (relatedProducts.length === 0) {
    relatedProducts = allProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 3);
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-teal-600"
      >
        <ArrowLeft className="h-4 w-4" />
        {tCommon("backToProducts")}
      </Link>

      {/* Main product section */}
      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image placeholder */}
        <div
          className={cn(
            "flex aspect-square items-center justify-center rounded-2xl bg-linear-to-br",
            gradient
          )}
        >
          <div className="text-white/90">{icon}</div>
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            {name}
          </h1>

          <span className="text-3xl font-bold text-teal-600">
            {tCommon("currency")}
            {product.price.toFixed(2)}
          </span>

          <p className="leading-relaxed text-muted-foreground">{description}</p>

          {/* Features list */}
          <ul className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Quantity selector + Add to Cart */}
          <div className="mt-auto flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-1 rounded-lg border border-border">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 transition-colors duration-300"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-medium">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 transition-colors duration-300"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {product.inStock ? (
              <Button
                size="lg"
                className="flex-1 bg-orange-500 text-white transition-colors duration-300 hover:bg-orange-600 sm:flex-none sm:px-8"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t("addToCart")}
              </Button>
            ) : (
              <Button size="lg" variant="outline" disabled className="flex-1 sm:flex-none sm:px-8">
                {t("outOfStock")}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            {tCommon("relatedProducts")}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
