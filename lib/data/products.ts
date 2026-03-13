import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    slug: "stove-gap-covers",
    price: 16.9,
    cost: 3.0,
    images: ["/images/products/stove-gap-covers.webp"],
    category: "kitchen",
    featured: true,
    inStock: true,
  },
  {
    id: "2",
    slug: "rotating-snack-tray",
    price: 29.9,
    cost: 6.5,
    images: ["/images/products/rotating-snack-tray.webp"],
    category: "kitchen",
    featured: true,
    inStock: true,
  },
  {
    id: "3",
    slug: "silicone-food-storage-bags",
    price: 21.9,
    cost: 4.0,
    images: ["/images/products/silicone-food-storage-bags.webp"],
    category: "kitchen",
    featured: true,
    inStock: true,
  },
  {
    id: "4",
    slug: "portable-blender",
    price: 34.9,
    cost: 8.0,
    images: ["/images/products/portable-blender.webp"],
    category: "kitchen",
    featured: true,
    inStock: true,
  },
  {
    id: "5",
    slug: "sunset-lamp",
    price: 26.9,
    cost: 5.0,
    images: ["/images/products/sunset-lamp.webp"],
    category: "lifestyle",
    featured: true,
    inStock: true,
  },
  {
    id: "6",
    slug: "led-strip-lights",
    price: 22.9,
    cost: 4.5,
    images: ["/images/products/led-strip-lights.webp"],
    category: "tech",
    featured: true,
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getAllProducts(): Product[] {
  return products;
}
