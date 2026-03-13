# Nestio Dropshipping Store - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the existing Next.js starter into a bilingual dropshipping store called Nestio, selling 6 home/kitchen gadgets to the Greece/Cyprus market.

**Architecture:** Replace the current landing page with a full e-commerce frontend. Products are hardcoded in a data file (no DB for products). Cart uses Zustand with localStorage persistence. Checkout uses Stripe Checkout Sessions. Orders are saved to the Prisma DB. All UI is bilingual (GR/EN) via existing next-intl setup.

**Tech Stack:** Next.js 16.1, React 19, Tailwind CSS 4, shadcn/ui, Zustand, Stripe, Prisma, next-intl

---

## Task 1: Brand Colors & Theme Setup

**Files:**
- Modify: `app/[locale]/globals.css`
- Modify: `app/[locale]/layout.tsx` (metadata)

**Step 1: Replace CSS theme variables**

Replace the existing `:root` and `.dark` color variables in `app/[locale]/globals.css` with Nestio brand colors:

- Primary: Teal (#0D9488) → convert to oklch
- Accent: Orange (#F97316) → use as destructive/accent
- Background: Warm White (#FAFAF9)
- Foreground: Warm Black (#1C1917)
- Cards/Muted: Light Gray (#F5F5F4)

Keep the existing Tailwind 4 `@theme inline` structure and shadcn variable names. Just swap the color values.

**Step 2: Update metadata in layout.tsx**

Change title to "Nestio - Έξυπνα gadgets για το σπίτι σου" and description accordingly.

**Step 3: Verify**

Run: `pnpm dev` and check localhost:3000 renders without errors.

**Step 4: Commit**

```bash
git add app/[locale]/globals.css app/[locale]/layout.tsx
git commit -m "feat: apply Nestio brand colors and metadata"
```

---

## Task 2: Product Data & Types

**Files:**
- Create: `lib/data/products.ts`
- Create: `types/product.ts`

**Step 1: Create product type**

```typescript
// types/product.ts
export interface Product {
  id: string;
  slug: string;
  price: number;
  cost: number;
  images: string[];
  category: "kitchen" | "home" | "lifestyle" | "tech";
  featured: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
```

**Step 2: Create products data file**

```typescript
// lib/data/products.ts
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "stove-gap-covers",
    slug: "stove-gap-covers",
    price: 16.90,
    cost: 3.00,
    images: ["/images/products/stove-gap-covers.webp"],
    category: "kitchen",
    featured: true,
    inStock: true,
  },
  {
    id: "rotating-snack-tray",
    slug: "rotating-snack-tray",
    price: 29.90,
    cost: 6.50,
    images: ["/images/products/rotating-snack-tray.webp"],
    category: "kitchen",
    featured: true,
    inStock: true,
  },
  {
    id: "silicone-food-storage-bags",
    slug: "silicone-food-storage-bags",
    price: 21.90,
    cost: 4.00,
    images: ["/images/products/silicone-food-storage-bags.webp"],
    category: "kitchen",
    featured: true,
    inStock: true,
  },
  {
    id: "portable-blender",
    slug: "portable-blender",
    price: 34.90,
    cost: 8.00,
    images: ["/images/products/portable-blender.webp"],
    category: "kitchen",
    featured: true,
    inStock: true,
  },
  {
    id: "sunset-lamp",
    slug: "sunset-lamp",
    price: 26.90,
    cost: 5.00,
    images: ["/images/products/sunset-lamp.webp"],
    category: "lifestyle",
    featured: true,
    inStock: true,
  },
  {
    id: "led-strip-lights",
    slug: "led-strip-lights",
    price: 22.90,
    cost: 4.50,
    images: ["/images/products/led-strip-lights.webp"],
    category: "tech",
    featured: true,
    inStock: true,
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured);
```

Product names, descriptions, features, and all UI text will live in the translation files (en.json/el.json), keyed by product id.

**Step 3: Commit**

```bash
git add types/product.ts lib/data/products.ts
git commit -m "feat: add product types and data"
```

---

## Task 3: Translation Files

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/el.json`

**Step 1: Replace translation files**

Replace existing content with full store translations. Structure:

```json
{
  "Metadata": { "title", "description" },
  "Nav": { "home", "products", "about", "contact", "cart" },
  "Hero": { "title", "subtitle", "cta" },
  "Products": {
    "title", "viewAll", "addToCart", "outOfStock",
    "stove-gap-covers": { "name", "shortDescription", "description", "features": [] },
    "rotating-snack-tray": { ... },
    ... (all 6 products)
  },
  "Trust": { "freeShipping", "guarantee", "securePayments", "fastDelivery" },
  "Cart": { "title", "empty", "total", "checkout", "remove", "quantity" },
  "Checkout": { "title", "shipping", "payment", "orderSummary", fields... },
  "About": { "title", "description", "mission" },
  "Contact": { "title", "email", "phone", "form" },
  "Footer": { "rights", "terms", "privacy", "returns" },
  "Common": { "currency": "€", "locale": "el-GR" / "en-GB" },
  "Admin": { ... (keep existing) }
}
```

Both files must have identical keys with translated values.

**Step 2: Commit**

```bash
git add messages/en.json messages/el.json
git commit -m "feat: add full store translations for GR/EN"
```

---

## Task 4: Cart Store (Zustand)

**Files:**
- Create: `lib/stores/cart-store.ts`

**Step 1: Create cart store with localStorage persistence**

```typescript
// lib/stores/cart-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "@/types/product";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.product.id !== productId)
              : state.items.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i
                ),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "nestio-cart" }
  )
);
```

**Step 2: Commit**

```bash
git add lib/stores/cart-store.ts
git commit -m "feat: add cart store with localStorage persistence"
```

---

## Task 5: Navbar Component

**Files:**
- Create: `components/navbar.tsx`

**Step 1: Build responsive navbar**

Features:
- Logo "Nestio" (left)
- Nav links: Products, About, Contact (center/left)
- Cart icon with item count badge + Language switcher (right)
- Mobile: hamburger → slide-in sheet from right with backdrop blur
- Fixed position, solid background with border-bottom
- Uses `Link` from `@/lib/i18n/navigation`
- Uses `useTranslations("Nav")` for labels
- Cart icon uses `useCartStore.getItemCount()`

Use shadcn Sheet for mobile menu. Lucide icons: Menu, ShoppingCart, X.

**Step 2: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 navbar
```

**Step 3: Commit**

```bash
git add components/navbar.tsx
git commit -m "feat: add responsive navbar with cart badge"
```

---

## Task 6: Homepage - Hero Section

**Files:**
- Create: `components/home/hero-section.tsx`
- Modify: `app/[locale]/page.tsx` (replace entirely)

**Step 1: Create hero section**

Features:
- Full-width section with gradient background (teal to dark)
- Large heading: store tagline from translations
- Subtitle: short description
- CTA button: "Δες τα προϊόντα" → links to /products
- Optional: subtle pattern or product image collage

**Step 2: Replace page.tsx**

Replace the entire current landing page content. Server component that:
1. Gets translations with `getTranslations()`
2. Sets request locale
3. Renders: Navbar + Hero + (sections to be added in next tasks) + Footer

**Step 3: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 hero
```

**Step 4: Commit**

```bash
git add components/home/hero-section.tsx app/[locale]/page.tsx
git commit -m "feat: add hero section and new homepage layout"
```

---

## Task 7: Homepage - Featured Products Grid

**Files:**
- Create: `components/home/featured-products.tsx`
- Create: `components/product-card.tsx`

**Step 1: Create product card component**

Client component. Shows:
- Product image (placeholder colored div initially since we don't have real images yet)
- Product name (from translations)
- Short description
- Price with € symbol
- "Add to Cart" button (uses `useCartStore.addItem()`)
- Hover effect: subtle scale + shadow

**Step 2: Create featured products section**

Server component wrapper that passes translations, renders grid of ProductCards.
- Section heading: "Τα Προϊόντα μας" / "Our Products"
- 3-column grid on desktop, 2 on tablet, 1 on mobile
- Uses `getFeaturedProducts()`

**Step 3: Add to homepage**

Import and render FeaturedProducts below Hero in page.tsx.

**Step 4: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 products-grid
```

**Step 5: Commit**

```bash
git add components/home/featured-products.tsx components/product-card.tsx app/[locale]/page.tsx
git commit -m "feat: add featured products grid on homepage"
```

---

## Task 8: Homepage - Trust Badges & Footer

**Files:**
- Create: `components/home/trust-badges.tsx`
- Modify: `components/footer.tsx` (replace with store footer)

**Step 1: Create trust badges section**

4 badges in a row:
- Truck icon: "Δωρεάν Αποστολή" / "Free Shipping" (orders 30€+)
- Shield icon: "Εγγύηση Επιστροφής" / "Return Guarantee"
- Lock icon: "Ασφαλείς Πληρωμές" / "Secure Payments"
- Clock icon: "Γρήγορη Αποστολή" / "Fast Delivery"

Use Lucide icons with the CircleIcon component.

**Step 2: Replace footer**

- 4 columns: About Nestio, Products, Support (Returns, Terms, Contact), Social Links
- Copyright row at bottom
- Use Link from i18n navigation

**Step 3: Add to homepage**

Render TrustBadges + Footer on page.tsx after FeaturedProducts.

**Step 4: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000 trust-footer
```

**Step 5: Commit**

```bash
git add components/home/trust-badges.tsx components/footer.tsx app/[locale]/page.tsx
git commit -m "feat: add trust badges and store footer"
```

---

## Task 9: Products Catalog Page

**Files:**
- Create: `app/[locale]/products/page.tsx`

**Step 1: Create products page**

Server component:
- Page heading
- Grid of all ProductCard components (reuse from Task 7)
- Simple category filter tabs: All, Kitchen, Lifestyle, Tech

**Step 2: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000/en/products products-page
```

**Step 3: Commit**

```bash
git add app/[locale]/products/page.tsx
git commit -m "feat: add products catalog page"
```

---

## Task 10: Product Detail Page

**Files:**
- Create: `app/[locale]/products/[slug]/page.tsx`
- Create: `components/product-detail.tsx`

**Step 1: Create product detail client component**

Features:
- Large product image (left on desktop, top on mobile)
- Product name, price, description (from translations)
- Features list with checkmark icons
- Quantity selector (+/-)
- "Προσθήκη στο Καλάθι" button
- Related products section at bottom (other products from same category)

**Step 2: Create product detail page**

Server component:
- `generateStaticParams()` for all product slugs × locales
- Gets product by slug from data
- 404 if not found
- Passes data to client component

**Step 3: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000/en/products/stove-gap-covers product-detail
```

**Step 4: Commit**

```bash
git add app/[locale]/products/[slug]/page.tsx components/product-detail.tsx
git commit -m "feat: add product detail page"
```

---

## Task 11: Cart Page

**Files:**
- Create: `app/[locale]/cart/page.tsx`
- Create: `components/cart/cart-page-content.tsx`

**Step 1: Create cart page content (client component)**

Features:
- List of cart items with: image, name, price, quantity controls (+/-), remove button
- If empty: "Το καλάθι σου είναι άδειο" message + CTA to products
- Order summary sidebar: subtotal, shipping (free over €30, else €3.90), total
- "Ολοκλήρωση Παραγγελίας" / "Proceed to Checkout" button
- Uses `useCartStore`

**Step 2: Create cart page (server component wrapper)**

Simple wrapper that renders CartPageContent.

**Step 3: Screenshot and verify**

```bash
node screenshot.mjs http://localhost:3000/en/cart cart-page
```

**Step 4: Commit**

```bash
git add app/[locale]/cart/page.tsx components/cart/cart-page-content.tsx
git commit -m "feat: add cart page with quantity controls"
```

---

## Task 12: Checkout Page & Stripe Integration

**Files:**
- Create: `app/[locale]/checkout/page.tsx`
- Create: `components/checkout/checkout-form.tsx`
- Create: `app/api/checkout/route.ts`
- Create: `app/api/webhook/stripe/route.ts`

**Step 1: Create checkout form (client component)**

Features:
- Shipping info form: name, email, phone, address, city, postal code
- Order summary (from cart store)
- "Πληρωμή" button → calls API to create Stripe Checkout Session → redirects
- Form validation (required fields)

**Step 2: Create checkout API route**

```typescript
// app/api/checkout/route.ts
// POST: receives cart items + shipping info
// Creates Stripe Checkout Session with line items
// Returns session URL for redirect
// Requires STRIPE_SECRET_KEY env var
```

If Stripe keys not configured, show a message "Payment not configured - contact store owner" and offer email/WhatsApp order option as fallback.

**Step 3: Create Stripe webhook endpoint**

```typescript
// app/api/webhook/stripe/route.ts
// Handles checkout.session.completed event
// Saves order to database (future: Order model)
// For now: logs the completed order
```

**Step 4: Create success/cancel pages**

- `app/[locale]/checkout/success/page.tsx` - "Η παραγγελία σου ολοκληρώθηκε!"
- `app/[locale]/checkout/cancel/page.tsx` - "Η πληρωμή ακυρώθηκε"

**Step 5: Commit**

```bash
git add app/[locale]/checkout/ app/api/checkout/ app/api/webhook/ components/checkout/
git commit -m "feat: add checkout page with Stripe integration"
```

---

## Task 13: Static Pages (About, Contact, Returns, Terms)

**Files:**
- Create: `app/[locale]/about/page.tsx`
- Create: `app/[locale]/contact/page.tsx`
- Create: `app/[locale]/returns/page.tsx`
- Create: `app/[locale]/terms/page.tsx`

**Step 1: Create all 4 static pages**

Simple server components with translated content:
- **About:** Brand story, mission, what we sell
- **Contact:** Email, phone (from constants), contact form (just mailto link)
- **Returns:** Return policy text (14-day return, conditions)
- **Terms:** Terms of use, privacy basics

All text from translations. Consistent layout: Navbar + Content + Footer.

**Step 2: Commit**

```bash
git add app/[locale]/about/ app/[locale]/contact/ app/[locale]/returns/ app/[locale]/terms/
git commit -m "feat: add static pages (about, contact, returns, terms)"
```

---

## Task 14: Constants & SEO

**Files:**
- Create: `lib/general/constants.ts`
- Modify: `app/robots.ts`
- Modify: `app/sitemap.ts`

**Step 1: Create business constants**

```typescript
export const STORE_NAME = "Nestio";
export const STORE_EMAIL = "info@nestio.gr";
export const STORE_PHONE = "+30 XXX XXX XXXX";
export const STORE_URL = "https://nestio.gr";
export const FREE_SHIPPING_THRESHOLD = 30;
export const SHIPPING_COST = 3.90;
export const SOCIAL_LINKS = {
  tiktok: "https://tiktok.com/@nestio.gr",
  instagram: "https://instagram.com/nestio.gr",
  facebook: "https://facebook.com/nestio.gr",
};
```

**Step 2: Update robots.ts and sitemap.ts**

Add all new pages to sitemap. Allow all in robots.

**Step 3: Commit**

```bash
git add lib/general/constants.ts app/robots.ts app/sitemap.ts
git commit -m "feat: add business constants and update SEO files"
```

---

## Task 15: Shared Layout (Navbar + Footer on all pages)

**Files:**
- Modify: `app/[locale]/layout.tsx`

**Step 1: Add Navbar and Footer to layout**

Instead of adding Navbar/Footer to every page, add them to the locale layout so they appear on all pages. The admin section should be excluded (it already has its own layout).

Wrap children: `Navbar` → `<main>{children}</main>` → `Footer`

Conditionally skip Navbar/Footer for admin routes (check pathname or use a separate layout group).

**Step 2: Verify all pages have consistent layout**

```bash
node screenshot.mjs http://localhost:3000 full-layout
node screenshot.mjs http://localhost:3000/en/products full-layout-products
node screenshot.mjs http://localhost:3000/en/cart full-layout-cart
```

**Step 3: Commit**

```bash
git add app/[locale]/layout.tsx
git commit -m "feat: add navbar and footer to shared layout"
```

---

## Task 16: Placeholder Product Images

**Files:**
- Create: `public/images/products/` directory with placeholder images

**Step 1: Generate placeholder product images**

Since we don't have real product photos yet, create nice gradient/colored placeholder SVGs or use colored divs in the components. The product card and detail page should gracefully handle missing images with a styled placeholder showing the product icon.

Add a `ProductImage` component that shows the real image if it exists, or a styled placeholder with a relevant Lucide icon if not.

**Step 2: Commit**

```bash
git add public/images/products/ components/product-image.tsx
git commit -m "feat: add product image placeholders"
```

---

## Task 17: Final Polish & Cleanup

**Files:**
- Remove: unused example components if not needed
- Modify: various files for consistency

**Step 1: Remove/hide unused starter components**

The examples/ directory components are not needed for the store. Don't delete them but ensure they're not imported anywhere in the store pages.

**Step 2: Run linting and type checks**

```bash
pnpm lint
pnpm tsc --noEmit
```

Fix any errors.

**Step 3: Test full user flow**

Screenshot every page:
```bash
node screenshot.mjs http://localhost:3000 final-home
node screenshot.mjs http://localhost:3000/en/products final-products
node screenshot.mjs http://localhost:3000/en/products/stove-gap-covers final-detail
node screenshot.mjs http://localhost:3000/en/cart final-cart
node screenshot.mjs http://localhost:3000/en/about final-about
node screenshot.mjs http://localhost:3000/el final-home-gr
```

Verify each page visually.

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final polish and cleanup"
```

---

## Execution Notes

- **Product images:** We'll use styled placeholders initially. Real product images can be added later by dropping .webp files into `public/images/products/`.
- **Stripe:** The checkout will work with Stripe test keys. User needs to provide `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` in `.env.local`.
- **No Stripe fallback:** If Stripe is not configured, checkout shows a contact form / WhatsApp order option.
- **Admin panel:** Keep existing admin panel as-is. Future: add order management.
- **Mobile-first:** All components must look great on mobile first, then desktop.
