"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/general/utils";
import { Product } from "@/types/product";
import { Package, UtensilsCrossed, Lamp, Zap } from "lucide-react";

const categoryIcons = {
  kitchen: UtensilsCrossed,
  lifestyle: Lamp,
  tech: Zap,
  home: Package,
} as const;

const categoryGradients: Record<string, string> = {
  kitchen: "from-teal-500/80 to-teal-700/80",
  lifestyle: "from-orange-400/80 to-teal-500/80",
  tech: "from-teal-400/80 to-orange-500/80",
  home: "from-orange-500/80 to-teal-600/80",
};

const sizeConfig = {
  sm: { container: "h-56", icon: "h-12 w-12" },
  md: { container: "h-72", icon: "h-16 w-16" },
  lg: { container: "aspect-square", icon: "h-20 w-20 sm:h-24 sm:w-24" },
} as const;

interface ProductImageProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProductImage({
  product,
  size = "sm",
  className,
}: ProductImageProps) {
  const [imgError, setImgError] = useState(false);

  const imageSrc = product.images?.[0];
  const hasImage = !!imageSrc && !imgError;
  const IconComponent = categoryIcons[product.category] ?? Package;
  const gradient =
    categoryGradients[product.category] ?? "from-teal-500/80 to-orange-500/80";
  const { container, icon } = sizeConfig[size];

  if (hasImage) {
    return (
      <div className={cn("relative overflow-hidden", container, className)}>
        <Image
          src={imageSrc}
          alt={product.slug}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
          sizes={
            size === "lg"
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-linear-to-br",
        gradient,
        container,
        className
      )}
    >
      <div className="text-white/90 transition-transform duration-300 group-hover:scale-110">
        <IconComponent className={icon} />
      </div>
    </div>
  );
}
