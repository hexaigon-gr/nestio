"use client";

import { Product } from "@/types/product";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/lib/stores/cart-store";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/general/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/product-image";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("Products");
  const tCommon = useTranslations("Common");
  const addItem = useCartStore((s) => s.addItem);

  const name = t(`${product.slug}.name`);
  const shortDescription = t(`${product.slug}.shortDescription`);

  return (
    <Card
      className={cn(
        "group overflow-hidden border border-border/50 transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-lg"
      )}
    >
      {/* Product image */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          <ProductImage product={product} size="sm" />
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-orange-500 text-white hover:bg-orange-600">
              {t("featured")}
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="flex flex-col gap-3 p-5">
        <Link href={`/products/${product.slug}`} className="group/link">
          <h3 className="line-clamp-1 text-lg font-semibold text-foreground transition-colors duration-300 group-hover/link:text-teal-600">
            {name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-teal-600">
            {tCommon("currency")}
            {product.price.toFixed(2)}
          </span>

          {product.inStock ? (
            <Button
              size="sm"
              className="bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300"
              onClick={() => addItem(product)}
            >
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              {t("addToCart")}
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled>
              {t("outOfStock")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
