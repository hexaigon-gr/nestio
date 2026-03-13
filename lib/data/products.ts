import { Product } from "@/types/product";

export const products: Product[] = [
  // ===== KITCHEN (8 products) =====
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
    id: "7",
    slug: "digital-meat-thermometer",
    price: 19.9,
    cost: 4.0,
    images: ["/images/products/digital-meat-thermometer.webp"],
    category: "kitchen",
    featured: false,
    inStock: true,
  },
  {
    id: "8",
    slug: "electric-milk-frother",
    price: 24.9,
    cost: 5.5,
    images: ["/images/products/electric-milk-frother.webp"],
    category: "kitchen",
    featured: false,
    inStock: true,
  },
  {
    id: "9",
    slug: "vegetable-spiralizer",
    price: 22.9,
    cost: 4.5,
    images: ["/images/products/vegetable-spiralizer.webp"],
    category: "kitchen",
    featured: false,
    inStock: true,
  },
  {
    id: "10",
    slug: "handheld-vacuum-sealer",
    price: 27.9,
    cost: 6.0,
    images: ["/images/products/handheld-vacuum-sealer.webp"],
    category: "kitchen",
    featured: false,
    inStock: true,
  },

  // ===== LIFESTYLE / DECOR (6 products) =====
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
    id: "11",
    slug: "rain-cloud-diffuser",
    price: 34.9,
    cost: 7.0,
    images: ["/images/products/rain-cloud-diffuser.webp"],
    category: "lifestyle",
    featured: true,
    inStock: true,
  },
  {
    id: "12",
    slug: "crystal-touch-lamp",
    price: 28.9,
    cost: 5.5,
    images: ["/images/products/crystal-touch-lamp.webp"],
    category: "lifestyle",
    featured: false,
    inStock: true,
  },
  {
    id: "13",
    slug: "floating-wall-shelves",
    price: 26.9,
    cost: 5.0,
    images: ["/images/products/floating-wall-shelves.webp"],
    category: "lifestyle",
    featured: false,
    inStock: true,
  },
  {
    id: "14",
    slug: "moon-lamp-3d",
    price: 24.9,
    cost: 5.0,
    images: ["/images/products/moon-lamp-3d.webp"],
    category: "lifestyle",
    featured: false,
    inStock: true,
  },
  {
    id: "15",
    slug: "galaxy-star-projector",
    price: 32.9,
    cost: 7.0,
    images: ["/images/products/galaxy-star-projector.webp"],
    category: "lifestyle",
    featured: true,
    inStock: true,
  },

  // ===== TECH (4 products) =====
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
  {
    id: "16",
    slug: "mini-portable-projector",
    price: 49.9,
    cost: 12.0,
    images: ["/images/products/mini-portable-projector.webp"],
    category: "tech",
    featured: true,
    inStock: true,
  },
  {
    id: "17",
    slug: "wireless-charging-pad",
    price: 22.9,
    cost: 4.5,
    images: ["/images/products/wireless-charging-pad.webp"],
    category: "tech",
    featured: false,
    inStock: true,
  },
  {
    id: "18",
    slug: "smart-wifi-plug",
    price: 19.9,
    cost: 4.0,
    images: ["/images/products/smart-wifi-plug.webp"],
    category: "tech",
    featured: false,
    inStock: true,
  },

  // ===== ORGANIZATION (2 products) =====
  {
    id: "19",
    slug: "stackable-fridge-organizer",
    price: 24.9,
    cost: 5.0,
    images: ["/images/products/stackable-fridge-organizer.webp"],
    category: "organization",
    featured: false,
    inStock: true,
  },
  {
    id: "20",
    slug: "cable-management-box",
    price: 18.9,
    cost: 3.5,
    images: ["/images/products/cable-management-box.webp"],
    category: "organization",
    featured: false,
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

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
