export interface Product {
  id: string;
  slug: string;
  price: number;
  cost: number;
  images: string[];
  category: "kitchen" | "home" | "lifestyle" | "tech" | "organization";
  featured: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
